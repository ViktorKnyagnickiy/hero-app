
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const listHeroes = async (page = 1, limit = 5) => {
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    prisma.hero.findMany({
      skip,
      take: limit,
      include: { images: { take: 1 } },
      orderBy: { id: "desc" },
    }),
    prisma.hero.count(),
  ]);
  return { items, total, page, pages: Math.ceil(total / limit) };
};

export const getHero = (id: number) =>
  prisma.hero.findUnique({
    where: { id },
    include: { images: true, superpowers: true },
  });

export const createHero = async (data: {
  nickname: string;
  realName: string;
  originDescription: string;
  catchPhrase: string;
  superpowers: string[];
}) => {
  return prisma.hero.create({
    data: {
      nickname: data.nickname,
      realName: data.realName,
      originDescription: data.originDescription,
      catchPhrase: data.catchPhrase,
      superpowers: { create: data.superpowers.map((name) => ({ name })) },
    },
  });
};

export const updateHero = async (
  id: number,
  data: Partial<{
    nickname: string;
    realName: string;
    originDescription: string;
    catchPhrase: string;
    superpowers: string[];
  }>
) => {
  const ops: any = { ...data };
  if (data.superpowers) {
    ops.superpowers = {
      deleteMany: {},
      create: data.superpowers.map((name) => ({ name })),
    };
  }
  return prisma.hero.update({ where: { id }, data: ops });
};

export const deleteHero = (id: number) => prisma.hero.delete({ where: { id } });

export const addImages = (id: number, urls: string[]) =>
  prisma.image.createMany({ data: urls.map((url) => ({ url, heroId: id })) });

export const removeImage = (imageId: number) =>
  prisma.image.delete({ where: { id: imageId } });
