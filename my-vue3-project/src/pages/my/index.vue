<template>
  <view class="content">

  </view>
</template>

<script lang="ts">
// import {getDemo} from '@/serves/main'
import { ref, reactive, toRefs, computed, Ref, watchEffect,onMounted } from "vue";
export default {
	setup() {
		// const count: Ref<number> = ref(0);
		const state = reactive({
			title: 'Hello',
			animate:false
    });

		onMounted(() => {
			// getResult()
		})

		const getResult = ()=>{
			getDemo('mock/userInfo').then(res=>{

				if(res.code === 200){
					console.log(res.data);
				}else{
					wx.showToast({
						title: '诶呀,好疼',
						icon: 'none',
						duration: 2000
					})
				}
			})
		}

		return { getResult, ...toRefs(state),};
	},
}
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20rpx;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: $uni-color-warning;
}
</style>
