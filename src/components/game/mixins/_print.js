// import _clonedeep from 'lodash.clonedeep'

export default {
  methods: {
    // [调试] 打印一个黑色的块 主要是用来显示进行了哪种操作
    logKey (text) {
      console.log(`%c${text}`, 'font-size: 20px; font-weight: bold; padding: 10px; background-color: #333; border-radius: 4px; color: #FFF;')
    },
    // [调试] 打印 cells
    __printCells () {
      console.log(this.cells)
    },
    // [调试] 打印 cellsGrid
    __printCellsGrid (title = '现在的 cellsGrid :') {
      console.group(title)
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
