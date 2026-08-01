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

        // Una sola consulta para todas las inscripciones y su actividad, en
        // lugar de una por usuario. La fila sin `videoId` es la inscripción;
        // las que sí lo tienen indican que el alumno abrió ese curso.
        const filas = await prisma.progress.findMany({
            where: { courseId: { not: null } },
            select: { userId: true, courseId: true, videoId: true, completed: true },
        });

        const porUsuario = new Map<string, Map<number, { vistos: number; completados: number }>>();
        for (const fila of filas) {
            if (fila.courseId === null) continue;
            let cursos = porUsuario.get(fila.userId);
            if (!cursos) {
                cursos = new Map();
                porUsuario.set(fila.userId, cursos);
            }
            let datos = cursos.get(fila.courseId);
            if (!datos) {
                datos = { vistos: 0, completados: 0 };
                cursos.set(fila.courseId, datos);
            }
            if (fila.videoId !== null) {
                datos.vistos += 1;
                if (fila.completed) datos.completados += 1;
            }
        }

        return users.map((u) => {
            const cursos = porUsuario.get(u.id) ?? new Map();
            const actividadPorCurso: Record<string, { vistos: number; completados: number }> = {};
            for (const [courseId, datos] of cursos) {
                actividadPorCurso[courseId.toString()] = datos;
            }

            return {
                ...u,
                registeredAt: u.createdAt.toISOString(),
                subscriptionStatus: u.premiumUnlocked ? 'active' : 'inactive',
                enrolledCourses: Array.from(cursos.keys()).map((id) => id.toString()),
                actividadPorCurso,
                totalXP: u.totalXP,
            };
        });
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
