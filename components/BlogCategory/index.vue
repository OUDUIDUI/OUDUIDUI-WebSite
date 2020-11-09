<template>
  <div class="user-select-none">
    <div v-for="(node,i) in category" :key="node._id">
      <div class="node d-flex align-items-center"
           v-if="node.level === 'group'"
           @click="downList(node)">
        <img src="~/static/icon/blog/left.svg" v-if="node.isDown"
             alt="down" class="down-icon">
        <img src="~/static/icon/blog/left.svg" v-if="!node.isDown"
             alt="right" class="right-icon">
        <p>{{node.title}}</p>
      </div>

      <BlogCategory :category="node.children" class="children"
                    v-if="node.isDown && node.children && node.children.length" />

      <div class="node d-flex align-items-end justify-content-between article"
           @click="toBlogDetail(node.blogId)"
           v-if="node.level === 'article'">
        <p class="title">{{node.title}}</p>
        <p class="updated-time">{{node.updatedAt}}</p>
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style src="./index.css" scoped></style>
