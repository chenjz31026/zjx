const db =wx.cloud.database()
var Num = '1'
var dbarr = []
var t = false
var Rob = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isnSub:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    db.collection("student").get().then(res =>{
      dbarr = res.data
    })
    db.collection("tch_main").doc("000").get().then(res =>{
      this.setData({
        isnSub:res.data.isnSub
      })
    })
  },
  oninput(e){
    let number = e.detail.value
    Num = number
  },
  onsubmit(){
    if(!this.data.isnSub){
      for(let i = 0;i < dbarr.length;++i){
        if(Num == dbarr[i].number){
          t = true
          db.collection("RobA").add({
            data:{
              _id:i+1,
              name:dbarr[i].name,
              number:dbarr[i].number
            }
          })
          wx.showToast({
            title: '已参与抢答'
          })
          break
        }
      }
      if(!t){
        wx.showToast({
          title: '学号错误',
          icon:"none"
        })
      }
      t = false
    }
    else{
      wx.showToast({
        title: '老师尚未发起抢答',
        icon:"none"
      })
      return
    }
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})