<template>
    <div class="container">
        <!--  Title  -->
        <h1 class="title user-select-none">{{ blog.title }}</h1>
        <!--  Author  -->
        <div class="author user-select-none">{{ blog.author }}</div>
        <!--  Tag  -->
        <div class="d-flex justify-content-center user-select-none"
             v-if="blog.tag.length">
            <div>
                <div v-for="(tag,index) in blog.tag" :key="index" class="tag"
                     @click="tagBlogList(tag)">
                    {{ tag }}
                </div>
            </div>
        </div>

        <!--  Content  -->
        <div v-html="blogHtml" class="content markdown"></div>

        <!--  Info  -->
        <div class="d-flex align-items-center user-select-none justify-content-end">
            <div class="reading d-flex align-items-center">
                <img src="~/static/icon/blog/eye.svg" alt="reading">
                <div>{{ blog.reading }}</div>
            </div>
            <div class="likes d-flex align-items-center"
                 @click="likes">
                <img src="~/static/icon/blog/like.svg" alt="likes">
                <div>{{ blog.likes.length }}</div>
            </div>
        </div>

        <!--  Comment  -->
        <div class="comments user-select-none">
            <div class="comment-area d-flex">
        <textarea name="comments" placeholder="说点什么叭……"
                  v-model="commentContent"
                  rows="3" autocomplete="off" />
                <button @click="toggleCommentModal">评论</button>
            </div>

            <!--  Comments List  -->
            <div class="comment-list">
                <div v-for="comment in comments" :key="comment._id" class="comment-item">
                    <div class="comment-main">
                        <div class="comment-name">{{ comment.nickName }}：</div>
                        <div class="comment-content">{{ comment.content }}</div>
                        <div class="d-flex justify-content-between">
                            <div class="comment-btn"
                                 @click="toggleDeleteCommentModal(comment._id)">
                                删除
                            </div>
                            <div class="comment-createdAt">{{ comment.createdAt }}</div>
                        </div>
                    </div>
                    <div v-for="reply in comment.replyComments" :key="reply._id"
                         class="reply">
                        <div class="reply-name">{{ reply.nickName }}回复{{ comment.nickName }}：</div>
                        <div class="reply-content">{{ reply.content }}</div>
                        <div class="reply-createdAt">{{ reply.createdAt }}</div>
                    </div>
                </div>
            </div>
        </div>

        <Modal ref="commentModal">
            <div class="check-userinfo">
                <div class="modal-title">个人信息</div>
                <input class="modal-input" type="text"
                       v-model="userInfo.nickName" placeholder="请输入你的昵称">
                <input class="modal-input" type="email"
                       v-model="userInfo.email" placeholder="请输入你的邮箱">
                <button class="modal-btn" @click="commitUserInfo">提交</button>
            </div>
        </Modal>

        <Modal ref="deleteCommentModal">
            <div class="check-userinfo">
                <div class="modal-title">个人信息</div>
                <input class="modal-input" type="email"
                       v-model="deleteCommentInfo.email" placeholder="请输入你评论时留下的邮箱">
                <button class="modal-btn" @click="checkDeleteCommentInfo">提交</button>
            </div>
        </Modal>

        <Alert :message="alert.message" :is-danger="alert.isDanger" ref="alert" />
    </div>
</template>

<script src="./index.js" />

<style src="./index.css" scoped />

