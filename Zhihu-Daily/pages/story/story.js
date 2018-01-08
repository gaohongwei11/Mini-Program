//story.js
let WxParse = require("../../wxParse/wxParse.js")
Page({
  data: {
    id: null,
    story: {},
    article_content:''
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id:options.id
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
    let url = 'https://news-at.zhihu.com/api/4/news/' + id
    wx.request({
      // url: Api.getTopics(data),
      url: url,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        let content = _this.parseHtml(res.data.body)
        console.log(content)
        _this.setData({
          story: res.data,
          article_content: WxParse.wxParse('article_content','html',res.data.body,_this,5)
        })
        
      }
    })
  },
  parseHtml (htmlBlock){
    let parser = new DOMParser()
    return parser.parseFromString(htmlBlock, "text/html")
  }
})
