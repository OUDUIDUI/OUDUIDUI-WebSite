<template>
    <div>
        <!--  瀑布流  -->
        <div class="wf-list">
            <!--  left   -->
            <div class="left">
                <BlogItem
                    v-for="blog in leftList"
                    :key="blog._id" ref="left" :blog="blog"
                    class="blog" />
            </div>

            <!--  right   -->
            <div class="right" ref="right">
                <BlogItem
                    v-for="blog in rightList"
                    :key="blog._id" ref="right" :blog="blog"
                    class="blog" />
            </div>
        </div>

        <div class="list">
            <BlogItem
                v-for="blog in blogList"
                :key="blog._id" :blog="blog"
                class="blog" />
        </div>
    </div>
</template>

<script src="./index.js"></script>

<style src="./index.css" scoped></style>
