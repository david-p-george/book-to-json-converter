import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Heading, Button } from '@chakra-ui/react';
import { AddIcon, RepeatIcon, DeleteIcon } from '@chakra-ui/icons'

const InputSection = () => {
	const [chapters, setChapters] = useState([{ chapterNo: 1, sections: [{ no: 1 }] }]);

	const handleAddChapter = () => {
		let currentChapters = [...chapters];
		currentChapters.push({ chapterNo: chapters.length + 1, sections: [{ no: 1 }] });
		setChapters(currentChapters);
	}

	const handleRemove = (index) => {
		// chapters.splice(index, 1);
		let currentChapters = [...chapters];
		currentChapters.splice(index, 1);
		setChapters(currentChapters);
	}

	const handleRemoveSection = (i, sectionNo) => {
		let currentChapters = [...chapters];
		let indexChapter = currentChapters[i];
		currentChapters[i] = indexChapter.sections.filter(obj => obj !== sectionNo);
		setChapters(currentChapters);
	}

  return (
		<div className='w-[500px] h-[700px] bg-white overflow-y-auto overflow-x-auto'>
			<div className='flex justify-between w-full'>
				<FormControl className='ml-2 mt-2'>
					<FormLabel htmlFor='bookName'><span className='font-semibold text-lg'>Book Name</span></FormLabel>
					<Input id='bookName' name='bookName' htmlSize={8} width='auto' />
				</FormControl>

				<Button className='mr-2 mt-2' leftIcon={<RepeatIcon />}>
					Convert
				</Button>
			</div>

			<div className='flex justify-between w-full max-w-full mt-4'>
				<Heading as='h2' className='ml-2'>Chapters</Heading>

				<Button 
				colorScheme='gray' 
				leftIcon={<AddIcon />} 
				variant='solid'
				onClick={handleAddChapter}
				className='mr-2'>
			   Chapter
		  </Button>
			</div>

			<div className='w-full flex flex-col justify-center items-center'>
				{chapters.map((chapter, i) => (
					<div className='flex flex-col border-2 mt-3 mb-3 w-[450px]' id='chapter'>
						<div className='flex justify-end mr-2'>
							<Button 
								colorScheme='gray' 
								leftIcon={<AddIcon />} 
								variant='solid' 
								onClick={() => chapter.sections.push({ no: chapter.sections.length + 1 })}
								className='mt-2'>
									Section
							</Button>

							<Button className='mr-2 mt-2 ml-3'>
								<DeleteIcon color='red.500' onClick={() => handleRemove(i)} />
							</Button>
						</div>

						<div className='flex flex-row'>
							<FormControl className='ml-2'>
								<FormLabel htmlFor='chapterText'><span className='font-semibold text-lg'>Name</span></FormLabel>
								<Input id='chapterText' name='chapterText' htmlSize={8} width='auto' />
							</FormControl>

							<FormControl>
								<FormLabel htmlFor='chapterNo'><span className='font-semibold text-lg'>No</span></FormLabel>
								<Input id='chapterNo' name='chapterNo' isReadOnly={true} value={chapter.chapterNo} htmlSize={1} width='auto' />
							</FormControl>
						</div>

						<div>
							<Heading size='lg' className='ml-2 mt-2'>Sections</Heading>

							{chapter.sections.map((section) => (
								<div className='flex flex-row w-[400px] justify-center items-center mb-4 mt-4 ml-5 rounded-lg bg-gray-100'>
									<FormControl className='ml-2'>
										<FormLabel htmlFor='sectionText'><span className='font-semibold text-lg'>Text</span></FormLabel>
										<Input id='sectionText' name='sectionText' htmlSize={30} width='auto' className='mb-3' borderColor='blue.200' />
									</FormControl>

									<Button className='mr-2 mt-6 ml-3' bgColor='blue.100'>
										<DeleteIcon 
											color='red.500' 
											onClick={() => chapter.sections = chapter.sections.filter(obj => obj !== section.no )} 
										/>
									</Button>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
  )
}

export default InputSection