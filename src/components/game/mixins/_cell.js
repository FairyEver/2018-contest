import _clonedeep from 'lodash.clonedeep'
import _random from 'lodash.random'
export default {
  data () {
    return {
      // cell 数据 一维数组表示 视图根据这个数据改变
      cells: [],
      // cell 数据 二维数组表示
      // cells 由 cellsGrid 得到
      // 上面的过程不可逆向
      cellsGrid: [],
      // 产生一个 cell 就累加1
      cellId: 0
    }
  },
  methods: {
    // 新建一个 cell
    cellCreat ({position = 0, level = 1} = {}) {
      // 得到现在所有还可以用的位置
      const usefulPostion = () => {
        const available = [].concat(...this.cellsGrid).reduce((all, e, index) => {
          if (e === 0) {
            all.push(index + 1)
          }
          return all
        }, [])
        return available[_random(available.length - 1)]
      }
      // 位置
      const _position = position || usefulPostion()
      // 位置转坐标
      const {x, y} = this.n2xy(_position)
      // 设置 cellsGrid
      this.cellsGrid[x][y] = {
        level: level,
        id: this.cellId++
      }
      // 打印
      this.__printCellsGrid()
    },
    // 初始化一个空的 cellsGrid
    cellsGridInit () {
      const row = Array(this.cellNum).fill(0)
      this.cellsGrid = [...Array(this.cellNum)].map(e => _clonedeep(row))
      // 打印
      this.__printCellsGrid()
    },
    // 更新 cellsGrid => cells
    cellsGridFlat () {
      const cells = [].concat(...this.cellsGrid).map((e, index) => ({
        position: index + 1,
        id: e.id,
        level: e.level
      })).filter(e => e.level)
      console.log(cells)
    }
  }
}
