export default {
  methods: {
    // 输入 index 输出 这个index对应的x和y
    cell2xy (index) {
      return {
        // 行
        x: parseInt((index - 1) / this.cellNum),
        // 列
        y: (index - 1) % this.cellNum
      }
    },
    // 输入 x和y 输出 对应的index
    xy2cell (x, y) {
      return this.cellNum * x + y + 1
    }
  }
}
