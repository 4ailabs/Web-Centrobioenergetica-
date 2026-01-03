#!/usr/bin/env tsx
/**
 * Script para crear manualmente el usuario administrador
 * Uso: tsx scripts/create-admin.ts [email] [password] [name]
 *
 * Ejemplo:
 * tsx scripts/create-admin.ts admin@instituto.com admin123 "Admin Instituto"
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
    // Obtener argumentos de la línea de comandos
    const args = process.argv.slice(2);

    const email = args[0] || 'admin@instituto.com';
    const password = args[1] || 'admin123';
    const name = args[2] || 'Admin Instituto';

    console.log('='.repeat(50));
    console.log('Creando usuario administrador...');
    console.log('='.repeat(50));
    console.log(`Email: ${email}`);
    console.log(`Nombre: ${name}`);
    console.log('='.repeat(50));

    try {
        // Verificar si el usuario ya existe
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            console.log('⚠️  El usuario ya existe.');
            console.log('¿Quieres actualizar la contraseña? (y/n)');

            // En producción, simplemente actualizamos
            const hashedPassword = await bcrypt.hash(password, 10);

            await prisma.user.update({
                where: { email },
                data: {
                    password: hashedPassword,
                    isAdmin: true,
                    approved: true,
                },
            });

            console.log('✅ Contraseña actualizada exitosamente');
        } else {
            // Crear nuevo usuario
            const hashedPassword = await bcrypt.hash(password, 10);

            await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                    isAdmin: true,
                    approved: true,
                },
            });

            console.log('✅ Usuario administrador creado exitosamente');
        }

        console.log('='.repeat(50));
        console.log('Credenciales:');
        console.log(`  Email: ${email}`);
        console.log(`  Password: ${password}`);
        console.log('='.repeat(50));
        console.log('⚠️  IMPORTANTE: Cambia la contraseña después del primer login');
        console.log('='.repeat(50));

    } catch (error) {
        console.error('❌ Error al crear el administrador:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

createAdmin();
