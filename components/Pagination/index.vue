<template>
  <div>
    <div class="d-flex align-items-center justify-content-center user-select-none">
      <img @click="prevPage"
           src="~/static/icon/blog/left.svg" alt="left" class="left-icon">

      <div :class="{'text-red':currentPage === 1}" class="num"
           @click="togglePage(1)">
        1
      </div>

      <div v-show="currentPage > 5 && pagination.pages > 10"
           class="ellipsis">
        …
      </div>

      <div :class="{'text-red':currentPage === index  + offset}" class="num"
           @click="togglePage(index  + offset)"
           v-for="(item,index) in middlePages" :key="index">
        {{index  + offset}}
      </div>

      <div v-show="currentPage < bigLimit && pagination.pages > 10"
           class="ellipsis">
        …
      </div>

      <div :class="{'text-red':currentPage === pagination.pages}" class="num"
           @click="togglePage(pagination.pages)">
        {{pagination.pages}}
      </div>

      <img @click="nextPage"
           src="~/static/icon/blog/left.svg" alt="right" class="right-icon">
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style src="./index.css" scoped></style>
