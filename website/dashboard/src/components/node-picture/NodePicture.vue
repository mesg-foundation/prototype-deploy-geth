<script>
  export default {
    props: {
      node: {
        type: Object,
        default: {}
      }
    },
    computed: {
      src () {
        return require('@/assets/ethereum.png')
      }
    },
    render (createElement) {
      return createElement('img', {
        style: this.style,
        attrs: {
          src: this.src
        }
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../variables'

  img {
    height: 1.5em;
    width: 1.5em;
    border-radius: 50%;
    float: left;
    margin-right: 1em;
  }
</style>

