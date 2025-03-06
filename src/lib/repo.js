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
	include:{
		Page: true
	},
	orderBy: [
		{
			Page: {
				id: "desc",
			}
		},
	],
})
pageModel.getPage = async function(id) {
	let data = await this.get(id)
	const dataAllChapter = await this.tbl.findMany({
		select: {
			id: true,
			title: true
		},
		orderBy: [
			{
				id: "asc",
			},
		],
	})
	const allChapter = dataAllChapter.map((e) => ({...e, link: `/view/${e.id}`}))
	const index = allChapter.findIndex((e) => e.id === id)
	const prev = index === 0 ? "" : allChapter[index - 1].link
	const next = index === allChapter.length - 1 ? "" : allChapter[index + 1].link
	data["allChapter"] = allChapter.reverse()
	data["nav"] = {prev, next, current: id, list: "/"}
	return data
}