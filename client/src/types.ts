export type Image = { id: number; url: string; heroId: number };
export type Superpower = { id: number; name: string; heroId: number };

export type Hero = {
  id: number;
  nickname: string;
  realName: string;
  originDescription: string;
  catchPhrase: string;
  images: Image[];
  superpowers: Superpower[];
};

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  pages: number;
};
