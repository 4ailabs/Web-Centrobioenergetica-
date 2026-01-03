import { prisma } from '../../lib/prisma.js';
import bcrypt from 'bcryptjs';

interface CreateUserData {
    email: string;
    password: string;
    name?: string;
    isAdmin?: boolean;
    subscriptionStatus?: 'active' | 'inactive';
}

interface UpdateUserData {
    name?: string;
    email?: string;
    isAdmin?: boolean;
    approved?: boolean;
    password?: string;
    subscriptionStatus?: 'active' | 'inactive';
}

export class UsersService {
    async getAllUsers() {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
        });

        // Map users to include enrollment data
        const mappedUsers = await Promise.all(
            users.map(async (u) => {
                const enrollments = await prisma.progress.findMany({
                    where: { userId: u.id },
                    select: { courseId: true },
                    distinct: ['courseId'],
                });

                return {
                    ...u,
                    registeredAt: u.createdAt.toISOString(),
                    subscriptionStatus: u.premiumUnlocked ? 'active' : 'inactive',
                    enrolledCourses: enrollments
                        .map((e) => e.courseId?.toString() || '')
                        .filter(Boolean),
                    totalXP: u.totalXP,
                };
            })
        );

        return mappedUsers;
    }

    async createUser(data: CreateUserData) {
        const { email, password, name, isAdmin, subscriptionStatus } = data;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                isAdmin: isAdmin || false,
                approved: true, // Admin created users are approved
                premiumUnlocked: subscriptionStatus === 'active',
            },
        });

        return newUser;
    }

    async updateUser(userId: string, data: UpdateUserData) {
        const { name, email, isAdmin, approved, password, subscriptionStatus } = data;

        const dataToUpdate: any = {};
        if (name !== undefined) dataToUpdate.name = name;
        if (email !== undefined) dataToUpdate.email = email;
        if (isAdmin !== undefined) dataToUpdate.isAdmin = isAdmin;
        if (approved !== undefined) dataToUpdate.approved = approved;
        if (subscriptionStatus !== undefined)
            dataToUpdate.premiumUnlocked = subscriptionStatus === 'active';

        if (password) {
            dataToUpdate.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: dataToUpdate,
        });

        return updatedUser;
    }

    async deleteUser(userId: string) {
        await prisma.user.delete({ where: { id: userId } });
        return { message: 'Usuario eliminado' };
    }

    async updateSubscription(userId: string, status: 'active' | 'inactive') {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { premiumUnlocked: status === 'active' },
        });

        return updatedUser;
    }
}

export const usersService = new UsersService();
