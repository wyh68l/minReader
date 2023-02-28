<script>
export default {
  onLaunch: function () {
    // console.log('App Launch')
  },
  onShow: function () {
    // console.log('App Show')
  },
  onHide: function () {
    // console.log('App Hide')
  },
}
</script>

<style lang="scss">
/*每个页面公共css */
@import url("common/public_css/iconfont.css");
@import url("common/public_css/animate.min.css");
*{
	padding: 0;
	margin: 0;
}
body{
	background: url("./static/image/texture.png");
}
.uni-tabbar{
	background: url("./static/image/texture.png");
	background-color: #fff;
}
.van-button--default{
	border-color:$uni-color-4 !important;
	color: $uni-color-4 !important;
}
.van-button--primary{
	border-color:$uni-color-4 !important;
	background: $uni-color-4 !important;
	color: #fff !important;
}
.van-button--danger{
	border-color:$uni-color-5 !important;
	background: $uni-color-5 !important;
	color: #fff !important;
}

</style>
