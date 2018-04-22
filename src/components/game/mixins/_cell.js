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
      cellId: 0,
      // 保存本次操作中发生了叠加的格子
      cellsComputedGrid: []
    }
  },
  computed: {
    // 始终返回一个和当前尺寸一致的二维数组 每一项是0
    emptyGrid () {
      const row = Array(this.cellNum).fill(0)
      return [...Array(this.cellNum)].map(e => _clonedeep(row))
    }
  },
  methods: {
    // 移动 cell
    // 包含两步
    // 第一步 复制 form => to
    // 第二步 删除 from
    cellMove (fromRow, fromCol, toRow, toCol) {
      this.cellsGrid[toRow][toCol] = _clonedeep(this.cellsGrid[fromRow][fromCol])
      this.cellsGrid[fromRow][fromCol] = 0
    },
    // 相加 cell
    // 第一步 移动 cell1 => cell2
    // 第二步 cell1 level +
    cellAdd (cell1Row, cell1Col, cell2Row, cell2Col) {
      this.cellMove(cell1Row, cell1Col, cell2Row, cell2Col)
      this.cellsGrid[cell2Row][cell2Col].level += 1
      this.cellsComputedGrid[cell2Row][cell2Col] = 1
    },
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
      this.__printCellsGrid('新建一个 cell 后')
    },
    // 初始化一个空的 cellsGrid
    cellsGridInit () {
      this.cellsGrid = _clonedeep(this.emptyGrid)
      // 打印
      this.__printCellsGrid('初始化后')
    },
    // 初始化一个空的 cellsComputedGrid
    cellsComputedGridInit () {
      this.cellsComputedGrid = _clonedeep(this.emptyGrid)
    },
    // 更新 cellsGrid => cells
    updateView () {
      this.cells = [].concat(...this.cellsGrid).map((e, index) => ({
        position: index + 1,
        id: e.id,
        level: e.level
      })).filter(e => e.level)
      // 打印
      this.__printCells('视图已经更新')
    }
  }
}
