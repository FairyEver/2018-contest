import _clonedeep from 'lodash.clonedeep'

export default {
  methods: {
    // [调试] 打印一个黑色的块 主要是用来显示进行了哪种操作
    printKey (text) {
      console.log(`%c${text}`, 'font-size: 20px; font-weight: bold; padding: 10px; background-color: #333; border-radius: 4px; color: #FFF;')
    },
    __printCell (cell, title) {
      console.group(`cell [${title}]`)
      console.table([_clonedeep(cell)])
      const el = this.$refs[`game-cell-${cell.id}`]
      if (el) {
        console.log('the cell in document is :')
        console.log(el[0])
      }
      console.groupEnd()
    },
    // [调试] 打印 cells
    __printCells (title = '现在') {
      console.group(`cells [${title}]`)
      console.table(this.cells.map(e => ({
        position: e.position,
        id: e.id,
        level: e.level
      })))
      console.groupEnd()
    },
    // [调试] 打印 cellsGrid
    __printCellsGrid (title = '现在') {
      console.group(`cellsGrid [${title}]`)
      // TODO 这里有问题 cellsGrid 没有及时更新
      console.log('|', Array(this.cellNum).fill('-').join('-----'), '|')
      this.cellsGrid.forEach(row => {
        console.log('|', row.map(e => e.level ? e.level : e).join('     '), '|')
        console.log('|', Array(this.cellNum).fill('-').join('-----'), '|')
      })
      console.groupEnd()
    }
  }
}
