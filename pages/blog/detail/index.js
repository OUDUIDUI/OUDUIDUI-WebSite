import apiList from '@/utils/apiList'
import showdown from 'showdown'

export default {
  name: 'index',
  async asyncData({query,$axios}){
    const method = apiList.blog.detail.method;
    let url = apiList.blog.detail.url.replace("{id}",query.blogId);
    const {data} = await $axios[method](url);

    if(data.success){
      const converter = new showdown.Converter();
      const blogHtml = converter.makeHtml(data.blog.content);

      return{
        blogHtml,
        blog:data.blog,
        comments:data.comments
      }
    }
  },
}
