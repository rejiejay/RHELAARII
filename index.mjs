import request from "superagent";
import FilesHelper from "./utils/files-helper.mjs";
import cheerio from "cheerio";

const baseUrl = 'https://zwfw.spb.gov.cn'
const listPage = (currentPage) => `/mdwd/data?currentPage=${currentPage}&beianUserName=&currentPage=${currentPage}&beianNum=&provinceId=19&cityId=241&currentPage=${currentPage}&endNodeName=&verfcode=i4zu`

const getDetailUrl = currentPage => new Promise(async (resolve, reject) => {
    request
        .get(`${baseUrl}${listPage(currentPage)}`)
        .set('Cookie', 'zwfwCookie=4B1AD6EAE34AE7EA52541499BC976274')
        .then(async res => {
            const text = res.text;
            const $ = cheerio.load(text);
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

            setTimeout(() => resolve(detailedInformationUrl), 2000)
        })
        .catch(err => {
            reject(err);
        });
})

const outputDetailExcel = url => new Promise(async (resolve, reject) => {
    request
        .get(`${baseUrl}${url}`)
        .set('Cookie', 'zwfwCookie=4B1AD6EAE34AE7EA52541499BC976274')
        .then(async res => {
            const text = res.text;
            const $ = cheerio.load(text);
            const companyList = $('.resultList').find('.companyList2');


            const resultList = companyList.map(function (i, el) {
                const element = $(this).text();

                return element.trim();
            }).toArray();


            const renderHtml = `${resultList[0]}	${resultList[2]}	${resultList[3]}	${resultList[6]}	${resultList[7]}`;

            const fileName = `./output/输出.text`
            await FilesHelper.accumulateText(fileName, renderHtml)

            setTimeout(() => resolve(), 2000)
        })
        .catch(err => {
            reject(err);
        });
})

const main = async () => {
    for (let currentPage = 1; currentPage <= 64; currentPage++) {
        let detailedInformationUrl = [];

        try {
            detailedInformationUrl = await getDetailUrl(currentPage)
        } catch (error) {
            console.error(error);
            return;
        }

        for (let index = 0; index <= url; index++) {
            const url = detailedInformationUrl[index];

            try {
                await outputDetailExcel(url)
            } catch (error) {
                console.error(error);
                return;
            }
        }
    }
}

main();
