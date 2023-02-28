<template>
  <div class="box">
      <div class="backTop" @click="backTop"><span class="iconfont iconshangla"></span></div>
      <div class="backTop" @click="backBottom" style="transform: rotateX(180deg)"><span class="iconfont iconshangla"></span></div>

      <div class="backLeft animated" :class="isShow?'fadeInUp':'fadeOutDown'" @click="backLeft">
          <span class="iconfont iconfanhui1"></span>
      </div>
  </div>
</template>

<script>
    export default {
        name: "BackTop.vue",
        data(){
            return {

            }
        },
        props:{
            isShow:{
                default:false,
                type:Boolean
            }
        },
        created(){

        },
        methods:{
            backTop(){
                uni.pageScrollTo({
                    scrollTop: 0,
                    duration: 50
                });
                this.$emit('pageReduce')
            },
            backBottom(){
	            uni.pageScrollTo({
		            scrollTop: 0,
		            duration: 50
	            });
	            this.$emit('pageAdd')
            },
            backLeft(){
                //#ifdef MP-WEIXIN
                console.log(getCurrentPages());
                if(getCurrentPages().length >1){
                    uni.navigateBack();
                }else {
                    uni.reLaunch({
                        url: '../index/index'
                    });
                }
                //#endif

                //#ifdef H5 || APP-PLUS
                uni.navigateBack();
                //#endif
            }
        }
    }
</script>

<style scoped lang="less">
    .box{
        position: fixed;
        width: 100upx;
        right: 0upx;
        bottom: 150upx;
        z-index: 999;
        .backTop,.backLeft{
            width: 75upx;
            height: 75upx;
            border-radius: 50%;
            line-height: 75upx;
            text-align: center;
            background-color: #add5a2;
            margin-bottom: 30upx;

            span{
                font-size: 40upx;
                color: #fff;
            }
        }
    }

</style>
