export default {
  computed: {
    // 棋盘样式
    boardStyle () {
      return {
        height: `${this.boardWidth}px`
      }
    }
  },
  methods: {
    styleCellInBgLayer ({x, y}) {
      return this.xy2style(x, y)
    },
    styleCellInGameLayer ({x, y}, level) {
      return {
        ...this.xy2style(x, y),
        backgroundColor: this.levelSetting[level - 1].bg
      }
    },
    // 根据传入的行列数据返回位置数据
    xy2style (x, y) {
      return {
        width: `${this.cellWidth}px`,
        height: `${this.cellWidth}px`,
        left: `${this.cellMargin + y * (this.cellWidth + this.cellMargin)}px`,
        top: `${this.cellMargin + x * (this.cellWidth + this.cellMargin)}px`
      }
    }
  }
}
