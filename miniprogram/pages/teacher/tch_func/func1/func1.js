const db = wx.cloud.database()
var all = []
var isnsub = true
Page({
  data: {
    checkedAll: false,
    classarr: [{
              id: 0,
              name: '软件工程1班',
              checked: true,
              num:50
          },
          {
              id: 1,
              name: '软件工程2班',
              checked:false,
              num:55
          },
    ],
    allnum:50,
    robnum:5,
    robstu:[]
  },
  onLoad(){
      db.collection("RobA").get().then(res =>{
          this.setData({
              robstu:res.data
          })
      })
      db.collection("tch_main").doc("000").get().then(res =>{
        isnsub = res.data.isnSub
    })
  },

  checkboxChange(e) {
    const number = e.detail.value.length
    const value = e.detail.value
    const oldclass = this.data.classarr
    if(number == oldclass.length){
        this.setData({
            checkedAll:true
        })
    }
    else{
        this.setData({
            checkedAll:false
        })
    }
    var res = 0
    for(let i = 0;i<number;++i){
        res += this.data.classarr[value[i]].num
    }
    this.setData({
        allnum:res
    })
    
  },

  checkboxAll(e) {
      var len = this.data.classarr.length
      var oldclass = this.data.classarr
      var res = 0
    if(this.data.checkedAll){
        for(let i=0;i < len;++i){
            res += oldclass[i].num
            oldclass[i].checked = true
        }
    }
    else{
        for(let i=0;i < len;++i){
            oldclass[i].checked = false
        }
        res = 0
    }
    this.setData({
        classarr:oldclass,
        allnum:res
    })
  },

  onsubmit(){
    if(!isnsub){
        wx.showToast({
          title: '请先重置',
          icon:"error"
        })
        return
    }
    else{
        db.collection("tch_main").add({
            data:{
                _id:'000',
                robnum:this.data.robnum,
                isnSub:false
            }
        }).then(res =>{
            console.log(res);
        })
        isnsub = false
        wx.showToast({
          title: '下拉刷新查看结果',
          icon:'none'
        })
    }
  },
  reset(){
      db.collection("tch_main").doc("000").remove()
      isnsub = true
      let stutmp = this.data.robstu
      for(let i=0;i<stutmp.length;++i){
        let j = stutmp[i]._id
        db.collection("RobA").doc(j).remove()
      }
      this.setData({
          robstu:[]
      })
  },
  
})
