import _clonedeep from 'lodash.clonedeep'

export default {
  data () {
    return {
      // [计算获得] 格子尺寸
      cellWidth: 0,
      // [mounted后取值] 棋盘尺寸
      boardWidth: 0
    }
  },
  computed: {
    // 当前 cells 的 grid 形式
    cellsGrid () {
      const row = Array(this.cellNum).fill(0)
      let grid = [...Array(this.cellNum)].map(e => _clonedeep(row))
      this.cells.forEach(cell => {
        const {x, y} = this.cell2xy(cell.cell)
        grid[x][y] = _clonedeep(cell)
      })
      return grid
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 初始化
    init () {
      // 获取尺寸
      this.boardWidth = this.$refs.board.offsetWidth
      // 计算尺寸
      this.cellWidth = (this.boardWidth - this.cellMargin * (this.cellNum + 1)) / this.cellNum
      // 注册按键
      this.keyRegister()
      // 开始游戏
      this.gameStart()
      // this.cellCreat(1)
      // this.cellCreat(1)
      // this.cellCreat(2)
    },
    gameStart () {
      // 根据设置生成初始的cell
      for (let i = 0; i < this.gameStartCellNum; i++) {
        this.cellCreat()
      }
    }
  }
}
