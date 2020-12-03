<template>
    <div class="container">
        <h3 style="font-weight: 100;text-align: center;">
            404 Page Not Found
        </h3>
        <h4 style="font-weight: 100;text-align: center">
            找不到相应页
        </h4>

    </div>
</template>

<script>
export default {
    props: ['error']
}
</script>

<style scoped>
h3, h4 {
    color: var(--color-white) !important;
}
</style>
