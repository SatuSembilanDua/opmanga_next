import DataModel from "./DataModel"
import prisma from "./prisma"

export const chapterModel = new DataModel(prisma.chapter, "chapter", {
	orderBy: [
		{
			id: "desc",
		},
	],
	searh_config: [
		{
			title: {
				contains: "",
				mode: "insensitive",
			},
		},
	],
})

export const pageModel = new DataModel(prisma.chapter, "page", {
	include: {
		Page: true,
	},
	orderBy: [
		{
			Page: {
				id: "desc",
			},
		},
	],
})
pageModel.getPageData = async function (id) {
	let data = await this.get(id)
	const dataAllChapter = await this.tbl.findMany({
		select: {
			id: true,
			title: true,
		},
		orderBy: [
			{
				id: "asc",
			},
		],
	})
	const allChapter = dataAllChapter.map((e) => ({ ...e, link: `/view/${e.id}` }))
	const index = allChapter.findIndex((e) => e.id === id)
	const prev = index === 0 ? "" : allChapter[index - 1].link
	const next = index === allChapter.length - 1 ? "" : allChapter[index + 1].link
	data["allChapter"] = allChapter.reverse()
	data["nav"] = { prev, next, current: id, list: "/" }
	return data
}

export const komikModel = new DataModel(prisma.komik, "komik", {
	orderBy: [
		{
			id: "asc",
		},
	],
	searh_config: [
		{
			title: {
				contains: "",
				mode: "insensitive",
			},
		},
	],
})
export const issueModel = new DataModel(prisma.issue, "issue", {
	searh_config: [
		{
			title: {
				contains: "",
				mode: "insensitive",
			},
		},
	],
})
issueModel.getPageData = async function (slug, id) {
	const rawData = await this.tbl.findUnique({
		include: {
			Halaman: true,
		},
		where: {
			id,
		},
	})
	let data = { id: rawData.id, title: rawData.title, Page: rawData.Halaman }
	const dataAllChapter = await this.tbl.findMany({
		select: {
			id: true,
			title: true,
			Komik: true,
		},
		where: {
			Komik: {
				slug: slug,
			},
		},
		orderBy: [
			{
				id: "asc",
			},
		],
	})
	const allChapter = dataAllChapter.map((e) => ({ id: e.id, title: e.title, link: `/kimok/${slug}/view/${e.id}` }))
	const index = allChapter.findIndex((e) => e.id === id)
	const prev = index === 0 ? "" : allChapter[index - 1].link
	const next = index === allChapter.length - 1 ? "" : allChapter[index + 1].link
	data["allChapter"] = allChapter
	data["nav"] = { prev, next, current: id, list: "/" }
	return data
}
