import express, { Request, Response, Router } from 'express';
import pool from '../db'; // Ensure your db file exports the pg Pool instance
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router: Router = express.Router();

interface UserRow {
  user_id: number;
  email: string;
  password_hash: string;
  created_at: Date;
}

// 'User Login' endpoint - AUTH
router.post('/auth/login', async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    // Validation: Check if fields are provided
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    // Check if the user exists
    // <UserRow> tells TypeScript exactly what fields exist inside userResult.rows
    const userResult = await pool.query<UserRow>('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials." }); 
      // Error is vague so hackers don't know if the email or password was wrong
    }

    const user = userResult.rows[0];

    // Verify the password
    // bcrypt.compare takes the plain text password and compares it to the encrypted hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Ensure JWT Secret is defined in the environment
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in the environment variables.");
    }

    // Create a JSON Web Token
    const token = jwt.sign(
      { user_id: user.user_id }, 
      jwtSecret, 
      { expiresIn: '1h' } // Token expires in 1 hour for security
    );

    // Send the token back to the user
    return res.json({
      message: "Login successful!",
      token: token
    });

  } catch (err: any) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

export default router;