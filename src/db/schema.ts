import { relations } from "drizzle-orm/relations";
import { pgTable, timestamp, text, date, foreignKey, uniqueIndex, serial, integer } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const chapter = pgTable("Chapter", {
  id: text().primaryKey().notNull(),
  link: text().notNull(),
  title: text().notNull(),
  date: date()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  num: integer().default(0),
});

export const page = pgTable(
  "Page",
  {
    id: text().primaryKey().notNull(),
    img: text().notNull(),
    chapterId: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.chapterId],
      foreignColumns: [chapter.id],
      name: "Page_chapterId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
  ]
);

export const user = pgTable(
  "User",
  {
    id: serial().primaryKey().notNull(),
    email: text().notNull(),
    password: text().notNull(),
  },
  (table) => [uniqueIndex("User_email_key").using("btree", table.email.asc().nullsLast().op("text_ops"))]
);

export const komik = pgTable(
  "Komik",
  {
    id: text().primaryKey().notNull(),
    title: text().notNull(),
    slug: text().notNull(),
    poster: text().notNull(),
    date: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [uniqueIndex("Komik_slug_key").using("btree", table.slug.asc().nullsLast().op("text_ops"))]
);

export const issue = pgTable(
  "Issue",
  {
    id: text().primaryKey().notNull(),
    title: text().notNull(),
    thumb: text().notNull(),
    date: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    komikId: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.komikId],
      foreignColumns: [komik.id],
      name: "Issue_komikId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
  ]
);

export const halaman = pgTable(
  "Halaman",
  {
    id: text().primaryKey().notNull(),
    img: text().notNull(),
    issueId: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.issueId],
      foreignColumns: [issue.id],
      name: "Halaman_issueId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
  ]
);

export const group = pgTable("Group", {
  id: text().primaryKey().notNull(),
  name: text().notNull(),
});

export const manga = pgTable(
  "Manga",
  {
    id: text().primaryKey().notNull(),
    title: text().notNull(),
    thumb: text().notNull(),
    date: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    groupId: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.groupId],
      foreignColumns: [group.id],
      name: "Manga_groupId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
  ]
);

export const peji = pgTable(
  "Peji",
  {
    id: text().primaryKey().notNull(),
    img: text().notNull(),
    mangaId: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.mangaId],
      foreignColumns: [manga.id],
      name: "Peji_mangaId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
  ]
);

export const pageRelations = relations(page, ({ one }) => ({
  chapter: one(chapter, {
    fields: [page.chapterId],
    references: [chapter.id],
  }),
}));

export const chapterRelations = relations(chapter, ({ many }) => ({
  pages: many(page),
}));

export const issueRelations = relations(issue, ({ one, many }) => ({
  komik: one(komik, {
    fields: [issue.komikId],
    references: [komik.id],
  }),
  halamen: many(halaman),
}));

export const komikRelations = relations(komik, ({ many }) => ({
  issues: many(issue),
}));

export const halamanRelations = relations(halaman, ({ one }) => ({
  issue: one(issue, {
    fields: [halaman.issueId],
    references: [issue.id],
  }),
}));

export const mangaRelations = relations(manga, ({ one, many }) => ({
  group: one(group, {
    fields: [manga.groupId],
    references: [group.id],
  }),
  pejis: many(peji),
}));

export const groupRelations = relations(group, ({ many }) => ({
  manga: many(manga),
}));

export const pejiRelations = relations(peji, ({ one }) => ({
  manga: one(manga, {
    fields: [peji.mangaId],
    references: [manga.id],
  }),
}));
