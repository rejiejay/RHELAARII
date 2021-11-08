import request from "superagent";

request
    .get('https://zwfw.spb.gov.cn/mdwd/data?currentPage=1&beianUserName=&currentPage=1&beianNum=&provinceId=19&cityId=241&currentPage=1&endNodeName=&verfcode=i4zu')
    .set('Cookie', 'zwfwCookie=4B1AD6EAE34AE7EA52541499BC976274')
    .then(res => {
        console.log(res.text);
    })
    .catch(err => {
        // err.message, err.response
    });
