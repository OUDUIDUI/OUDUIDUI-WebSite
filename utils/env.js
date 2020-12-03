const PATH_TYPE = process.env.PATH_TYPE;

let ROOT_NODE_ID,GOOGLE_TAG_MANAGER_ID;

if(PATH_TYPE === 'development'){
    ROOT_NODE_ID = "5fa6268200790809705c2f97";
    GOOGLE_TAG_MANAGER_ID = 'GTM-W2XHB5N'
}else if(PATH_TYPE === 'production') {
    ROOT_NODE_ID = "5fa666884cf5f3b760a06d89";
    GOOGLE_TAG_MANAGER_ID = 'G-91N0S2HTB4'
}

export default {
    GOOGLE_TAG_MANAGER_ID
}
