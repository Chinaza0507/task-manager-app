const express = require('express');
const pool = require('./db'); // Importing database connection
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());
//'User Registration' endpoint - AUTH
app.post('/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    //Basic Validation: Check if they provided both fields
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    //School Email Validation: Check if it ends with your PAU's domain
    if (!email.endsWith('@pau.edu.ng')) {
      return res.status(403).json({ error: "Only school emails are allowed to register." });
    }

    //Check if the user already exists in the database
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: "A user with this email already exists." });
    }

    //Hash the password safely (10 rounds of salt)
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    //Save the new user to the database
    const newUser = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at',
      [email, passwordHash]
    );

    //Return the new user details 
    res.status(201).json({
      message: "User registered successfully!",
      user: newUser.rows[0]
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// 'User Login' endpoint - AUTH
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validation: Check if fields are provided
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    //Check if the user exists
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials." }); 
      //error is vague so hackers don't know if the email or password was wrong
    }

    const user = userResult.rows[0];

    //Verify the password
    // bcrypt.compare takes the plain text password and compares it to the encrypted hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    //Create a Json Web Token
    //Store the user's ID inside the payload
    const token = jwt.sign(
      { user_id: user.id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } // Token expires in 1 hour for security
    );

    //Send the token back to the user
    res.json({
      message: "Login successful!",
      token: token
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//------- ROUTES --------

// 'Add Task' endpoint - CREATE
app.post('/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = await pool.query(
      'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    res.json(newTask.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// 'Get Tasks' endpoint - READ
app.get('/tasks', async (req, res) => {
  try {
    // We use SELECT * to get every column, and ORDER BY to see the newest ones first
    const allTasks = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
    
    // Send the rows back to the user as a JSON array
    res.json(allTasks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// 'Mark a task as completed or change the title' endpoint - UPDATE
app.put('/tasks/:id', async (req, res) => {

  try {
    const { id } = req.params; // Get ID from the URL (e.g., /tasks/1)
    const { is_completed } = req.body; // Get the new status from the JSON body

    const updateTask = await pool.query(
      'UPDATE tasks SET is_completed = $1 WHERE id = $2 RETURNING *',
      [is_completed, id]
    );

    if (updateTask.rows.length === 0) {
      return res.status(404).json("Task not found");
    }

    res.json("Task was updated!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

});

// 'Remove Task' endpoint - DELETE
app.delete('/tasks/:id', async (req, res) => {

  try {
    const { id } = req.params;
    const deleteTask = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
   
    res.json("Task was deleted!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

});



app.listen(3000, () => console.log('Server running on port 3000'));

