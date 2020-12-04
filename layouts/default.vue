<template>
    <div class="d-flex flex-column justify-content-between min-vh-100 app">
        <div class="d-flex page">
            <Header />
            <Nav />
        </div>
        <Nuxt class="nuxt" />
        <Footer />
    </div>
</template>

<script>
import Header from '~/components/Header/index.vue'
import Nav from '~/components/Nav/index.vue'
import Footer from '~/components/Footer/index.vue'
import { mapState } from 'vuex'

export default {
    name: 'default',
    components: {
        Header,
        Nav,
        Footer
    },
    computed: {
        ...mapState(['cid'])
    },
    mounted() {
        // 生成cid
        if (!this.cid) {
            this.$store.commit('getCid')
        }
    }
}

</script>

<style>
:root {
    --color-bg: #212529;
    --color-white: #fff;
    --color-black: #333;
    --color-red: #F05454;
    --color-shadow: 0 0 6px rgba(255, 255, 255, .5);
}

html {
    font-family: 'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
}

*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
}

p {
    margin: 0;
    padding: 0;
}

img {
    display: block;
}

a, a:link, a:visited, a:hover, a:active {
    text-decoration: none;
    color: inherit;
}

input:focus, button:focus,button:active {
    outline: none;
}

.app {
    background: var(--color-bg);
}

.nuxt {
    flex: 1;
    padding-top: 80px;
    padding-bottom: 100px;
}

.page {
    flex-direction: column;
}

@media screen and (max-width: 576px) {
    .page {
        flex-direction: column-reverse;
    }

    .nuxt {
        flex: 1;
        padding-top: 40px;
        padding-bottom: 60px;
    }
}

/* 公有样式 */
.text-red {
    color: var(--color-red) !important;
}

.box-border {
    border: 1px solid var(--color-white) !important;
}

@font-face {
    font-family: 'oppoSan-L';
    src: url('~static/font/OPPOSans-L-2.ttf');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'oppoSan-B';
    src: url('~static/font/OPPOSans-B-2.ttf');
    font-weight: normal;
    font-style: normal;
}

</style>
