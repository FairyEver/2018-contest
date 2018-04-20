export default {
  data () {
    return {
      // [计算获得] 格子尺寸
      cellWidth: 0,
      // [mounted后取值] 棋盘尺寸
      boardWidth: 0
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
      // 初始化一个空的 cellsGrid
      this.cellsGridInit()
      // 开始游戏
      // this.gameStart()
      this.cellCreat({
        position: 1
      })
      this.cellCreat({
        position: 2
      })
    },
    // 开始游戏
    gameStart () {
      // 根据设置生成初始的cell
      for (let i = 0; i < this.gameStartCellNum; i++) {
        this.cellCreat()
      }
    }
  }
}
