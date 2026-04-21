CREATE TABLE task_lists(
    id SERIAL PRIMARY KEY,
    user_id INTEGER
    title TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

GET /tasklists/:id/tasks

GET /tasks/overdue

completed BOOLEAN DEFAULT FALSE

PATCH /tasks/:id/complete

deadline TIMESTAMP

tags
task_tags (junction table)

ALTER TABLE tasks
ADD COLUMN task_list_id INTEGER REFERENCES task_lists(id),
ADD COLUMN completed BOOLEAN DEFAULT FALSE,
ADD COLUMN deadline TIMESTAMP,
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL
    user_id INTEGER REFERENCES users(id)
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    color TEXT
);

CREATE TABLE task_tags (
    task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (task_id, tag_id)
);

ALTER TABLE tags ADD CONSTRAINT unique_tag_name UNIQUE (name);