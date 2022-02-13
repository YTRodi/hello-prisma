import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async () =>
  await prisma.user.create({
    data: {
      name: "Maggie",
      email: "maggieloca@gmail.com",
      posts: {
        create: { title: "Hello World" },
      },
      profile: {
        create: { bio: "Me gusta morder todo" },
      },
    },
  });

const getAllUsers = async () =>
  await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });

const updatePost = async () => {
  const post = await prisma.post.update({
    where: { id: 1 },
    data: {
      published: true,
    },
  });

  console.dir(`UpdatedPost: ${post}`, { depth: null });
};

const main = async () => {
  await createUser();
  await updatePost();

  const allUsers = await getAllUsers();

  console.dir(allUsers, { depth: null });
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
