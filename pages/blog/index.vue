<template>
    <div class="container">
        <!--   导航   -->
        <PageNav @search="search"
                 @checkoutNav="checkoutNav"
                 @closeSearch="checkoutNav(0)"
                 ref="blogNav"
                 :navs="navs" :need-search="true" />

        <!--   博客列表   -->
        <div v-if="showNavIndex === 0">
            <WFList :list="blogs" :type="0" />
        </div>

        <div v-if="showNavIndex === 1" class="category">
            <blog-category :category="category.category" />
        </div>

        <div class="tips" v-if="tip">{{ tip }}</div>

        <!--   页码   -->
        <Pagination
            @togglePage="togglePage"
            :pagination="pagination" v-if="pagination.pages > 1" />
    </div>
</template>

<script src="./index.js" />

<style src="./index.css" scoped />
