<template>
    <div>
        <!--  瀑布流  -->
        <div class="wf-list">
            <!--  left   -->
            <div class="left">
                <div v-if="type === 0">
                    <BlogItem
                        v-for="blog in leftList"
                        :key="blog._id" ref="left" :blog="blog"
                        class="item" />
                </div>
                <div v-if="type === 1">
                    <ResourceItem v-for="resource in leftList"
                                  :key="resource._id" ref="left"
                                  :resource="resource"
                                  class="item"  />
                </div>
            </div>

            <!--  right   -->
            <div class="right" ref="right">
                <div v-if="type === 0">
                    <BlogItem
                        v-for="blog in rightList"
                        :key="blog._id" ref="right" :blog="blog"
                        class="item" />
                </div>
                <div v-if="type === 1">
                    <ResourceItem v-for="resource in rightList"
                                  :key="resource._id" ref="right"
                                  :resource="resource"
                                  class="item" />
                </div>
            </div>
        </div>

        <div class="list">
            <div v-if="type === 0">
                <BlogItem
                    v-for="blog in list"
                    :key="blog._id" :blog="blog"
                    class="item" />
            </div>
            <div v-if="type === 1">
                <ResourceItem v-for="resource in list"
                              :key="resource._id" ref="left"
                              :resource="resource"
                              class="item" />
            </div>
        </div>
    </div>
</template>

<script src="./index.js"></script>

<style src="./index.css" scoped></style>
