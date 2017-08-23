// pages/detaills/detaill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieData:"",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
 
  var that = this;

    wx.request({
      url: 'https://api.douban.com/v2/movie/'+options.id,
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function (succ) {
        that.setData({
          movieData: succ.data
        })
        console.log(that.movieData)
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
        console.log(that.data.movieUrl)
        console.log(that.data.movieData)
      }
    });
   
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