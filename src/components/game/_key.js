import hotkeys from 'hotkeys-js'

export default {
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
