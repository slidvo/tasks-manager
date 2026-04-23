import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import { logger } from '@src/logger'
import app from "@src/server"
import { User } from "@src/generated/prisma/client"
// 38747054+slidvo@users.noreply.github.com
const { getAllMock } = vi.hoisted(() => {
    return {
        getAllMock: vi.fn().mockResolvedValue([{
            id: 1,
            email: "mail@mail.ru",
            uuid: "d3d23hd82hf298fh948fh948f3h"
        }])
    }
})

const { addOneMock } = vi.hoisted(() => {
    return {
        addOneMock: vi.fn()
    }
})

const { updateOneMock } = vi.hoisted(() => {
    return {
        updateOneMock: vi.fn().mockResolvedValue(
            {
                "name": "Женя Потапов",
                "id": 1,
                "uuid": "d3d23hd82hf298fh948fh948f3h",
                "email": "potapovpro@mail.ru"

            } as User
        )
    }
})

vi.mock('@src/repos/UserRepoPrisma', () => {
    return {
        UserRepoPrisma: class {
            getAll = getAllMock
            addOne = addOneMock
            updateOne = updateOneMock
        }
    }
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