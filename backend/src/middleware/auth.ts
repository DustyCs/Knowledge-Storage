import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


// Extend the Request type to include `user`
interface AuthenticatedRequest extends Request {
    user?: string;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "No token" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    req.user = decoded.id;
    
    next();

  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
