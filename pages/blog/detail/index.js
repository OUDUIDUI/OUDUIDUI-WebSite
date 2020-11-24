import apiList from '@/utils/apiList'
import marked from 'marked'
import hljs from 'highlight.js'
import moment from 'moment'
import Modal from '@/components/Modal/index.vue'
import { mapState } from 'vuex'
import Alert from '@/components/Alert/index.vue'
import qs from 'qs'

export default {
  name: 'index',
  head: {
    script: [
      {
        src: 'http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css'
      }
    ]
  },
  components:{
    Modal,Alert
  },
  async asyncData({query,$axios,error}){
    const method = apiList.blog.detail.method;
    let url = apiList.blog.detail.url.replace("{id}",query.blogId);
    const {data} = await $axios[method](url);

    if(data.success){
      const rendererMD = new marked.Renderer();
      marked.setOptions({
        renderer: rendererMD,
        gfm: true,   // 允许github标准的markdown
        tables: true,   // 允许支持表格语法，该选项要求gfm为true
        breaks: true,   // 允许回车换行，该选项要求gfm为true
        pedantic: false,  // 尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
        sanitize: false,  // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
        smartLists: true,  // 使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉.
        smartypants: false  // 使用更为时髦的标点，比如在引用语法中加入破折号。
      });

      // 代码高亮
      marked.setOptions({
        highlight: function (code) {
          return hljs.highlightAuto(code).value;
        },
      });
      let blogHtml = marked(data.blog.content);
      blogHtml = blogHtml.replace(/<br>/g, "</p><p>");

      // 评论时间格式化
      data.comments.forEach(comment => {
        comment.createdAt = moment(comment.createdAt)
          .format("YYYY-MM-DD HH:mm:ss");
        comment.replyComments.forEach(reply => {
          reply.createdAt = moment(reply.createdAt)
            .format("YYYY-MM-DD HH:mm:ss");
        })
      })

      return{
        blogHtml,
        blog:data.blog,
        comments:data.comments
      }
    }
    else{
      error({ statusCode: 404, message: 'Post not found' })
    }
  },
  computed:{
    ...mapState(['email','nickName','cid'])
  },
  data(){
    return{
      commentContent:'',
      userInfo:{
        email:'',
        nickName:''
      },
      alert:{
        message:'',
        isDanger: false
      },

      deleteCommentInfo:{
        id:'',
        email:''
      }
    }
  },
  mounted() {
    this.userInfo = {
      email: this.email ? this.email : '',
      nickName: this.nickName ? this.nickName : ''
    }
  },
  methods:{
    // 评论
    async comment(){
      const method = apiList.blog.comment.create.method;
      let url = apiList.blog.comment.create.url;
      const {data} = await this.$axios[method](url,{
        "blogId":this.blog._id,
        "content":this.commentContent,
        "nickName":this.userInfo.nickName,
        "email":this.userInfo.email,
        "cid":this.cid
      });
      if(data.success){
        console.log('评论成功');
        this.commentContent = '';
        this.toggleAlert('评论成功',false)
        this.getComment();
      }else {
        console.log(data.message);
        this.toggleAlert('评论失败',false)
      }
    },

    // 获取评论列表
    async getComment(){
      const method = apiList.blog.comment.list.method;
      let url = apiList.blog.comment.list.url.replace("{id}",this.blog._id);
      const {data} = await this.$axios[method](url);
      if(data.success){
        // 评论时间格式化
        data.comments.forEach(comment => {
          comment.createdAt = moment(comment.createdAt)
            .format("YYYY-MM-DD HH:mm:ss");
          comment.replyComments.forEach(reply => {
            reply.createdAt = moment(reply.createdAt)
              .format("YYYY-MM-DD HH:mm:ss");
          })
        })

        this.comments = data.comments;
      }
    },

    // 打开评论弹窗
    toggleCommentModal(){
      if(!this.commentContent){
        this.toggleAlert('请输入评论内容',true)
        return ;
      }
      this.$refs.commentModal.toggleModal();
    },

    // 更新用户信息
    commitUserInfo(){
      const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;

      if(!this.userInfo.email && !this.userInfo.nickName){
        this.toggleAlert('请完整填写昵称和邮箱',true)
      }else if (!reg.test(this.userInfo.email)){
        this.toggleAlert('请输入正确的邮箱',true)
      }else {
        this.$refs.commentModal.toggleModal();
        this.$store.commit('setUserInfo',this.userInfo);
        this.comment();
      }
    },

    // 打开删除评论弹窗
    toggleDeleteCommentModal(id){
      this.deleteCommentInfo.id = id;
      // 先用本地存储的用户信息尝试删除
      if(this.email || this.cid){
        const query = qs.stringify({
          email:this.email || '',
          cid: this.cid || ''
        })
        this.deleteComment(id,query,false);
      }else {
        this.$refs.deleteCommentModal.toggleModal();
      }
    },

    checkDeleteCommentInfo(){
      const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;

      if(!this.deleteCommentInfo.email){
        this.toggleAlert('请填写评论时留下的邮箱',true)
      }else if (!reg.test(this.deleteCommentInfo.email)){
        this.toggleAlert('请输入正确的邮箱',true)
      }else {
        this.$refs.deleteCommentModal.toggleModal();
        const query = qs.stringify({
          email:this.deleteCommentInfo.email,
        })
        this.deleteComment(this.deleteCommentInfo.id, query,true);
      }
    },

    // 删除评论
    async deleteComment(id,query,isToggleModal){
      const method = apiList.blog.comment.delete.method;

      let url = apiList.blog.comment.delete.url
        .replace("{id}",id) + `?${query}`;
      const {data} = await this.$axios[method](url);
      if(data.success){
        this.toggleAlert('删除成功');
        this.deleteCommentInfo.email = '';
        this.getComment();
      }else {
        if(!isToggleModal){
          this.$refs.deleteCommentModal.toggleModal();
        }else {
          this.toggleAlert('删除失败',true);
          this.deleteCommentInfo.email = '';
        }
      }
    },

    // 点赞
    async likes(){
      if(!this.cid){
        this.$store.commit('getCid');
      }

      if(this.blog.likes.includes(this.cid)){
        this.toggleAlert('你已经点赞过啦，感谢！');
      }else {
        const method = apiList.blog.like.method;

        let url = apiList.blog.like.url
          .replace("{id}",this.blog._id);
        const {data} = await this.$axios[method](url,{
          cid:this.cid
        });
        if (data.success){
          this.toggleAlert('感谢你的点赞！');
          this.blog.likes.push(this.cid);
        }else {
          this.toggleAlert(data.message,true)
        }
      }
    },

    // 搜索标签相应的博客
    tagBlogList(tag){
      this.$router.push({
        path:'/blog',
        query:{keyword:tag}
      })
    },

    // 提醒窗口
    toggleAlert(message,isDanger=false){
      this.alert.message = message;
      this.alert.isDanger = isDanger;
      this.$refs.alert.isShow = true;
    }
  }
}
