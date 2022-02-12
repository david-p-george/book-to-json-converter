import React, { useState } from 'react'

const Chapters = ({ chaptersArray }) => {
	const [chapters, setChapters] = useState(chaptersArray);

	return (
		<div>
			{chapters.map((chapter) => (
				<p>{chapter.chapterNo}</p>
			))}
		</div>
	)
}

export default Chapters