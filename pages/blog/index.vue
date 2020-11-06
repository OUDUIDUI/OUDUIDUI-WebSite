<template>
  <div class="container">
    <!--   导航   -->
    <BlogNav />

    <!--   博客   -->
    <div>
      <BlogList :blog-list="blogs" />
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style src="./index.css" scoped></style>
