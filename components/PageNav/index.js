export default {
    name: 'PageNav',
    props: {
        navs: {
            type: Array,
            required: true
        },
        needSearch: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            activeIndex: 0,
            isOpenNav: false,

            searchContent: '',
            isOpenSearch: false,

            isSearch: false
        }
    },
    methods: {
        searchAnimation(isOpenSearch) {
            this.isOpenSearch = isOpenSearch
            if (this.isSearch && this.searchContent) {
                this.isSearch = false
                this.$emit('closeSearch')
            }

            if (!isOpenSearch) {
                this.searchContent = ''
            }
        },

        navAnimation() {
            this.isOpenNav = !this.isOpenNav
        },

        checkoutNav(i) {
            if (this.activeIndex !== i) {
                this.activeIndex = i
                this.isOpenNav = false
                this.$emit('checkoutNav', i);
                this.searchAnimation(false);
            }
        },

        search() {
            this.isSearch = true
            this.$emit('search', this.searchContent)
        }
    }
}
