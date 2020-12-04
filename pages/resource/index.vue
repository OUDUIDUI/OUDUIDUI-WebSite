<template>
    <div class="container user-select-none">
       <nav class="d-flex justify-content-end">
           <!--  search  -->
           <div class="search justify-content-end align-items-center"
                :class="isOpenSearch ? 'active' : ''">
               <img src="~/static/icon/blog/search.svg"
                    alt="search" @click="searchAnimation(true)">
               <input type="text" v-if="isOpenSearch"
                      placeholder="Search..." v-model="searchContent"
                      @keyup.enter="search" />
               <img src="~/static/icon/blog/x.svg"
                    @click="searchAnimation(false)"
                    alt="close"
                    v-if="isOpenSearch">
           </div>
       </nav>

        <!--  List  -->
        <WFList :list="resources" :type="1" />

        <div class="tips" v-if="tip">{{ tip }}</div>
    </div>
</template>

<script src="./index.js" />

<style src="./index.css" scoped />

