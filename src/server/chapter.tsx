"use server";
import { db } from "@/db";
import { chapter, page } from "@/db/schema";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { and, count, desc, eq, gt, gte, ilike, lt } from "drizzle-orm";
import { cache } from "react";

export type ChapterType = typeof chapter.$inferSelect;
export interface ChapterPageType extends ChapterType {
  pages: Array<typeof chapter.$inferSelect>;
}
export type NavChapterType = {
  prev: string | null;
  next: string | null;
};
export type PageType = {
  id: string;
  img: string;
  chapterId: string | null;
};

export const getChapterSearchPagin = async (search: string, page: number = 1) => {
  try {
    const where = search ? ilike(chapter.title, `%${search}%`) : undefined;
    const [{ total }] = await db.select({ total: count() }).from(chapter).where(where);
    if (where !== undefined) {
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const data = await db
        .select()
        .from(chapter)
        .where(where)
        .orderBy(desc(chapter.num))
        .limit(ITEMS_PER_PAGE)
        .offset(offset);
      return { data, totalPage: Math.ceil(total / ITEMS_PER_PAGE) };
    }
    const offset = total - ITEMS_PER_PAGE * page - 1;
    const limit = page == 1 ? total : total - 1 - ITEMS_PER_PAGE * (page - 1);
    const data = await db
      .select()
      .from(chapter)
      .where(and(gte(chapter.num, offset), lt(chapter.num, limit)))
      .orderBy(desc(chapter.num));
    return { data, totalPage: Math.ceil(total / ITEMS_PER_PAGE) };
  } catch (error) {
    console.log(error);
  }
};

export const getChapterNav = async (num: number): Promise<NavChapterType> => {
  try {
    const [p, n] = await Promise.all([
      db.select({ id: chapter.id }).from(chapter).where(lt(chapter.num, num)).orderBy(desc(chapter.num)).limit(1),
      db.select({ id: chapter.id }).from(chapter).where(gt(chapter.num, num)).orderBy(desc(chapter.num)).limit(1),
    ]);
    return { prev: p[0]?.id ?? null, next: n[0]?.id ?? null };
  } catch (error) {
    console.log(error);
    return { prev: null, next: null };
  }
};

export const getChapterPage = cache(async (id: string) => {
  try {
    const data = await db
      .select({ chapter, page })
      .from(chapter)
      .leftJoin(page, eq(chapter.id, page.chapterId))
      .where(eq(chapter.id, id));

    type ResultType = {
      id: string;
      link: string;
      title: string;
      date: string;
      num: number | null;
      pages: Array<PageType>;
      nav: NavChapterType;
    };

    if (data.length === 0) {
      return null;
    }
    const chapterRow = data[0].chapter;
    const result: ResultType = {
      id: chapterRow.id,
      link: chapterRow.link,
      title: chapterRow.title,
      date: chapterRow.date,
      num: chapterRow.num,
      pages: [],
      nav: await getChapterNav(chapterRow.num ?? 0),
    };
    for (const row of data) {
      if (row.page) {
        result.pages.push({
          id: row.page.id,
          img: row.page.img,
          chapterId: row.page.chapterId,
        });
      }
    }
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
});
