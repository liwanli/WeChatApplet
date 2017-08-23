//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    //定义请求数据
    movieData:[],
    movieTotal: 0,
    movieCount:10,
    movieUrl:"https://api.douban.com/v2/movie/top250",
    // loding 是否隐藏
    hidden: true,
    currentTab:0
  },
  onLoad: function () {
    var that = this;
    // loadingStyle...
    wx.showLoading({
      title: '加载中...',
    })
     that.loadMore();
  },
  // 详情页面路由
  detailing: function (e) {
    wx.navigateTo({
      url: '../detaills/detaill?id=' + e.target.dataset.movieid,
    })
  },
  // 请求数据
  loadMore: function(){
    var that = this;
    // loadingStyle...
    wx.showLoading({
      title: '加载中...',
    })
      wx.request({
          url:that.data.movieUrl,
          data:{
              count : that.data.movieCount,
          },
          header: {
            'content-type': 'json'
          },
          success: function(succ){
            that.setData({
              movieData: succ.data.subjects
            })
            
          },
          fail: function(err){
            wx.showModal({
              title: '加载失败！',
              content: '这是一个模态弹窗',
              success:function(succ){
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          },
          complete: function(){
            wx.hideLoading();
            console.log(that.data.movieUrl)
            console.log(that.data.movieData)
          }
      });
  },
  // top250
  top250: function (e) {
    var that = this;
    that.setData({
      movieUrl:'https://api.douban.com/v2/movie/top250',
      movieCount:10,
      currentTab:0
    });
    that.loadMore();
  },
  //正在上映
  ltson: function (e) {
    var that = this;
    that.setData({
      movieUrl:'https://api.douban.com/v2/movie/in_theaters',
      movieCount: 10,
      currentTab: 1
    });
    that.loadMore();
  },
  //即将上映
  abshow: function (e) {
    var that = this;
    console.log(this, e)
    that.setData({
      movieUrl:'https://api.douban.com/v2/movie/coming_soon',
      movieCount: 10,
      currentTab: 2
    });
    that.loadMore();
  },
  //新片榜
  boxoffice:function(e){
    var that = this;
    console.log(this, e)
    that.setData({
      movieUrl:'https://api.douban.com/v2/movie/new_movies',
      movieCount: 10,
      currentTab: 3
    });
    that.loadMore();
  },
  // 下拉刷新回调接口
    onPullDownRefresh: function () {
        // 网络请求，重新请求一遍数据
        this.loadMore();
        // 小程序提供的api，通知页面停止下拉刷新效果
        wx.stopPullDownRefresh;
    },
  // 上拉加载回调接口
  onReachBottom: function () {
    // 每次上拉加载10条
    this.data.movieCount += 10;
    // 网络请求
    this.loadMore();
  },
})
