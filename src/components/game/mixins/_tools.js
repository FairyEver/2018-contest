export default {
  methods: {
    // [坐标形式转换] 将位置id转换为xy
    // 位置数据从1开始 左上角是 1
    // xy都是从0开始 左上角是[0,0]
    n2xy (n) {
      return {
        x: parseInt((n - 1) / this.cellNum),
        y: (n - 1) % this.cellNum
      }
    },
    // [坐标形式转换] 将xy转换为位置id
    // 位置数据从1开始 左上角是 1
    // xy都是从0开始 左上角是[0,0]
    xy2n (x, y) {
      return this.cellNum * x + y + 1
    },
    // [障碍物检查] 横向
    unobstructedRow (row, col, _col) {
      for (let __col = _col + 1; __col < col; __col++) {
        if (this.cellsGrid[row][__col] !== 0) {
          return false
        }
      }
      return true
    }
  }
}
