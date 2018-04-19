import hotkeys from 'hotkeys-js'

export default {
  props: {
    keyUp: {type: String, required: false, default: 'up'},
    keyDown: {type: String, required: false, default: 'down'},
    keyLeft: {type: String, required: false, default: 'left'},
    keyRight: {type: String, required: false, default: 'right'}
  },
  methods: {
    // 注册按键
    keyRegister () {
      hotkeys(this.keyUp, event => {
        event.preventDefault()
        this.handlerUp()
      })
      hotkeys(this.keyDown, event => {
        event.preventDefault()
        this.handlerDown()
      })
      hotkeys(this.keyLeft, event => {
        event.preventDefault()
        this.handlerLeft()
      })
      hotkeys(this.keyRight, event => {
        event.preventDefault()
        this.handlerRight()
      })
    }
  }
}
