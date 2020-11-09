<template>
  <div class="container">
    <!--   导航   -->
    <BlogNav @search="search"
             @checkoutNav="checkoutNav"
             @closeSearch="initList"
             ref="blogNav"
             :navs="navs" :need-search="true" />

    <!--   博客列表   -->
    <div v-if="showNavIndex === 0">
      <BlogList :blog-list="blogs" />
    </div>

    <div v-if="showNavIndex === 1" class="category">
      <blog-category :category="ITCategory.category" />
    </div>

    <div v-if="showNavIndex === 2" class="category">
      <blog-category :category="UICategory.category" />
    </div>

    <div class="tips" v-if="tip">{{tip}}</div>

    <!--   页码   -->
    <Pagination
      @togglePage="togglePage"
      :pagination="pagination" v-if="pagination.pages > 1"  />
  </div>
</template>

<script src="./index.js"></script>

<style src="./index.css" scoped></style>
