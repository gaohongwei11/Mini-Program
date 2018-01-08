//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs: [],
    id: null,
    name:'',
    description: '',
    editors: [],
    image: '',
    stories: []
  },
  onLoad: function (options) {
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(function (log) {
    //     return util.formatTime(new Date(log))
    //   })
    // })
    this.setData({
      id: options.id
    })
    this.getData(options.id)
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
    console.log('监听用户下拉动作')
  },
  getData: function(id){
    let _this = this
    let url = 'https://news-at.zhihu.com/api/4/theme/' + id
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        wx.setNavigationBarTitle({
          title: res.data.name
        })
        _this.setData({
          name: res.data.name,
          description: res.data.description,
          editors: res.data.editors,
          image: res.data.image,
          stories: res.data.stories
        })
      }
    })
  },
  //跳转至详情
  goToStory: function (e) {
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/story/story?id=' + id })
  }
})
