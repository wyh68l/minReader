<template>
  <view class="content" :style="{'height':'85vh'}">
    <view class="boolList">
      <template v-if="state.bookList.length">
        <view class="book-item" v-for="(item,index) in state.bookList" :key="index" @tap="goReadBook(item.bookName)">
          <view class="img"></view>
          <view class="name">{{item.bookName}}</view>
        </view>
      </template>
      <view v-else class="nomore">
        暂无更多噢,快去添加吧~
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
// import {getDemo} from '@/serves/main'
import { ref, reactive, toRefs, computed, Ref, watchEffect,onMounted,getCurrentInstance } from "vue";
import mixins from '@/common/js/mixin.ts'
import { onLoad ,onShow} from '@dcloudio/uni-app';

const state = reactive({
	animate:false,
	bookList:[]
});

onMounted(() => {

})
onShow(() => {
	console.log(222)
	getRulesList();
})

const getRulesList = ()=>{
	state.bookList = JSON.parse(uni.getStorageSync('downBookData') || '[]')
}
const goReadBook = (bookName)=>{
	uni.navigateTo({url:'../readBookPage/readBookPage?bookName='+bookName})
}

</script>

<style lang="scss" scoped>
.content {
  padding: 20px;
  .boolList{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .book-item{
      width: 30%;
      margin-right: 5%;
      margin-bottom: 30rpx;
      text-align: center;
      .img{
        height: 160px;
        background-color: #e3e3e3;
        margin-bottom: 10rpx;
      }
      .name{
        color: #333;
        font-size: 24rpx;
      }
      &:nth-of-type(3n+3){
        margin-right: 0;
      }
    }
  }
}

.title {
  font-size: 36rpx;
  color: $uni-color-warning;
}
.nomore{
  text-align: center;
  margin: 100rpx auto;
  font-size: 26rpx;
  color: #666;
}
</style>
