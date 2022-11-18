<template>
	<view class="content" :style="{'height':'85vh'}">
		<!--<rich-text :nodes="state.bookData2"></rich-text>-->
		<mpHtml :content="state.bookData2" />
		<!--<textarea class="textarea" :value="state.bookData.bookContent && state.bookData.bookContent[0]"></textarea>-->
	</view>
</template>

<script lang="ts" setup>
	// import {getDemo} from '@/serves/main'
	import { ref, reactive, toRefs, computed, Ref, watchEffect,onMounted,getCurrentInstance } from "vue";
	import { useRoute  } from "vue-router";
	import mpHtml from '@/components/mp-html/mp-html'
	import { onLoad } from '@dcloudio/uni-app';
	const state = reactive({
		animate:false,
		bookData:{},
		bookData2:"",
	});
	// const route = useRoute()

	onMounted(() => {
		// getRulesList()
	})

	onLoad(options => {
		getRulesList(options);
	})

	const getRulesList = (options)=>{
		if(options && options.bookName){
			let arr = JSON.parse(uni.getStorageSync('downBookData') || '[]')
			let bookName = options.bookName
			state.bookData = arr.find(item=>item.bookName === bookName)
			state.bookData2 = (state.bookData.bookContent[0])
			// console.log(state.bookData2)
		}
	}
</script>

<style lang="scss" scoped>
	/*@import url("../../components/u-parse/u-parse.css");*/
	.content {
		padding: 20px;
	}


</style>
