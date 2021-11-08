import request from "superagent";
import FilesHelper from "./utils/files-helper.mjs";
import cheerio from "cheerio";

request
    .get('https://zwfw.spb.gov.cn/mdwd/mdwdDetail?endNodeBeianUserName=&endNodeName=%E5%B9%BF%E4%B8%9C%E7%9C%81%E6%B2%B3%E6%BA%90%E5%B8%82%E8%BF%9E%E5%B9%B3%E5%8E%BF%E5%86%85%E8%8E%9E%E9%95%87%E5%9C%86%E9%80%9A%E5%BF%AB%E9%80%92%E6%9C%8D%E5%8A%A1%E7%82%B9&beianNum=%E7%B2%A4%E9%82%AE%E5%A4%8716201800026')
    .set('Cookie', 'zwfwCookie=4B1AD6EAE34AE7EA52541499BC976274')
    .then(async res => {
        const text = res.text;
        const fileName = `./output/${new Date().getTime()}.text`
        await FilesHelper.accumulateText(fileName, text)

        const $ = cheerio.load(text);
    })
    .catch(err => {
        // err.message, err.response
    });
