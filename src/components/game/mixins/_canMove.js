import _get from 'lodash.get'
export default {
  methods: {
    // 接收 起始位置 目的位置 返回检测结果 false / empty / same
    canMoveTo (fromRow, fromCol, toRow, toCol) {
      // 通过的情况 1 这个位置为0 并且没有障碍物
      // 通过的情况 2 这个位置和移动的对象一样 并且没有障碍物
      // 先判断中间是否有间隔
      // 间隔检查没有通过 直接返回失败
      if (!this.unobstructed(fromRow, fromCol, toRow, toCol)) {
        // 返回检测结果 不能移动
        return false
      }
      // 间隔检查通过 进行下一步检查
      if (this.cellsGrid[toRow][toCol] === 0) {
        // 检测结果 '空'
        return 'empty'
      } else if (
        // 两侧是否相等
        _get(this.cellsGrid[fromRow][fromCol], 'level', 'new') === _get(this.cellsGrid[toRow][toCol], 'level', 'old') &&
        // 目的位置是否发生过合并
        this.cellsComputedGrid[toRow][toCol] !== 1) {
        // 返回结果 '相同'
        return 'same'
      } else {
        // 返回检测结果 不能移动
        return false
      }
    },
    // [移动检查]
    // 只返回布尔值 不会返回具体的 cell
    // 检查是否可以向上移动
    canMoveUp () {
      return new Promise((resolve, reject) => {
        // 打印矩阵
        this.__printCellsGrid()
        // 找符合要求的节点
        // 第一行省略
        for (let row = 1; row < this.cellNum; row++) {
          for (let col = 0; col < this.cellNum; col++) {
            // 首先这个 cell 不可以是 0, 因为要找的是有值的格子
            if (this.cellsGrid[row][col] !== 0) {
              // 以下情况符合
              // 这个格子上面的格子是空的
              // 这个格子上面的格子和这个格子是一样的
              if (this.cellsGrid[row - 1][col] === 0) {
                this.__printCell(this.cellsGrid[row][col], '这个 cell 可以移动，因为它上边的格子为空')
                return resolve()
              } else if (this.cellsGrid[row - 1][col].level === this.cellsGrid[row][col].level) {
                this.__printCell(this.cellsGrid[row][col], '这个 cell 可以移动，因为它上边的格子和它一样')
                return resolve()
              }
            }
          }
        }
        return reject(new Error('没有格子可以向上移动!'))
      })
    },
    // [移动检查]
    // 只返回布尔值 不会返回具体的 cell
    // 检查是否可以向下移动
    canMoveDown () {
      return new Promise((resolve, reject) => {
        // 打印矩阵
        this.__printCellsGrid()
        // 找符合要求的节点
        // 省略最下面一行
        for (let row = 0; row < this.cellNum - 1; row++) {
          for (let col = 0; col < this.cellNum; col++) {
            // 首先这个 cell 不可以是 0, 因为要找的是有值的格子
            if (this.cellsGrid[row][col] !== 0) {
              // 以下情况符合
              // 这个格子下面的格子是空的
              // 这个格子下面的格子和这个格子是一样的
              if (this.cellsGrid[row + 1][col] === 0) {
                this.__printCell(this.cellsGrid[row][col], '这个 cell 可以移动，因为它下边的格子为空')
                return resolve()
              } else if (this.cellsGrid[row + 1][col].level === this.cellsGrid[row][col].level) {
                this.__printCell(this.cellsGrid[row][col], '这个 cell 可以移动，因为它下边的格子和它一样')
                return resolve()
              }
            }
          }
        }
        return reject(new Error('没有格子可以向下移动'))
      })
    },
    // [移动检查]
    // 只返回布尔值 不会返回具体的 cell
    // 检查是否可以向左移动
    canMoveLeft () {
      return new Promise((resolve, reject) => {
        // 打印矩阵
        this.__printCellsGrid()
        // 找符合要求的节点
        // 省略最左边一列
        for (let row = 0; row < this.cellNum; row++) {
          for (let col = 1; col < this.cellNum; col++) {
            // 首先这个 cell 不可以是 0, 因为要找的是有值的格子
            if (this.cellsGrid[row][col] !== 0) {
              // 以下情况符合
              // 这个格子左面的格子是空的
              // 这个格子左面的格子和这个格子是一样的
              if (this.cellsGrid[row][col - 1] === 0) {
                this.__printCell(this.cellsGrid[row][col], '这个 cell 可以移动，因为它左边的格子为空')
                return resolve()
              } else if (this.cellsGrid[row][col - 1].level === this.cellsGrid[row][col].level) {
                this.__printCell(this.cellsGrid[row][col], '这个 cell 可以移动，因为它左边的格子和它一样')
                return resolve()
              }
            }
          }
        }
        return reject(new Error('没有格子可以向左移动'))
      })
    },
    // [移动检查]
    // 只返回布尔值 不会返回具体的 cell
    // 检查是否可以向右移动
    canMoveRight () {
      return new Promise((resolve, reject) => {
        // 打印矩阵
        this.__printCellsGrid()
        // 找符合要求的节点
        // 省略最右边一列
        for (let row = 0; row < this.cellNum; row++) {
          for (let col = 0; col < this.cellNum - 1; col++) {
            // 首先这个 cell 不可以是 0, 因为要找的是有值的格子
            if (this.cellsGrid[row][col] !== 0) {
              // 以下情况符合
              // 这个格子右面的格子是空的
              // 这个格子右面的格子和这个格子是一样的
              if (this.cellsGrid[row][col + 1] === 0) {
                this.__printCell(this.cellsGrid[row][col], '这个 cell 可以移动，因为它右边的格子为空:')
                return resolve()
              } else if (this.cellsGrid[row][col + 1].level === this.cellsGrid[row][col].level) {
                this.__printCell(this.cellsGrid[row][col], '这个 cell 可以移动，因为它右边的格子和它一样')
                return resolve()
              }
            }
          }
        }
        return reject(new Error('没有格子可以向右移动'))
      })
    }
  }
}
