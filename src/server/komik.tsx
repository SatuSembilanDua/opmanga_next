"use server";
import { db } from "@/db";
import { halaman, issue, komik } from "@/db/schema";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { and, asc, count, eq, ilike } from "drizzle-orm";
import { cache } from "react";

export type KomikType = typeof komik.$inferSelect;
// export type KomikType = typeof komik.$inferSelect | typeof manga.$inferSelect;
// export type KomikType = {
//   id: string;
//   title: string;
//   slug?: string;
//   poster?: string;
//   thumb?: string;
//   groupId?: string;
//   date: string;
// };
export type IssueType = typeof issue.$inferSelect;

export const getAllKomik = async () => {
  try {
    return await db.select().from(komik).orderBy(komik.id);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getKomikBySlug = cache(async (slug: string) => {
  try {
    const [data] = await db.select().from(komik).where(eq(komik.slug, slug)).limit(1);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
});

export const getKomikSearchPagin = async (slug: string, search: string, page: number = 1) => {
  try {
    const [komikData] = await db.select().from(komik).where(eq(komik.slug, slug));
    const where = search ? ilike(issue.title, `%${search}%`) : undefined;
    const [{ total }] = await db
      .select({ total: count() })
      .from(issue)
      .where(and(where, eq(issue.komikId, komikData.id)));
    const offset = (page - 1) * ITEMS_PER_PAGE;
    const issueData = await db
      .select()
      .from(issue)
      .where(and(where, eq(issue.komikId, komikData.id)))
      .orderBy(asc(issue.id))
      .limit(ITEMS_PER_PAGE)
      .offset(offset);
    return {
      komik: komikData,
      issue: issueData,
      totalPage: Math.ceil(total / ITEMS_PER_PAGE),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getPageData = cache(async (slug: string, id: string) => {
  try {
    const [issueData] = await db
      .select()
      .from(issue)
      .leftJoin(komik, eq(komik.id, issue.komikId))
      .where(and(eq(issue.id, id), eq(komik.slug, slug)))
      .limit(1);
    const halamanData = await db
      .select()
      .from(halaman)
      .where(eq(halaman.issueId, issueData.Issue.id))
      .orderBy(halaman.id);
    const dataNavRaw = await db
      .select({ id: issue.id })
      .from(issue)
      .where(eq(issue.komikId, issueData.Komik?.id ?? ""));
    const indexRow = dataNavRaw.findIndex((e) => e.id == id);
    const nav = {
      prev: indexRow - 1 < 0 ? null : dataNavRaw[indexRow - 1].id,
      next: indexRow + 1 >= dataNavRaw.length ? null : dataNavRaw[indexRow + 1].id,
    };
    return { Issue: { ...issueData.Issue, nav: nav }, Komik: issueData.Komik, pages: halamanData };
  } catch (error) {
    console.error(error);
    return null;
  }
});
