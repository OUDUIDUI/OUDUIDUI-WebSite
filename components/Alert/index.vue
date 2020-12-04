<template>
    <div class="alert-main"
         v-if="isShow"
         :class="{'danger':isDanger}">
        {{ message }}
    </div>
</template>

<script>
export default {
    name: 'Alert',
    props: {
        message: {
            type: String,
            required: true
        },
        isDanger: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isShow: false
        }
    },
    watch: {
        isShow() {
            if (this.isShow) {
                setTimeout(() => {
                    this.isShow = false
                }, 1500)
            }
        }
    }
}
</script>

<style scoped>
.alert-main {
    min-width: 280px;
    max-width: 90%;
    background: var(--color-bg);
    border: 1px solid var(--color-white);
    position: fixed;
    top: 20px;
    padding: 15px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 16px;
    text-align: center;
    box-shadow: var(--color-shadow);
    z-index: 9999;
    color: var(--color-white);
}

.alert-main.danger {
    color: var(--color-bg);
    background: var(--color-white);
}

@media screen and (max-width: 576px) {
    .alert-main {
        font-size: 12px;
        padding: 10px;
    }
}
</style>
