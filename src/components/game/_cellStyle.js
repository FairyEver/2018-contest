export default {
  methods: {
    // [背景层cell] 输入 x和y 返回这个位置的样式
    bgCellStyle ({x, y}) {
      return this.xy2style(x, y)
    },
    // [游戏层cell] 输入 x和y 返回这个位置的样式
    cellStyle ({x, y}, level) {
      return {
        ...this.xy2style(x, y),
        backgroundColor: this.levelSetting[level - 1].bg
      }
    },
    // [背景层cell] 为 bgCellStyle 和 cellStyle 提供基础样式，根据传入的行列数据返回位置数据
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
