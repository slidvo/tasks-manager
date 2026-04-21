import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import { logger } from '@src/logger'
import app from "@src/server"

const { getAllMock } = vi.hoisted(() => {
    return {
        getAllMock: vi.fn().mockResolvedValue([{
            id: 1,
            email: "mail@mail.ru",
            uuid: "d3d23hd82hf298fh948fh948f3h"
        }])
    }
})

vi.mock('@src/repos/UserRepoPrisma', () => {
    return {
        UserRepoPrisma: class {
            getAll = getAllMock
        }
    }
})


describe('GET /api/users/all', () => {
    it("should return array of users", async () => {

        //
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