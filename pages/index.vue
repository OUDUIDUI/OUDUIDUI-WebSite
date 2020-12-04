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

<script>
export default {
    name: 'index',
    data() {
        return {
            intro:
                `<code>
    I am a Frontend Developer.
</code>`

        }
    }
}

</script>

<style scoped>
.photo {
    transform: translateX(-80px);
}

.photo img {
    width: 30vw;
    height: 35.12vw;
}

.box-border {
    border: 2px solid var(--color-white);
}

.photo .summary {
    bottom: 0;
    right: -160px;
    background: var(--color-bg);
    padding: 20px 30px;
}

.photo .summary pre {
    color: var(--color-white);
    margin: 0 !important;
    font-size: 1vw;
}

.intro {
    margin-top: 80px;
}

.intro p {
    color: var(--color-white);
    letter-spacing: 3px;
    margin-left: 3px;

    font-size: 16px;
    font-weight: 300;
    text-align: center;
}

@media screen and (max-width: 992px) {
    .photo {
        transform: translateX(-60px);
    }

    .photo .summary {
        bottom: 0;
        right: -120px;
    }

    .intro p {
        font-size: 12px;
    }
}

@media screen and (max-width: 768px) {
    .photo img {
        width: 40vw;
        height: 46.82vw;
    }
}

@media screen and (max-width: 576px) {
    .photo img {
        width: 60vw;
        height: 70.22vw;
    }

    .photo {
        transform: translateX(-50px);
    }

    .photo .summary pre {
        font-size: 10px;
    }

    .photo .summary {
        bottom: 0;
        right: -100px;
        padding: 10px;
    }

    .intro p {
        letter-spacing: 0;
        margin-left: 0;
        font-size: 12px;
    }
}

</style>
