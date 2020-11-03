<template>
  <nav class="d-flex justify-content-between">
    <!--  navs PC   -->
    <div class="navs-pc">
      <div v-for="(nav,i) in navs" :key="i" @click="checkoutNav(nav.id)"
           :class="activeIndex === i ? 'text-red' : ''">
        {{nav.label}}
      </div>
    </div>

    <!--  navs MB   -->
    <div class="navs-mb">
      <div class="d-flex justify-content-between align-items-center"
           :class="isOpenNav ? 'active' : ''"
           @click="navAnimation()">
        <p :class="isOpenNav ? 'text-red' : ''">
          {{navs[activeIndex].label}}
        </p>
        <img src="~/static/image/blog/left.svg"
             alt="down" class="down-icon">
      </div>
      <div class="dropdown-box" v-if="isOpenNav">
        <div v-for="(nav,i) in navs" :key="i" v-if="i !== activeIndex"
             @click="checkoutNav(nav.id)">
          {{nav.label}}
        </div>
      </div>

    </div>

    <!--  search  -->
    <div class="search align-items-center"
         :class="isOpenSearch ? 'active' : ''">
      <img src="~/static/image/blog/search.svg"
           alt="search" @click="searchAnimation(true)">
      <input type="text" v-if="isOpenSearch"
             placeholder="Search..." v-model="searchContent" />
      <img src="~/static/image/blog/x.svg"
           @click="searchAnimation(false)"
           alt="close"
           v-if="isOpenSearch">
    </div>
  </nav>
</template>

<script src="./BlogNav.js"></script>

<style src="./BlogNav.css" scoped></style>
