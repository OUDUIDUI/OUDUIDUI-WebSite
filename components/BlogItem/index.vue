<template>
  <div class="box-border item">
    <div class="header d-flex align-items-center">
      <div class="updated-time">{{updatedAt}}</div>
      <div class="info d-flex align-items-center">
        <div class="d-flex align-items-center">
          <img src="~/static/icon/blog/like.svg" alt="likes">
          <div>{{blog.likes}}</div>
        </div>
        <div class="d-flex align-items-center">
          <img src="~/static/icon/blog/eye.svg" alt="reading">
          <div>{{blog.reading}}</div>
        </div>
      </div>
    </div>
    <div class="title">{{blog.title}}</div>
    <div class="author">{{blog.author}}</div>
  </div>
</template>

<script src="./index.js"></script>

<style src="./index.css" scoped></style>
