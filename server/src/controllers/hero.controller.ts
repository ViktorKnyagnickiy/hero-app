import { Request, Response } from "express";
import * as S from "../services/hero.service";

const absolutize = (base: string, hero: any) => ({
  ...hero,
  images: (hero.images || []).map((img: any) => ({
    ...img,
    url: img.url?.startsWith("http") ? img.url : `${base}${img.url}`,
  })),
});

export const list = async (req: Request, res: Response) => {
  const page = parseInt(String(req.query.page || 1));
  const limit = parseInt(String(req.query.limit || 5));
  const base = `${req.protocol}://${req.get("host")}`;

  const data = await S.listHeroes(page, limit);
  res.json({
    ...data,
    items: data.items.map((h: any) => absolutize(base, h)),
  });
};

export const getOne = async (req: Request, res: Response) => {
  const base = `${req.protocol}://${req.get("host")}`;
  const hero = await S.getHero(+req.params.id);
  if (!hero) return res.status(404).json({ message: "Not found" });
  res.json(absolutize(base, hero));
};

export const create = async (req: Request, res: Response) => {
  const { nickname, realName, originDescription, catchPhrase, superpowers } = req.body;
  const data = await S.createHero({
    nickname,
    realName,
    originDescription,
    catchPhrase,
    superpowers: Array.isArray(superpowers)
      ? superpowers
      : superpowers
      ? [superpowers]
      : [],
  });
  res.status(201).json(data);
};

export const update = async (req: Request, res: Response) => {
  const data = await S.updateHero(+req.params.id, req.body);
  res.json(data);
};

export const remove = async (req: Request, res: Response) => {
  await S.deleteHero(+req.params.id);
  res.status(204).end();
};

export const uploadImages = async (req: Request, res: Response) => {
  const files = (req.files || []) as Express.Multer.File[];

  const urls = files.map((f) => `/uploads/${f.filename}`);
  await S.addImages(+req.params.id, urls);

  
  const base = `${req.protocol}://${req.get("host")}`;
  res.status(201).json({ urls: urls.map((u) => `${base}${u}`) });
};

export const deleteImage = async (req: Request, res: Response) => {
  await S.removeImage(+req.params.imageId);
  res.status(204).end();
};
