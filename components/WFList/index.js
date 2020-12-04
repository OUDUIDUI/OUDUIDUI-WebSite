import BlogItem from '../BlogItem/index.vue'
import ResourceItem from "../ResourceItem/index.vue"

export default {
    name: 'index',
    components: {
        BlogItem,ResourceItem
    },
    props: {
        list: {
            type: Array,
            required: true
        },
        type: {
            type: Number,
            default: 0   // 0 -> Blog  1 -> Resource
        }
    },
    data() {
        return {
            leftList: [],
            rightList: [],
            heights: []
        }
    },
    mounted() {
        this.initList()
    },
    watch: {
        list() {
            this.leftList = []
            this.rightList = []
            this.heights = []
            this.initList()
        }
    },
    methods: {
        initList() {
            for (let item of this.list) {
                this.waterfall(item)
            }
        },

        // 瀑布流布局
        async waterfall(item) {
            if (!this.leftList.length) {
                this.leftList.push(item)
                return
            }

            if (!this.rightList.length) {
                this.rightList.push(item)
                return
            }

            const isLeft = await this.getHeight()

            if (isLeft) {
                this.leftList.push(item)
            } else {
                this.rightList.push(item)
            }
        },

        // 获取高度
        async getHeight() {
            const heights = [0, 0]

            return new Promise(resolve => {
                setTimeout(() => {
                    this.$refs.left.forEach(el => {
                        heights[0] += el.$el.offsetHeight
                    })
                    this.$refs.right.forEach(el => {
                        heights[1] += el.$el.offsetHeight
                    })
                    resolve(heights[0] <= heights[1])
                }, 50)
            })
        }
    }
}
