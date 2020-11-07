const PATH_TYPE = process.env.PATH_TYPE;

let BLOG_IT_ID,
  BLOG_UI_ID;

if(PATH_TYPE === 'development'){
  BLOG_IT_ID = 123;
  BLOG_UI_ID = 123;
}else if(PATH_TYPE === 'production') {
  BLOG_IT_ID = 456;
  BLOG_UI_ID = 456;
}

export default {
  BLOG_IT_ID,BLOG_UI_ID
}
