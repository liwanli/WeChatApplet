// pages/seach/seach.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieData: [],
    seachhide:false,
    seachdata:'',
    movieTotal: 0,
    movieCount: 10,
    movieUrl: "https://api.douban.com/v2/movie/top250",
  },
  // 请求数据
  loadMore: function () {
    var that = this;
    // loadingStyle...
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: that.data.movieUrl,
      data: {
        count: that.data.movieCount,
      },
      header: {
        'content-type': 'json'
      },
      success: function (succ) {
        console.log(succ.data);
        that.setData({
          movieData: succ.data.subjects
        })
        console.log(that.data.movieData)
        console.log(succ.statusCode);
      },
      fail: function (err) {
        wx.showModal({
          title: '加载失败！',
          content: '这是一个模态弹窗',
          success: function (succ) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
/**
 * 搜索请求数据
 */
  seach:function(event){
    var that = this;
    console.log(event.detail.value)
    if (event.detail.value===""){
      that.setData({
        seachhide: false,
        seachdata:''
      })
      that.loadMore();
    }else{
      that.setData({
        movieUrl: 'https://api.douban.com/v2/movie/search?q=' + event.detail.value,
        seachdata: event.detail.value,
        seachhide: true
      })
      that.loadMore();
    }
  },
  cancel:function(event){
    var that = this;
    that.setData({
      seachhide: false,
      movieUrl: "https://api.douban.com/v2/movie/top250",
      seachdata:'',
    })
    that.loadMore();
  },
  // 详情页面路由
  detailing: function (e) {
    console.log(e.target.dataset.movieid);
    wx.navigateTo({
      url: '../detaills/detaill?id=' + e.target.dataset.movieid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (event) {
    var that = this;
    that.loadMore();

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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})