import { User } from "@src/generated/prisma/browser"


export const getAllMock = vi.fn()
export const addOneMock = vi.fn()
export const updateOneMock = vi.fn()
export const getByEmailMock = vi.fn()

export class UserRepoPrismaMock {
    getAll = getAllMock
    addOne = addOneMock
    updateOne = updateOneMock
    getByEmail = getByEmailMock
}

export function resetUserRepoPrismaMock() {
    getAllMock.mockReset()
    addOneMock.mockReset()
    updateOneMock.mockReset()
    getByEmailMock.mockReset()

    getAllMock.mockResolvedValue([{
        id: 1,
        email: "mail@mail.ru",
        uuid: "d3d23hd82hf298fh948fh948f3h"
    }])

    updateOneMock.mockResolvedValue({
        "name": "Женя Потапов",
        "id": 1,
        "uuid": "d3d23hd82hf298fh948fh948f3h",
        "email": "potapovpro@mail.ru"

    } as User)

    getByEmailMock.mockResolvedValue({
        "name": "Женя Потапов",
        "id": 1,
        "uuid": "d3d23hd82hf298fh948fh948f3h",
        "email": "potapovpro@mail.ru"
    } as User)
} 