const PATH_TYPE = process.env.PATH_TYPE;

let BLOG_IT_ID, BLOG_UI_ID,GOOGLE_TAG_MANAGER_ID;

if(PATH_TYPE === 'development'){
  BLOG_IT_ID = "5fa628ccd562a50b8e8058d5";
  BLOG_UI_ID = "5fa628d2d562a50b8e8058d6";
  GOOGLE_TAG_MANAGER_ID = 'GTM-W2XHB5N'
}else if(PATH_TYPE === 'production') {
  BLOG_IT_ID = "5fa666914cf5f3b760a06d8a";
  BLOG_UI_ID = "5fa666954cf5f3b760a06d8b";
  GOOGLE_TAG_MANAGER_ID = 'G-91N0S2HTB4'
}

export default {
  BLOG_IT_ID,BLOG_UI_ID,GOOGLE_TAG_MANAGER_ID
}
