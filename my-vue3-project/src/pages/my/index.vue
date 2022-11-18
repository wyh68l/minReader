<template>
  <view class="content">
    <view class="toolList">
      <van-cell v-for="(item,index) in state.toolList" :key="index" class="list-item" @tap="goPage(item)" :title="item.name" is-link />
    </view>
  </view>
</template>

<script lang="ts" setup>
	// import {getDemo} from '@/serves/main'
	import { ref, reactive, toRefs, computed, Ref, watchEffect,onMounted } from "vue";
	// const count: Ref<number> = ref(0);
	const state = reactive({
		title: 'Hello',
		animate:false,
		toolList:[
			{name:'配置规则',url:'../rulesPage/index'},
			{name:'添加书籍',url:'../addBooks/index'},
			{name:'规则列表',url:'../rulesList/index'},
			{name:'我的书籍',url:'../booksList/index'},
      {name:'设置',url:''}
			]
	})

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

	const goPage = (e)=>{
		uni.navigateTo({url:e.url})
	}

</script>

<style lang="scss" scoped>
  .content {
    .toolList{
      background-color: #fff;
      .list-item{
        height: 90rpx;
        font-size: 24rpx;
        color: #333;
      }
    }
  }
</style>
