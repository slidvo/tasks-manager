import { PrismaPg } from '@prisma/adapter-pg';

import { UserDto } from '@src/models/User.model';
import { UserRepoPrisma } from '@src/repos/UserRepoPrisma';
import { generateJwt } from '@src/utils/jwt';
import { envConfig } from '@src/env.config';
import { logger } from '@src/logger';
import { LoginResponse, RegisterResponse } from '@src/utils/types';

const userRepoPrisma = new UserRepoPrisma(
    new PrismaPg({ connectionString: envConfig.getDatabaseUrlApi() }),
);

async function register(user: UserDto): Promise<RegisterResponse> {
    await userRepoPrisma.addOne(user);
    const registeredUser = await userRepoPrisma.getByEmail(user.email);
    logger.debug(`registeredUser = ${JSON.stringify(registeredUser)}`);
    return {
        id: registeredUser.id,
        jwt: generateJwt({
            id: registeredUser.id,
            email: registeredUser.email,
        }),
    };
}

async function login(email: string): Promise<LoginResponse> {
    const user = await userRepoPrisma.getByEmail(email);
    logger.debug(`login user = ${JSON.stringify({ id: user.id, email: user.email })}`);
    return {
        jwt: generateJwt({
            id: user.id,
            email: user.email,
        }),
    };
}


export default {
    register,
    login,
} as const;
