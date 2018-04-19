export default {
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
      // 根据设置生成初始的cell
      // for (let i = 0; i < this.gameStartCellNum; i++) {
      //   this.newCell()
      // }
      // this.newCell(1)
      // this.newCell(1)
      // this.newCell(2)
    }
  }
}
