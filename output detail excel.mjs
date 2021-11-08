import * as fs from 'fs';
import cheerio from "cheerio";
import FilesHelper from "./utils/files-helper.mjs";

const main = async () => {
    fs.readFile('./output/1636386553804.text', 'utf8', async (readFileError, content) => {
        const $ = cheerio.load(content);
        const companyList = $('.resultList').find('.companyList2');


        const resultList = companyList.map(function (i, el) {
            const element = $(this).text();

            return element.trim();
        }).toArray();


        const renderHtml = `${resultList[0]}	${resultList[2]}	${resultList[3]}	${resultList[6]}	${resultList[7]}`;

        const fileName = `./output/输出.text`
        await FilesHelper.accumulateText(fileName, renderHtml)
    });
}

main();
