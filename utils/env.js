const PATH_TYPE = process.env.PATH_TYPE;

let GOOGLE_TAG_MANAGER_ID,WEB_URL;

if(PATH_TYPE === 'development'){
    GOOGLE_TAG_MANAGER_ID = 'GTM-W2XHB5N';
    WEB_URL='http://localhost:3000';
}else if(PATH_TYPE === 'production') {
    GOOGLE_TAG_MANAGER_ID = 'GTM-PJW2BR5';
    WEB_URL='http://ouduidui.cn';
}

export default {
    GOOGLE_TAG_MANAGER_ID,WEB_URL
}
