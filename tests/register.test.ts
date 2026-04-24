import { UserRepoPrismaMock, resetUserRepoPrismaMock } from './mocks/UserRepoPrisma.mock'
import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import { logger } from '@src/logger'
import app from "@src/server"
import { RegisterResponse } from '@src/utils/types'

vi.mock('@src/repos/UserRepoPrisma', () => {
    return {
        UserRepoPrisma: UserRepoPrismaMock
    }
})

beforeEach(() => {
    resetUserRepoPrismaMock()
})

describe("POST /api/auth/register", () => {

    it("should return new registered user id and jwt", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({
                "user": {
                    "name": "testUser",
                    "email": "test@mail.ru"
                }
            })
        logger.debug(`POST /api/auth/register response: ${JSON.stringify(res)}`)
        expect(res.status).toBe(201);
        const { body } = res as { body: RegisterResponse };
        expect(body.id).toBe(1)
        expect(typeof body.jwt).toBe('string')
    })
})