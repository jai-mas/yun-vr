export default{
	//接口
	api:function(){
		let version = wx.getAccountInfoSync().miniProgram.version
		switch(version){
			case "develop"://开发预览版
                return "https://xnlv.lizxx.com/api"
			case "trial"://体验版
			    return "https://xnlv.lizxx.com/api"
			case "release"://正式版
				return "https://xnlv.lizxx.com/api"
			default://未知，默认调用正式版
			    return "https://xnlv.lizxx.com/api"
		}
	}
}