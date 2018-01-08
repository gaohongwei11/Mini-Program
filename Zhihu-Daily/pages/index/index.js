// pages/topics/topics.js
var Api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    top_stories:[],
    newsList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad by topics')
    this.fetchData()//获取数据
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // wx.stopPullDownRefresh()
    console.log('监听用户下拉动作')
    this.fetchData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('页面上拉触底事件的处理函数')
    wx.showLoading({
      title: '加载中',
    })
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  fetchData: function () {
    // 初始化数据
    let _this = this
    this.setData({
      date: '',
      top_stories: [],
      newsList: []
    })
    //获取数据
    wx.request({
      // url: Api.getTopics(data),
      url: 'https://news-at.zhihu.com/api/4/news/latest',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.stopPullDownRefresh() //停止当前页面的下拉刷新
        console.log(res)
        let arr = []
        let date = res.data.date
        let obj = res.data
        obj.date = '今日热闻'
        arr.push(obj)
        _this.setData({
          date: date,
          top_stories: res.data.top_stories,
          newsList: arr
        })
      }
    });
  },
  // 上拉触底加载更多
  loadMore: function(){
    let _this = this
    let url = 'https://news-at.zhihu.com/api/4/news/before/' + _this.data.date
    wx.request({
      // url: Api.getTopics(data),
      url: url,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        wx.hideLoading() //隐藏loading
        let arr = _this.data.newsList
        let date = res.data.date
        let obj = res.data
        obj.date = _this.format(obj.date)
        arr.push(obj)
        _this.setData({
          date: date,
          newsList: arr
        })
      }
    })
  },
  // 日期格式转换函数
  format: function(date){
    let y = Number(date.substring(0,4))
    let m = Number(date.substring(4,6)) - 1
    let d = Number(date.substring(6,8))
    const WEEK = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    let time = new Date(y, m, d)
    console.log(date.substring(4, 6) + '月' + date.substring(6, 8) + '日' + ' ' + WEEK[time.getDay()])
    return date.substring(4, 6) + '月' + date.substring(6, 8) + '日' + ' ' + WEEK[time.getDay()]
  },
  //跳转至详情
  goToStory: function (e){
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/story/story?id=' + id }) 
  }
})