import { Request, Response, NextFunction, Router } from 'express';
import { envConfig } from '@src/env.config';
import jwt from "jsonwebtoken"
import { logger } from '@src/logger';
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    // Implementation for authentication middleware
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({ "message": "No token in request" })
    }

    const token = authHeader.split(" ")[1];

    const data = jwt.verify(token, envConfig.getJwtSecret()!) as { id: String }

    logger.debug(`Decoded JWT data: ${JSON.stringify(data)}`);

    (req as any).user = data;

    next();
}