<template>
    <div class="box-border item user-select-none" @click="toResource">
        <!--   博客title   -->
        <div class="title">{{ resource.title }}</div>
        <!--   博客author  -->
        <div class="description">{{ resource.description }}</div>
    </div>
</template>

<script src="./index.js"></script>

<style src="./index.css" scoped></style>
