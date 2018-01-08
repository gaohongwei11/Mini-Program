//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    themes:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    this.getThemes()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
    console.log('监听用户下拉动作')
  },
  // 获取主题日报列表
  getThemes: function(){
    let _this = this
    wx.request({
      // url: Api.getTopics(data),
      url: 'https://news-at.zhihu.com/api/4/themes',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        _this.setData({
          themes:res.data.others
        })
      }
    })
  },
  goToTheme: function(e){
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/theme/theme?id=' + id }) 
  }
})
