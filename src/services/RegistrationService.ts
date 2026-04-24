import { PrismaPg } from '@prisma/adapter-pg';

import { UserDto } from '@src/models/User.model';
import { UserRepoPrisma } from '@src/repos/UserRepoPrisma';
import { generateJwt } from '@src/utils/jwt';
import { envConfig } from '@src/env.config';
import { logger } from '@src/logger';
import { RegisterResponse } from '@src/utils/types';

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


export default {
    register,
} as const;
