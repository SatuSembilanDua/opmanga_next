import ReaderContent from "../shared/reader-content"
import ReaderNav from "../shared/reader-nav"
import SelectChapter from "../shared/select-chapter"

const ReadPage = ({ pageTitle, data }) => {
	return (
		<>
			<div className="py-8 px-4 md:px-20">
				<h1 className="text-2xl pb-1 mb-4 border-b-2 border-dialect">{pageTitle}</h1>
				<SelectChapter options={data.allChapter} defaultValue={data.nav.current}/>
        <ReaderContent data={data.Page} />
        <ReaderNav data={data.nav}/>
			</div>
		</>
	)
}

export default ReadPage
