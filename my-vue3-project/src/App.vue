<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style lang="scss">
/*每个页面公共css */
@import url("common/public_css/iconfont.css");
@import url("common/public_css/animate.min.css");
page{
	background: url("./static/image/texture.png");
}
.uni-tabbar{
	background: url("./static/image/texture.png");
	background-color: #fff;
}

</style>
