import { generateJwt, JwtPayload } from "@src/utils/jwt";
import jwt from 'jsonwebtoken';
import { logger } from "@src/logger";
import { envConfig } from "@src/env.config";

describe('generateJwt Test', () => {
    it("test", () => {
        const payload: JwtPayload = {
            id: 1,
            email: 'potapovpro@mail.ru'
        }

        const token = generateJwt(payload);
        logger.debug(`token ${token}`);

        const secret = envConfig.getJwtSecret();
        const decoded = jwt.verify(token, secret!) as JwtPayload;
        
        expect(decoded.id).toBe(payload.id);
        expect(decoded.email).toBe(payload.email);
    })
})