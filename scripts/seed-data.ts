
import { PrismaClient } from '@prisma/client';
import { MOCK_DATA } from '../data/mockData';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding courses...');

  for (const courseData of MOCK_DATA.courses) {
    console.log(`Processing course: ${courseData.title}`);

    const course = await prisma.course.upsert({
      where: { id: courseData.id },
      update: {
        title: courseData.title,
        description: courseData.description,
        author: courseData.author,
        price: courseData.price,
        lessons: courseData.lessons,
        level: courseData.level,
        imageUrl: courseData.imageUrl,
      },
      create: {
        id: courseData.id,
        title: courseData.title,
        description: courseData.description,
        author: courseData.author,
        price: courseData.price,
        lessons: courseData.lessons,
        level: courseData.level,
        imageUrl: courseData.imageUrl,
      },
    });

    if (courseData.modules) {
      for (const moduleData of courseData.modules) {
        const module = await prisma.module.create({
          data: {
            title: moduleData.title,
            description: moduleData.description,
            order: moduleData.order,
            courseId: course.id,
          },
        });

        if (moduleData.videos) {
          for (const videoData of moduleData.videos) {
            let cloudflareId = videoData.cloudflareStreamId;
            let vUrl = null;

            // Update with user provided data if it matches Module 1, Chapter 1 of "Nutrición con Aminoácidos"
            if (courseData.id === 101 && moduleData.order === 1 && videoData.order === 1) {
              console.log('Updating video with user provided data...');
              cloudflareId = '81ab89ca0cff635143ed4dfb18416382';
              vUrl = 'https://customer-qhobzy75u1p8j3tq.cloudflarestream.com/81ab89ca0cff635143ed4dfb18416382/manifest/video.m3u8';
            }

            await prisma.video.create({
              data: {
                title: videoData.title,
                description: videoData.description,
                order: videoData.order,
                moduleId: module.id,
                cloudflareStreamId: cloudflareId,
                videoUrl: vUrl,
                duration: videoData.duration,
              },
            });
          }
        }
      }
    }
  }

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
