module.exports = function(scope) {
  wx.getSetting({
    success: res => {
      if (!res.authSetting[scope]) {
        /**
         * wx.authorize
         * 第一次时候 小程序会弹出自身内置的授权窗
         * 因为success和fail属于回调, 小程序自身内置的授权窗弹出到确认期间, success和fail是不会运行, 姑且就当是程序暂停🛑
         * 用户点同意, 准备运行success
         * 用户点取消, 准备运行fail
         * 用户点取消后, 后续请求授权时调用wx.authorize, 不会弹出小程序会弹出自身内置的授权窗, 直接准备运行fail
         * btw 可以通过在调式工具中清除授权缓存, 小程序会重新弹出自身内置的授权窗
         */
        wx.authorize({
          scope,
          success: () => {
            // 授权成功
          },
          fail: error => {
            /**
             * 授权 接口调用失败
             * 这里就需要前端给出引导的交互UI(不可直接通过调用接口的方式)🚩
             * 引导用户进入小程序的设置界面
             * 具体引导是让用户发生点击行为, 然后调用wx.openSetting, 不可直接调用此接口
             */
          }
        })
      } else {
        // scope权限已经开启
      }
    },
    fail: () => {
      // getSetting 接口调用失败
    }
  })
}