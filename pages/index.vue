<template>
    <div
        class="container d-flex flex-column
    justify-content-center align-items-center">

        <!--  照片  -->
        <div class="photo position-relative">
            <img class="box-border" src="~/static/image/me/me.jpg" alt="OUDUIDUI">
            <div class="position-absolute box-border summary">
                <pre>{{ intro }}</pre>
            </div>
        </div>

        <!--  简介  -->
        <div class="intro">
            <p>射手座 / 悲观的乐观主义者</p>
            <p>汕头人，现居广州。大学毕业跨专业求职，现任前端工程师</p>
            <br>
            <p>自学过设计，专注过剪辑，现就业于前端工作</p>
            <p>万变不离其宗，只为享受于钻研更完美的视觉交互作品</p>
            <p>一个作品的实现，有时候会比它所带来的收益会更让我兴奋</p>
            <br>
            <p>喜欢孤独，享受心无旁骛的时光</p>
            <p>渴望能更纯粹地沉迷在自己喜欢的事情之中</p>
        </div>
    </div>
</template>

<script src="./index.js"></script>

<style src="./index.css" scoped></style>
