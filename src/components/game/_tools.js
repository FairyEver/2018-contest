import _clonedeep from 'lodash.clonedeep'

export default {
  methods: {
    // [障碍物检查] 横向
    unobstructedRow (row, col, _col) {
      for (let __col = _col + 1; __col < col; __col++) {
        if (this.cellsGrid[row][__col] !== 0) {
          return false
        }
      }
      return true
    },
    // [障碍物检查] 纵向
    unobstructedCol () {
      return true
    },
    // 将 roundChanged 清空
    resetRoundChanged () {
      const row = Array(this.cellNum).fill(0)
      this.roundChanged = [...Array(this.cellNum)].map(e => _clonedeep(row))
    }
  }
}
