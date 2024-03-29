export default {
  computed: {
    connected () {
      return this.$store.state.connected
    },
    currentUser () {
      return this.$store.state.user
    },
    loadingUser () {
      return this.currentUser === null
    }
  }
}
