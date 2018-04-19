import _remove from 'lodash.remove'
import _difference from 'lodash.difference'
import _random from 'lodash.random'

export default {
  methods: {
    // 生成一个方块 生成的方块暂时只能是2 (等级是1)
    newCell (index) {
      console.group('newCell')
      const useful = _difference([...Array(Math.pow(this.cellNum, 2))].map((e, i) => i + 1), this.cells.map(e => e.cell))
      const cell = {
        cell: index || useful[_random(useful.length - 1)], // 位置
        id: this.cellCount++, // 唯一ID
        level: 1 // 等级
      }
      this.cells.push(cell)
      this.logCell(cell, 'add a new cell')
      this.logCellGrid()
      console.groupEnd()
    },
    // 移动一个 cell
    moveCell (row, col, _row, _col) {
      console.group('moveCell 移动 cell')
      const cell = this.xy2cell(row, col)
      const to = this.xy2cell(_row, _col)
      console.log(`要把位置为[${row},${col}]处的 cell 移动到[${_row},${_col}]`)
      console.log('另一种表示为')
      console.log(`要把位置为 ${cell} 处的 cell 移动到 ${to}`)
      const index = this.cells.findIndex(e => e.cell === cell)
      console.log(`${cell} 处的 cell 在 cells 中找到了 index = ${index}`)
      if (index >= 0) {
        this.cells[index].cell = to
        this.logCell(this.cells[index], `移动完成 现在 ${col} 处的 cell 为`)
      }
      this.logCellGrid()
      console.groupEnd()
    },
    // 给一个 cell level + 1
    sumCell (row, col) {
      console.group('sumCell 升级 cell')
      const cell = this.xy2cell(row, col)
      const index = this.cells.findIndex(e => e.cell === cell)
      if (index >= 0) {
        this.cells[index].level += 1
        console.log(`现在[${row},${col}]位置的 cell 级别为 ${this.cells[index].level}`)
      }
      this.logCellGrid()
      console.groupEnd()
    },
    // 移除一个 cell
    removeCell (row, col) {
      console.group('removeCell 删除一个 cell')
      const cell = this.xy2cell(row, col)
      _remove(this.cells, e => e.cell === cell)
      console.log(`已经删除在[${row},${col}]位置的 cell`)
      this.logCellGrid()
      console.groupEnd()
    }
  }
}
