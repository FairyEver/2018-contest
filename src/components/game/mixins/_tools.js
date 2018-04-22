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
    // [障碍物检查] 自动判断横竖
    unobstructed (fromRow, fromCol, toRow, toCol) {
      const unobstructedRow = (row, col, _col) => {
        // 检验大小
        const min = col < _col ? col : _col
        const max = col < _col ? _col : col
        for (let __col = min + 1; __col < max; __col++) {
          if (this.cellsGrid[row][__col] !== 0) {
            return false
          }
        }
        return true
      }
      const unobstructedCol = (col, row, _row) => {
        // 检验大小
        const min = row < _row ? row : _row
        const max = row < _row ? _row : row
        for (let __row = min + 1; __row < max; __row++) {
          if (this.cellsGrid[__row][col] !== 0) {
            return false
          }
        }
        return true
      }
      return fromRow === toRow ? unobstructedRow(fromRow, fromCol, toCol) : unobstructedCol(fromCol, fromRow, toRow)
    }
  }
}
