-- ============================================================
-- TASK MANAGER SCHEMA
-- ============================================================

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL
);

-- Task lists belong to a user
CREATE TABLE task_lists (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tags for categorizing tasks
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    color TEXT
);

ALTER TABLE tags ADD CONSTRAINT unique_tag_name UNIQUE (name);
ALTER TABLE tags DROP CONSTRAINT unique_tag_name; -- Remove unique constraint to allow same tag name across users

ALTER TABLE tags
ADD COLUMN user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE tags 
ADD CONSTRAINT unique_tag_name UNIQUE (user_id, name); -- Unique tag name per user

-- Core tasks table (assumes it already exists, we alter it)
ALTER TABLE tasks
ADD COLUMN task_list_id INTEGER REFERENCES task_lists(id),
ADD COLUMN completed BOOLEAN DEFAULT FALSE,
ADD COLUMN deadline TIMESTAMP,
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN start_time TIMESTAMP,
ADD COLUMN end_time TIMESTAMP,
ADD COLUMN status TEXT DEFAULT 'pending',
ADD COLUMN deleted_at TIMESTAMP; -- NULL means not deleted (soft delete)

ALTER TABLE tasks
ADD CONSTRAINT valid_time CHECK (end_time IS NULL OR start_time IS NULL OR end_time > start_time);

-- Junction table for task <-> tag many-to-many
CREATE TABLE task_tags (
    task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (task_id, tag_id)
);

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tasks_timestamp
BEFORE UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE INDEX idx_tasks_task_list_id ON tasks(task_list_id);
CREATE INDEX idx_tasks_start_time ON tasks(start_time);
CREATE INDEX idx_tasks_deadline ON tasks(deadline);
CREATE INDEX idx_tasks_deleted_at ON tasks(deleted_at);

ALTER TABLE tasks
ADD COLUMN description TEXT;

-- ============================================================
-- USEFUL QUERIES
-- ============================================================

-- Conflict detection: find tasks overlapping a given time window ($1=start, $2=end)
-- SELECT * FROM tasks
-- WHERE start_time < $2
-- AND end_time > $1;
-- AND deleted_at IS NULL

-- Today's tasks
-- SELECT * FROM tasks
-- WHERE DATE(start_time) = CURRENT_DATE;

-- Upcoming tasks (next 7 days)
-- SELECT * FROM tasks
-- WHERE start_time BETWEEN NOW() AND NOW() + INTERVAL '7 days';

-- Overdue tasks
-- SELECT * FROM tasks
-- WHERE deadline < NOW() AND completed = FALSE;

-- Search tasks by title
-- SELECT * FROM tasks
-- WHERE title ILIKE '%' || $1 || '%';

-- Progress percentage for a task list
-- SELECT COUNT(*) FILTER (WHERE completed = TRUE) * 100.0 / COUNT(*) AS progress
-- FROM tasks WHERE task_list_id = $1;

-- Soft delete a task
-- UPDATE tasks SET deleted_at = NOW() WHERE id = $1;

-- Hard delete tasks in trash older than 30 days
-- DELETE FROM tasks WHERE deleted_at < NOW() - INTERVAL '30 days';
