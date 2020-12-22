const PATH_TYPE = process.env.PATH_TYPE;

let GOOGLE_TAG_MANAGER_ID,WEB_URL,API_URL;

if(PATH_TYPE === 'development'){
    GOOGLE_TAG_MANAGER_ID = 'GTM-W2XHB5N';
    WEB_URL='http://localhost:3000';
    API_URL='http://localhost:3000/api';
}else if(PATH_TYPE === 'production') {
    GOOGLE_TAG_MANAGER_ID = 'GTM-PJW2BR5';
    WEB_URL='https://ouduidui.cn';
    API_URL='http://ouduidui.cn/ouduiduiApi'
}

export default {
    GOOGLE_TAG_MANAGER_ID,WEB_URL,API_URL
}
