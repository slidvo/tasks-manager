import { UserRepoPrismaMock, resetUserRepoPrismaMock } from './mocks/UserRepoPrisma.mock'
import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import app from "@src/server"
import { RegisterResponse } from '@src/utils/types'
import jwt from "jsonwebtoken"
import { envConfig } from '@src/env.config'

const payload = {
    userId: 12345,
    username: 'john_doe',
    role: 'admin'
};

const token = jwt.sign(payload, envConfig.getJwtSecret()!)

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
