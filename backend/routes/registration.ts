import express, { Request, Response, Router } from 'express';
import pool from '../db'; // Ensure your db file exports the pg Pool instance
import bcrypt from 'bcrypt';

const router: Router = express.Router();

interface UserRow {
  user_id: number;
  email: string;
  password_hash: string;
  created_at: Date;
}

// 'User Registration' endpoint - AUTH
router.post('/auth/register', async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    // Basic Validation: Check if they provided both fields
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    // School Email Validation: Check if it ends with PAU's domain
    if (!email.endsWith('@pau.edu.ng')) {
      return res.status(403).json({ error: "Only school emails are allowed to register." });
    }

    // Check if the user already exists in the database
    const userCheck = await pool.query<UserRow>('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: "A user with this email already exists." });
    }

    // Hash the password safely (10 rounds of salt)
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Save the new user to the database 
    const newUser = await pool.query<UserRow>(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING user_id, email, created_at',
      [email, passwordHash]
    );

    // Return the new user details 
    return res.status(201).json({
      message: "User registered successfully!",
      user: newUser.rows[0]
    });

  } catch (err: any) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

export default router;