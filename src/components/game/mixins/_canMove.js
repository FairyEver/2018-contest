export default {
  methods: {
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
