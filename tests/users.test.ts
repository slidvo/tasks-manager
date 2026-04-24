import { UserRepoPrismaMock, resetUserRepoPrismaMock } from './mocks/UserRepoPrisma.mock'
import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import { logger } from '@src/logger'
import app from "@src/server"

vi.mock('@src/repos/UserRepoPrisma', () => {
    return {
        UserRepoPrisma: UserRepoPrismaMock
    }
})

beforeEach(() => {
    resetUserRepoPrismaMock()
})

describe('GET /api/users/all', () => {
    it("should return array of users", async () => {
        const res = await request(app).get("/api/users/all")
        logger.debug(`GET /api/users/all response: ${JSON.stringify(res)}`)
        expect(res.status).toBe(200)
        expect(res.body).toEqual({
            "users": [
                {
                    email: "mail@mail.ru"
                }
            ]
        })
    })

})

describe('POST /api/users/add', () => {
    it("should return http status 201", async () => {
        const res = await request(app)
            .post("/api/users/add")
            .send({
                "user": {
                    "name": "Женя Потапов",
                    "email": "potapovpro@mail.ru"
                }
            })

        logger.debug(`POST /api/users/add response: ${JSON.stringify(res)}`)
        expect(res.status).toBe(201)
    })

})

describe('POST /api/users/update', () => {
    it("should return http status 200", async () => {
        const res = await request(app)
            .put("/api/users/update")
            .send({
                "user": {
                    "name": "Женя Потапов",
                    "email": "potapovpro@mail.ru"
                }
            })

        logger.debug(`POST /api/users/update response: ${JSON.stringify(res)}`)
        expect(res.status).toBe(200)
    })

})

describe('DELETE /api/users/delete/:id', () => {
    it("should return http status 200", async () => {
        const res = await request(app).delete("/api/users/delete/1")

        logger.debug(`DELETE /api/users/delete/1 response: ${JSON.stringify(res)}`)
        expect(res.status).toBe(200)
    })

})