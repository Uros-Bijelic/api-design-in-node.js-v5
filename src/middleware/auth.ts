import type { NextFunction, Request, Response } from 'express';
import { verifyToken, type JWTPayload } from '../utils/jwt.ts';

export interface AuthenticateRequest extends Request {
    user?: JWTPayload;
}

export const authenticateToken = async (
    req: AuthenticateRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                error: 'Bad Request'
            });
        }

        const payload = await verifyToken(token);
        req.user = payload;
        next();
    } catch (e) {
        res.status(403).json({ error: 'Forbidden' });
    }
};
