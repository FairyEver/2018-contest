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
        <!-- 背景层 -->
        <div class="layer bg">
          <div
            class="cell"
            v-for="item in Math.pow(currentCellNum, 2)"
            :key="item"
            :style="cellStyle(cellRowCol(item))">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 几乘几的格子
    cellNum: {
      type: Number,
      required: false,
      default: 4
    },
    // 格子之间的间距
    cellMargin: {
      type: Number,
      required: false,
      default: 10
    }
  },
  data () {
    return {
      // [从参数获得] 几乘几的格子
      currentCellNum: 0,
      // [从参数获得] 格子间距
      currentCellMargin: 0,
      // [计算获得] 格子尺寸
      cellWidth: 0,
      // [mounted后取值] 棋盘尺寸
      boardWidth: 0
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    // 棋盘样式
    boardStyle () {
      return {
        height: `${this.boardWidth}px`
      }
    }
  },
  methods: {
    // 初始化
    init () {
      // 获取用户设置
      this.currentCellNum = this.cellNum
      this.currentCellMargin = this.cellMargin
      // 获取尺寸
      this.boardWidth = this.$refs.board.offsetWidth
      // 计算尺寸
      this.cellWidth = (this.boardWidth - this.currentCellMargin * (this.currentCellNum + 1)) / this.currentCellNum
    },
    // 输入 index 输出 这个index对应的x和y
    cellRowCol (index) {
      return {
        x: parseInt((index - 1) / this.currentCellNum),
        y: (index - 1) % this.currentCellNum
      }
    },
    // 输入 x和y 返回这个位置的样式
    cellStyle ({x, y}) {
      return {
        width: `${this.cellWidth}px`,
        height: `${this.cellWidth}px`,
        left: `${this.currentCellMargin + x * (this.cellWidth + this.currentCellMargin)}px`,
        top: `${this.currentCellMargin + y * (this.cellWidth + this.currentCellMargin)}px`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './theme/default.scss';
</style>
