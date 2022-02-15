/* eslint-disable array-callback-return */
import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  Button,
} from "@chakra-ui/react";
import { AddIcon, RepeatIcon, DeleteIcon } from "@chakra-ui/icons";

const InputSection = () => {
  const [chapters, setChapters] = useState([
    { chapterNo: 1, sections: [{ no: 1 }] },
  ]);

  const returnRandomId = () => {
    return Math.floor(Math.random() * 100000);
  };

  const handleAddChapter = () => {
    let currentChapters = [...chapters];
    let randomID = returnRandomId();
    currentChapters.push({
      chapterNo: randomID,
      sections: [{ no: 1 }],
    });
    setChapters(currentChapters);
  };

  const handleRemove = (chapterNo) => {
    let currentChapters = [...chapters];
    let updatedChapters = currentChapters.filter(
      (obj) => obj.chapterNo !== chapterNo
    );
    setChapters(updatedChapters);
  };

  const handleRemoveSection = (i, sectionNo) => {
    let currentChapters = [...chapters];
    let indexChapter = currentChapters[i];
    let updatedSections = indexChapter.sections?.filter(
      (obj) => obj.no !== sectionNo
    );
    currentChapters[i].sections = updatedSections;
    setChapters(currentChapters);
  };

  const handleAddSection = (i) => {
    let currentChapters = [...chapters];
    let randomID = returnRandomId();
    let indexChapter = currentChapters[i];
    indexChapter.sections?.push({
      no: randomID,
    });
    currentChapters[i] = indexChapter;
    setChapters(currentChapters);
  };

  const lowLevelConvert = () => {
    const bookName = document.getElementById("bookName").value;
    const responseObj = { type: "book", name: bookName, data: [] };

    Array.from(document.querySelectorAll('[id^="chapterDiv"]')).map(
      (chapter) => {
        let chapterText = chapter.querySelector("[id^='chapterText']").value;
        let chapterNo = chapter.querySelector("[id^='chapterNo']").value;

        let chapterObj = {
          type: "chapter",
          chapterNo: chapterNo,
          chapterName: chapterText,
          noOfSections: 0,
          sections: [],
        };

        Array.from(chapter.querySelectorAll("#sectionDiv")).map((section) => {
          let sectionText = section.querySelector("[id^='sectionText']").value;
          let sectionHeading = section.querySelector("[id^='sectionHeading']").value;
          let sectionObj = {
            type: "section",
            heading: sectionHeading,
            text: sectionText,
          };

          chapterObj.noOfSections += 1;
          chapterObj.sections.push(sectionObj);
        });

        responseObj.data.push(chapterObj);
      }
    );

    return JSON.stringify(responseObj, null, 2);
  };

  const handleConvert = () => {
    document.getElementById("outputPRE").innerHTML = lowLevelConvert();
    document.getElementById("copiedTextPara").textContent = "";
  };

  const handleReset = () => {
    setChapters([{ chapterNo: 1, sections: [{ no: 1 }] }]);
    document.getElementById("bookName").value = "";
    document.getElementById("sectionText").value = "";
    document.getElementById("sectionHeading").value = "";
    document.getElementById("chapterText").value = "";
    document.getElementById("outputPRE").innerHTML = JSON.stringify(
      { name: "", type: "book", data: [] },
      null,
      2
    );
    document.getElementById("copiedTextPara").textContent = "";
  };

  return (
    <div className="w-screen sm:w-[500px] h-1/2 sm:h-[700px] bg-white overflow-y-auto overflow-x-auto" id="inputSection">
      <div className="flex justify-around w-full">
        <FormControl className="ml-4 mt-2">
          <FormLabel htmlFor="bookName">
            <span className="font-semibold text-lg">Book Name</span>
          </FormLabel>
          <Input id="bookName" name="bookName" htmlSize={8} width="auto" />
        </FormControl>

        <Button className="mr-2 mt-2" onClick={handleReset}>
          Reset
        </Button>

        <Button
          className="mr-2 mt-2"
          leftIcon={<RepeatIcon w={7} h={7} paddingLeft="2" />}
          onClick={handleConvert}
        >
          <span className="pr-2">Convert</span>
        </Button>
      </div>

      <div className="flex justify-between w-full max-w-full mt-4">
        <Heading as="h2" className="ml-2">
          Chapters
        </Heading>

        <Button
          colorScheme="gray"
          leftIcon={<AddIcon />}
          variant="solid"
          onClick={handleAddChapter}
          className="mr-2"
        >
          Chapter
        </Button>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        {chapters?.map((chapter, i) => (
          <div
            className="flex flex-col border-2 mt-3 mb-3 w-full sm:w-[450px]"
            id={"chapterDiv" + i}
            key={chapter.chapterNo}
          >
            <div className="flex justify-end mr-2">
              <Button
                colorScheme="gray"
                leftIcon={<AddIcon />}
                variant="solid"
                onClick={() => handleAddSection(i)}
                className="mt-2"
              >
                Section
              </Button>

              <Button
                className="mr-2 mt-2 ml-3"
                bgColor="blue.100"
                onClick={(e) => handleRemove(chapter.chapterNo)}
              >
                <DeleteIcon color="red.600" />
              </Button>
            </div>

            <div className="flex flex-row">
              <FormControl className="ml-4">
                <FormLabel htmlFor={"chapterText" + chapter.chapterNo}>
                  <span className="font-semibold text-lg">Name</span>
                </FormLabel>
                <Input
                  id={"chapterText" + chapter.chapterNo}
                  name={"chapterText" + chapter.chapterNo}
                  htmlSize={8}
                  width="auto"
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor={"chapterNo" + chapter.chapterNo}>
                  <span className="font-semibold text-lg">No</span>
                </FormLabel>
                <Input
                  id={"chapterNo" + chapter.chapterNo}
                  name={"chapterNo" + chapter.chapterNo}
                  htmlSize={1}
                  width="auto"
                />
              </FormControl>
            </div>
            <div>
              <Heading size="lg" className="ml-1 sm:ml-4 mt-2 mb-2">
                Sections
              </Heading>

              {chapter?.sections?.map((section) => (
                <div
                  className="flex flex-row w-full sm:w-[400px] justify-center items-center mb-4 mt-4 sm:ml-4 bg-gray-100 rounded-lg"
                  id="sectionDiv"
                  key={section.no}
                >
                  <div className="flex flex-col">
                    <FormControl className="ml-2">
                      <FormLabel htmlFor={"sectionHeading" + chapter.chapterNo + section.no}>
                        <span className="font-semibold text-lg">Heading</span>
                      </FormLabel>
                      <Input
                        id={"sectionHeading" + chapter.chapterNo + section.no}
                        name={"sectionHeading" + chapter.chapterNo + section.no}
                        htmlSize={30}
                        width="auto"
                        className="mb-3"
                        borderColor="blue.200"
                      />
                    </FormControl>
                    <FormControl className="ml-2">
                      <FormLabel htmlFor={"sectionText" + chapter.chapterNo + section.no}>
                        <span className="font-semibold text-lg">Text</span>
                      </FormLabel>
                      <Input
                        id={"sectionText" + chapter.chapterNo + section.no}
                        name={"sectionText" + chapter.chapterNo + section.no}
                        htmlSize={30}
                        width="auto"
                        className="mb-3"
                        borderColor="blue.200"
                      />
                    </FormControl>
                  </div>

                  <div className="ml-2 mt-3 h-[176px]">
                    <Button
                      bgColor="blue.100"
                      onClick={() => handleRemoveSection(i, section.no)}
                    >
                      <DeleteIcon
                        color="red.600"
                      />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputSection;
