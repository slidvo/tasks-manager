import {
    getByUserMock,
    getByProjectMock,
    resetTimeSheetsRepoPrismaMock,
    TimeSheetsRepoPrismaMock,
} from './mocks/TimeSheetsRepoPrisma.mock';
import { envConfig } from '@src/env.config';
import app from '@src/server';
import request from 'supertest';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { makeTestToken } from './testAuth';

const token = makeTestToken(envConfig.getJwtSecret()!);

vi.mock('@src/repos/TimeSheetsRepoPrisma', () => ({
    TimeSheetsRepoPrisma: TimeSheetsRepoPrismaMock,
}));

beforeEach(() => {
    resetTimeSheetsRepoPrismaMock();
});

describe('GET /api/timesheets/:userId', () => {
    it('should return 200 with time sheets for a user', async () => {
        const res = await request(app)
            .get('/api/timesheets/12345')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(getByUserMock).toHaveBeenCalledWith(12345, {
            projectId: undefined,
            from: undefined,
            to: undefined,
        });
        expect(res.body.timeSheets).toHaveLength(2);
    });

    it('should pass projectId filter to repo', async () => {
        const res = await request(app)
            .get('/api/timesheets/12345?projectId=3')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(getByUserMock).toHaveBeenCalledWith(12345, expect.objectContaining({
            projectId: 3,
        }));
    });

    it('should pass from/to date filters to repo', async () => {
        const res = await request(app)
            .get('/api/timesheets/12345?from=2026-04-01&to=2026-04-30')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(getByUserMock).toHaveBeenCalledWith(12345, expect.objectContaining({
            from: new Date('2026-04-01'),
            to: new Date('2026-04-30'),
        }));
    });

    it('should return 401 without auth token', async () => {
        const res = await request(app).get('/api/timesheets/12345');

        expect(res.status).toBe(401);
    });
});

describe('GET /api/timesheets/projects/:projectId', () => {
    it('should return 200 with project name and developer breakdown', async () => {
        const res = await request(app)
            .get('/api/timesheets/projects/5')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(getByProjectMock).toHaveBeenCalledWith(5, {
            from: undefined,
            to: undefined,
        });
        expect(res.body.projectName).toBe('Test Project');
        expect(res.body.timeSheets).toHaveLength(2);
        expect(res.body.timeSheets).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ userName: 'Женя Потапов', totalSpentTime: 210 }),
                expect.objectContaining({ userName: 'Другой разраб', totalSpentTime: 60 }),
            ]),
        );
    });

    it('should pass from/to date filters to repo', async () => {
        const res = await request(app)
            .get('/api/timesheets/projects/5?from=2026-04-01&to=2026-04-30')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(getByProjectMock).toHaveBeenCalledWith(5, expect.objectContaining({
            from: new Date('2026-04-01'),
            to: new Date('2026-04-30'),
        }));
    });

    it('should return 401 without auth token', async () => {
        const res = await request(app).get('/api/timesheets/projects/5');

        expect(res.status).toBe(401);
    });
});
