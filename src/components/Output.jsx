import React, { useEffect } from 'react'
import { Heading } from '@chakra-ui/react'

const Output = () => {
	useEffect(() => {
		document.getElementById('outputPRE').innerHTML = JSON.stringify({ name: '', type: 'book', data: [] }, null, 2);
	}, [])

	return (
		<div className='w-[500px] h-[700px] bg-white ml-10 overflow-y-auto overflow-x-auto'>
			<Heading as='h1' className='ml-2'>JSON</Heading>

			<pre id='outputPRE' className='ml-2 mt-3'></pre>
		</div>
	)
}

export default Output