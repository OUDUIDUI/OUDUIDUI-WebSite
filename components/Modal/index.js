export default {
    name: 'Modal',
    data() {
        return {
            isActive: false
        }
    },
    methods: {
        toggleModal() {
            console.log(this.isActive)
            this.isActive = !this.isActive
        }
    }
}
