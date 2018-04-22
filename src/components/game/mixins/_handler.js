export default {
  methods: {
    // [上] 不管是触摸 还是按键 还是点击 最后触发的都是这里的方法
    handlerUp () {
      this.printKey('handlerUp')
      // 点亮下面的指示灯 并隔一段时间后熄灭
      this.isUp = true
      setTimeout(() => {
        this.isUp = false
      }, 100)
      this.canMoveUp()
        .then(() => {
          console.log('can')
        })
        .catch(err => console.warn(err))
    },
    // [下] 不管是触摸 还是按键 还是点击 最后触发的都是这里的方法
    handlerDown () {
      this.printKey('handlerDown')
      // 点亮下面的指示灯 并隔一段时间后熄灭
      this.isDown = true
      setTimeout(() => {
        this.isDown = false
      }, 100)
      this.canMoveDown()
        .then(() => {
          console.log('can')
        })
        .catch(err => console.warn(err))
    },
    // [左] 不管是触摸 还是按键 还是点击 最后触发的都是这里的方法
    handlerLeft () {
      this.printKey('handlerLeft')
      // 点亮下面的指示灯 并隔一段时间后熄灭
      this.isLeft = true
      setTimeout(() => {
        this.isLeft = false
      }, 100)
      this.canMoveLeft()
        .then(() => {
          // 向左移动
          for (let row = 0; row < this.cellNum; row++) {
            // 从左侧开始向右找 忽略最左侧的一列
            for (let col = 1; col < this.cellNum; col++) {
              // 找到一个非空位置
              if (this.cellsGrid[row][col] !== 0) {
                // 找这个位置左侧的位置 从左往右找 包括最左边的一列
                for (let _col = 0; _col < col; _col++) {
                  // 需要移动的格子 [row][col]
                  // 当前正在判断的格子 [row][_col]
                  const can = this.canMoveTo(row, col, row, _col)
                  if (can === 'empty') {
                    this.cellMove(row, col, row, _col)
                    continue
                  } else if (can === 'same') {
                    this.cellAdd(row, col, row, _col)
                    continue
                  }
                }
              }
            }
          }
          // 打印
          this.__printCellsGrid('移动完成后')
          // 添加一个 cell
          this.cellCreat()
          // 更新视图
          this.updateView()
          // 复位
          this.cellsComputedGridInit()
        })
        .catch(err => console.warn(err))
    },
    // [右] 不管是触摸 还是按键 还是点击 最后触发的都是这里的方法
    handlerRight () {
      this.printKey('handlerRight')
      // 点亮下面的指示灯 并隔一段时间后熄灭
      this.isRight = true
      setTimeout(() => {
        this.isRight = false
      }, 100)
      this.canMoveRight()
        .then(() => {
          // 向右移动
          for (let row = 0; row < this.cellNum; row++) {
            // 从右侧开始向左找 忽略最右侧的一列
            for (let col = this.cellNum - 2; col >= 0; col--) {
              // 找到一个非空位置
              if (this.cellsGrid[row][col] !== 0) {
                // 找这个位置右侧的位置 从右往左找 包括最右边的一列
                for (let _col = this.cellNum - 1; _col > col; _col--) {
                  // 需要移动的格子 [row][col]
                  // 当前正在判断的格子 [row][_col]
                  const can = this.canMoveTo(row, col, row, _col)
                  if (can === 'empty') {
                    this.cellMove(row, col, row, _col)
                    continue
                  } else if (can === 'same') {
                    this.cellAdd(row, col, row, _col)
                    continue
                  }
                }
              }
            }
          }
          // 打印
          this.__printCellsGrid('移动完成后')
          // 添加一个 cell
          this.cellCreat()
          // 更新视图
          this.updateView()
          // 复位
          this.cellsComputedGridInit()
        })
        .catch(err => console.warn(err))
    }
  }
}
