import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@instituto.com';
    const password = 'admin123';
    const name = 'Admin Instituto';

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (!existingUser) {
        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                isAdmin: true,
                approved: true, // Auto-approve admin
            },
        });
        console.log('Admin user created');
    } else {
        console.log('Admin user already exists');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
