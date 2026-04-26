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
    /**
     * {"level":20,"time":1777183659034,"pid":21488,"hostname":"mechslidwo","name":"tasks-manager",
     * "msg":"Decoded JWT data: {\"id\":1,\"email\":\"email@email.com\",\"iat\":1777183611,\"exp\":1777187211}"}
     */
    logger.debug(`Decoded JWT data: ${JSON.stringify(data)}`);

    (req as any).user = data;

    next();
}