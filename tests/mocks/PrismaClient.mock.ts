export const findUniqueMock = vi.fn()
export const updateManyMock = vi.fn()

export class PrismaClientMock {
    task = {
        findUnique: findUniqueMock,
        updateMany: updateManyMock,
    }
}

export function resetPrismaClientMock() {
    findUniqueMock.mockReset()
    updateManyMock.mockReset()
}
