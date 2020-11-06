<template>
  <div class="container">
    <!--   导航   -->
    <BlogNav />

    <!--   博客列表   -->
    <div>
      <BlogList :blog-list="blogs" />
    </div>

    <!--   页码   -->
    <Pagination
      @togglePage="togglePage"
      :pagination="pagination" v-if="pagination.pages > 1"  />
  </div>
</template>

<script src="./index.js"></script>

<style src="./index.css" scoped></style>
