const PATH_TYPE = process.env.PATH_TYPE;

export let BLOG_IT_ID,
  BLOG_UI_ID;

if(PATH_TYPE === 'development'){
  BLOG_IT_ID = "5fa628ccd562a50b8e8058d5";
  BLOG_UI_ID = "5fa628d2d562a50b8e8058d6";
}else if(PATH_TYPE === 'production') {
  BLOG_IT_ID = "5fa666914cf5f3b760a06d8a";
  BLOG_UI_ID = "5fa666954cf5f3b760a06d8b";
}

export default {
  BLOG_IT_ID,BLOG_UI_ID
}
