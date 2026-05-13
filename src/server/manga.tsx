"use server";
import { db } from "@/db";
import { group, manga, peji } from "@/db/schema";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { count, desc, eq, ilike } from "drizzle-orm";
import { cache } from "react";

export type MangaType = typeof manga.$inferSelect;

export const getMangaSearchPagin = async (search: string, page: number = 1) => {
  try {
    const where = search ? ilike(manga.title, `%${search}%`) : undefined;
    const offset = (page - 1) * ITEMS_PER_PAGE;
    const [{ total }] = await db.select({ total: count() }).from(manga).where(where);
    const data = await db
      .select({
        id: manga.id,
        title: manga.title,
        thumb: manga.thumb,
        date: manga.date,
        Group: {
          name: group.name,
        },
      })
      .from(manga)
      .where(where)
      .leftJoin(group, eq(group.id, manga.groupId))
      .orderBy(desc(manga.date))
      .limit(ITEMS_PER_PAGE)
      .offset(offset);
    return { data, totalPage: Math.ceil(total / ITEMS_PER_PAGE) };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMangaPage = cache(async (id: string) => {
  try {
    const dataNavRaw = await db
      .select({
        id: manga.id,
        title: manga.title,
        group: group.name,
      })
      .from(manga)
      .leftJoin(group, eq(group.id, manga.groupId))
      .orderBy(desc(manga.date));
    const dataPeji = await db.select().from(peji).where(eq(peji.mangaId, id));
    const indexRow = dataNavRaw.findIndex((e) => e.id == id);
    const nav = {
      prev: indexRow - 1 < 0 ? null : dataNavRaw[indexRow - 1].id,
      next: indexRow + 1 >= dataNavRaw.length ? null : dataNavRaw[indexRow + 1].id,
    };
    const data = {
      ...dataNavRaw[indexRow],
      pages: dataPeji,
      nav: nav,
    };
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
});
