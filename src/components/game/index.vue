<template>
  <div class="game theme-default">
    <div class="title">
      <div class="col logo">2048</div>
      <div class="col btn-group">
        <div class="text">1234</div>
        <div class="btn">OPTIONS</div>
      </div>
      <div class="col btn-group">
        <div class="text">2345</div>
        <div class="btn">RESET</div>
      </div>
    </div>
    <div class="main">
      <div class="board" ref="board" :style="boardStyle">
        board
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      boardWidth: 0
    }
  },
  mounted () {
    this.boardWidth = this.$refs.board.offsetWidth
  },
  computed: {
    // 棋盘样式
    boardStyle () {
      return {
        height: `${this.boardWidth}px`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './theme/default.scss';
</style>
