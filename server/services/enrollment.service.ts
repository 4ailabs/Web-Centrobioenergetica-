import { prisma } from '../../lib/prisma.js';

export class EnrollmentService {
    async updateUserCourses(userId: string, courseIds: string[]) {
        const numericIds = courseIds.map((cid: string) => parseInt(cid));

        // Upsert for added courses
        for (const cid of numericIds) {
            const exists = await prisma.progress.findFirst({
                where: { userId, courseId: cid },
            });

            if (!exists) {
                await prisma.progress.create({
                    data: { userId, courseId: cid },
                });
            }
        }

        // Delete progress where courseId is NOT in numericIds
        if (numericIds.length > 0) {
            await prisma.progress.deleteMany({
                where: {
                    userId,
                    courseId: { notIn: numericIds },
                },
            });
        } else {
            // If list is empty, delete all course progress
            await prisma.progress.deleteMany({
                where: { userId, courseId: { not: null } },
            });
        }

        return { message: 'Cursos actualizados' };
    }

    async getUserEnrollments(userId: string) {
        const enrollments = await prisma.progress.findMany({
            where: { userId },
            select: { courseId: true },
            distinct: ['courseId'],
        });

        return enrollments
            .map((e) => e.courseId?.toString() || '')
            .filter(Boolean);
    }
}

export const enrollmentService = new EnrollmentService();
