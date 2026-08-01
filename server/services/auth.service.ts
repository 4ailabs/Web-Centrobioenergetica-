import { prisma } from '../../lib/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '../../lib/jwt.js';

interface RegisterUserData {
    email: string;
    password: string;
    name?: string;
}

interface LoginUserData {
    email: string;
    password: string;
}

export class AuthService {
    // Validar formato de email
    private validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validar contraseña
    private validatePassword(password: string): boolean {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    }

    async registerUser(data: RegisterUserData) {
        const { email, password, name } = data;

        // Validaciones
        if (!this.validateEmail(email)) {
            throw new Error('El formato del email no es válido');
        }

        if (!this.validatePassword(password)) {
            throw new Error(
                'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y números'
            );
        }

        // Verificar si el usuario ya existe
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new Error('El email ya está registrado');
        }

        // Hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: name || null,
                // Acceso inmediato a la cuenta: el control real está en la
                // asignación de cursos (sin cursos asignados no se ve ningún
                // contenido). `approved` se conserva para poder revocar el
                // acceso de una cuenta concreta desde el panel /admin.
                approved: true,
            },
            select: {
                id: true,
                email: true,
                name: true,
                approved: true,
            },
        });

        return {
            message: 'Cuenta creada. Ya puedes iniciar sesión.',
            user,
        };
    }

    async loginUser(data: LoginUserData) {
        const { email, password } = data;

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || !user.password) {
            throw new Error('Credenciales inválidas');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Credenciales inválidas');
        }

        if (!user.approved) {
            throw new Error('Tu cuenta está pendiente de aprobación por un administrador.');
        }

        // Cargar cursos inscritos del usuario
        const enrollments = await prisma.progress.findMany({
            where: { userId: user.id },
            select: { courseId: true },
            distinct: ['courseId'],
        });

        // Generar JWT
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                isAdmin: user.isAdmin,
            },
            getJwtSecret(),
            { expiresIn: '30d' }
        );

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                isAdmin: user.isAdmin,
                totalXP: user.totalXP,
                enrolledCourses: enrollments
                    .map((e) => e.courseId?.toString() || '')
                    .filter(Boolean),
                subscriptionStatus: user.premiumUnlocked ? 'active' : 'inactive',
            },
        };
    }

}

export const authService = new AuthService();
