import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// This extends the standard Express Request type so TypeScript knows 'req.user' is allowed
export interface AuthenticatedRequest extends Request {
  user?: { user_id: number };
}

// this is the middleware
export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction): any {
  // 1. Get the token from the request header (Format: Bearer <TOKEN>)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // 2. If there's no token lock them out immediately
  if (!token) {
    return res.status(401).json({ error: "Access denied. Token missing." });
  }

  try {
    // 3. Verify the token using your secret key
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ error: "Server configuration error: JWT Secret missing." });
    }

    const decoded = jwt.verify(token, jwtSecret) as { user_id: number };

    // 4. Extract the user_id from the token and attach it to 'req.user'
    req.user = { user_id: decoded.user_id };

    // 5. Call next() to hand control over to your task route code!
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
}