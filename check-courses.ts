
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const courses = await prisma.course.findMany({
        include: {
            modules: {
                include: {
                    videos: true,
                },
            },
        },
    });
    console.log('COURSES_START');
    console.log(JSON.stringify(courses, null, 2));
    console.log('COURSES_END');
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
