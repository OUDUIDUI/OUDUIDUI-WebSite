const PATH_TYPE = process.env.PATH_TYPE;

let GOOGLE_TAG_MANAGER_ID;

if(PATH_TYPE === 'development'){
    GOOGLE_TAG_MANAGER_ID = 'GTM-W2XHB5N'
}else if(PATH_TYPE === 'production') {
    GOOGLE_TAG_MANAGER_ID = 'GTM-PJW2BR5'
}

export default {
    GOOGLE_TAG_MANAGER_ID
}
