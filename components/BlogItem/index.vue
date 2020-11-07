<template>
  <div class="box-border item user-select-none">
    <div class="header d-flex align-items-center">
      <!--   更新时间   -->
      <div class="updated-time user-select-none">{{updatedAt}}</div>
      <div class="info d-flex align-items-center">
        <!--   点赞人数   -->
        <div class="d-flex align-items-center">
          <img src="~/static/icon/blog/like.svg" alt="likes">
          <div>{{blog.likes}}</div>
        </div>
        <!--   阅读人数   -->
        <div class="d-flex align-items-center">
          <img src="~/static/icon/blog/eye.svg" alt="reading">
          <div>{{blog.reading}}</div>
        </div>
      </div>
    </div>
    <!--   博客title   -->
    <div class="title">{{blog.title}}</div>
    <!--   博客标签   -->
    <div class="d-flex">
      <div v-for="(tag,index) in blog.tag" :key="index" class="tag">
        {{tag}}
      </div>
    </div>
    <!--   博客author  -->
    <div class="author">{{blog.author}}</div>
  </div>
</template>

<script src="./index.js"></script>

<style src="./index.css" scoped></style>
