import { PrismaClient } from '@prisma/client';
import { MOCK_DATA } from '../data/mockData';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting seed...');

    // Limpiar datos existentes
    await prisma.video.deleteMany();
    await prisma.module.deleteMany();
    await prisma.course.deleteMany();
    await prisma.service.deleteMany();
    await prisma.newsArticle.deleteMany();

    // Seed Courses
    for (const courseData of MOCK_DATA.courses) {
        const { modules, ...courseBase } = courseData;
        const course = await prisma.course.create({
            data: {
                ...courseBase,
                level: courseBase.level.toString(),
                modules: modules ? {
                    create: modules.map(m => ({
                        title: m.title,
                        description: m.description,
                        order: m.order,
                        videos: {
                            create: m.videos.map(v => ({
                                title: v.title,
                                description: v.description,
                                order: v.order,
                            }))
                        }
                    }))
                } : undefined
            }
        });
        console.log(`Created course: ${course.title}`);
    }

    // Seed Services
    for (const serviceData of MOCK_DATA.services) {
        await prisma.service.create({
            data: serviceData
        });
    }
    console.log('Created services');

    // Seed News
    for (const newsData of MOCK_DATA.news) {
        await prisma.newsArticle.create({
            data: newsData
        });
    }
    console.log('Created news articles');

    console.log('Seed finished successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
