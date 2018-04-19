import _clonedeep from 'lodash.clonedeep'
export default {
  data () {
    return {
      // cell 数据 一维数组表示 视图根据这个数据改变
      cells: [],
      // cell 数据 二维数组表示
      // cells 由 cellsGrid 得到
      // 上面的过程不可逆向
      cellsGrid: []
    }
  },
  methods: {
    // 新建一个 cell
    cellCreat () {
      //
    },
    // 初始化一个空的 cellsGrid
    cellsGridInit () {
      const row = Array(this.cellNum).fill(0)
      this.cellsGrid = [...Array(this.cellNum)].map(e => _clonedeep(row))
      this.__printCellsGrid()
    },
    // 更新 cellsGrid => cells
    cellsGridFlat () {
      // const row = Array(this.cellNum).fill(0)
      // let grid = [...Array(this.cellNum)].map(e => _clonedeep(row))
      // this.cells.forEach(cell => {
      //   const {x, y} = this.cell2xy(cell.cell)
      //   grid[x][y] = _clonedeep(cell)
      // })
      // return grid
    }
  }
}
