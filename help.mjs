import * as fs from 'fs';
import cheerio from "cheerio";

const main = async () => {
    fs.readFile('./output/1636384915851.text', 'utf8', (readFileError, content) => {
        const $ = cheerio.load(content);
        const table = $('.right_zt').find('table');
        const tr = table.find('tr');

        const detailedInformationUrl = tr.filter(function (i, el) {
            return i !== 0;
        })
            .map(function (i, el) {
                const element = $(this).find('a');

                const result = element.map(function (i, el) {
                    const text = $(this).text()
                    const href = $(this).attr('href')

                    return {
                        href,
                        text
                    }
                }).toArray();

                return result[0].href;
            }).toArray();

        console.log(detailedInformationUrl);
    });
}

main();
