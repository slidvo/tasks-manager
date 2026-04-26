import { UserRepoPrismaMock, resetUserRepoPrismaMock } from './mocks/UserRepoPrisma.mock'
import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import app from "@src/server"
import { RegisterResponse } from '@src/utils/types'
import { envConfig } from '@src/env.config'
import { makeTestToken } from './testAuth'

const token = makeTestToken(envConfig.getJwtSecret()!)

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
            .set("Authorization", `Bearer ${token}`)
            .send({
                "user": {
                    "name": "testUser",
                    "email": "test@mail.ru"
                }
            })
        expect(res.status).toBe(201);
        const { body } = res as { body: RegisterResponse };
        expect(body.id).toBe(1)
        expect(typeof body.jwt).toBe('string')
    })
})

describe('POST /api/auth/login', () => {

    it('should return jwt for existing user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'potapovpro@mail.ru',
                password: 'any-password',
            })

        expect(res.status).toBe(200)
        expect(typeof res.body.jwt).toBe('string')
    })
})
