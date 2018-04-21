import _get from 'lodash.get'

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
          // 判断一个位置是否可以成为目的位置的标准
          // 1 这个位置应该是空的
          // 2 这个位置或者和移动的元素一样
          // 3 之间不能有东西
          for (let row = 0; row < this.cellNum; row++) {
            for (let col = 1; col < this.cellNum; col++) {
              // 找到一个非空位置
              if (this.cellsGrid[row][col] !== 0) {
                // 找这个位置左侧的位置
                for (let _col = 0; _col < col; _col++) {
                  // 通过的情况 1 这个位置为0 并且没有障碍物
                  // 通过的情况 2 这个位置和移动的对象一样 并且没有障碍物
                  // 需要移动的格子 [row][col]
                  // 当前正在判断的格子 [row][_col]
                  if (this.cellsGrid[row][_col] === 0 && this.unobstructedRow(row, col, _col)) {
                    this.cellMove(row, col, row, _col)
                    continue
                  } else if (_get(this.cellsGrid[row][_col], 'level', 'new') === _get(this.cellsGrid[row][_col], 'level', 'old') && this.unobstructedRow(row, col, _col)) {
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
          console.log('can')
        })
        .catch(err => console.warn(err))
    }
  }
}
