CREATE TABLE tasks (
    -- id: creates a unique number for every task that increases automatically
    id SERIAL PRIMARY KEY, 
    
    -- title: the name of the task (cannot be empty)
    title VARCHAR(255) NOT NULL, 
    
    -- description: longer text for details (can be empty)
    description TEXT, 
    
    -- is_completed: a checkbox (true/false), starts as false
    is_completed BOOLEAN DEFAULT false, 
    
    -- created_at: records the exact time the task was added
    created_at TIMESTAMPTZ DEFAULT NOW() 
);

--Create the Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

--Link Tasks to Users (Foreign Key)
ALTER TABLE tasks ADD COLUMN user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE tasks 
ADD COLUMN tag_name VARCHAR(50),       -- like 'Exam', 'Project', 'Personal'
ADD COLUMN tag_color VARCHAR(7),      -- '#FF5733' a Hex code for the frontend to color it
ADD COLUMN link_url TEXT,             -- For school dashboard or assignment hyperlinks
ADD COLUMN reminder_at TIMESTAMPTZ;   -- The exact date/time a notification should fire