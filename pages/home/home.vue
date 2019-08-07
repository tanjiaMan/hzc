<template>
	<view class="flex fix_nav_wp">
	  <view class="nav_link" bindtap='gotoCompanyIndex'>
		<button class="defalut_btn on_cor">
		  <icon class="iconfont icon-qiugouguanli del_ico idx_ico"></icon>     
		  <text class="txt">今日求购</text>
		</button>
	  </view>
	  <view class="nav_link" bindtap='gotobusinessCard'>
		<button class="defalut_btn">
		  <icon class="iconfont icon-mingpianjia del_ico job_ico mp_ico"></icon>
		  <text class="txt">名片</text>
		</button>
	  </view>
	  <view class="nav_link ">
		<button class="defalut_btn" bindtap='gotopublish'>
		  <view class="plus_wp">
			<image src='/static/tab-home.png' class="plus_ico" />
		  </view>
		  <text class="txt txt_fb">发布</text>
		</button>
	  </view>
	  <view class="nav_link">
		<button class="defalut_btn" bindtap='gotoMessages'>
		  <icon class="iconfont icon-yikeappshouyetubiao35 del_ico man_ico xiaox_ico"></icon>
		  <text  class="tip_tip">2</text>
		  <text class="txt">消息</text>
		</button>
	  </view>
	  <view class="nav_link">
		<button class="defalut_btn" bindtap='bindViewMy'>
		  <icon class="iconfont icon-wode del_ico mine_ico my_ico"></icon>
		  <text class="txt">我的</text>
		</button>
	  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navData:[
				  {
					name: "今日求购",  //文本
					current: 1,    //是否是当前页，0不是  1是
					style: 0,     //样式
					ico: 'icon-qiugouguanli',  //不同图标
					fn: 'gotoCompanyIndex'   //对应处理函数
				  }, {
					name: "名片",
					current: 0,
					style: 0,
					ico: 'icon-mingpianjia',
					fn: 'gotobusinessCard'
				  }, {
					name: "发布",
					current: 0,
					style: 1,
					ico: '',
					fn: 'gotopublish'
				  }, {
					name: "消息",
					current: 0,
					style: 0,
					ico: 'icon-yikeappshouyetubiao35',
					fn: 'gotoMessages',
					msg:2   //因为消息是这个“消息”特有的，所以只有这个对象下游msg键值
				  }, {
					name: "我的",
					current: 0,
					style: 0,
					ico: 'icon-wode',
					fn: 'bindViewMy'
				  },
				],
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	page{font-size:26rpx;color:#666;}
	.flex{display:-webkit-flex;display: flex;width:100%;}
	/*  底部悬浮导航  */
	.fix_nav_wp{height:110rpx;position: fixed;left:0;bottom:0;background:#fff;border-top:1rpx solid #e5e5e5;z-index: 10}
	.fix_nav_wp .nav_link{flex:1;}
	.fix_nav_wp button{height:110rpx;display: flex;justify-content:space-between;align-items: center;padding:0;font-size:22rpx;
	flex-direction: column;color:#999;position: relative;}
	.fix_nav_wp .tip_tip{position: absolute;right:25rpx;top:5rpx;min-width:28rpx;line-height:32rpx;
	height: 32rpx;padding:0 8rpx;color:#fff;background:#f00;border-radius:50em;border:1rpx solid #fff;}
	.fix_nav_wp .nav_link .iconfont{height:60rpx;font-size:56rpx;line-height: 80rpx;color: #c4c8cc;}
	.fix_nav_wp .nav_link .plus_wp{width:120rpx;height:120rpx;margin-top: -45rpx;}
	.fix_nav_wp .nav_link  image{width:120rpx;height:120rpx;}
	.fix_nav_wp .nav_link .txt{height:50rpx;line-height:40rpx;color: #c4c8cc;}
	.fix_nav_wp .nav_link.current .txt{color:#00a2e9;}
	.fix_nav_wp .nav_link .del_ico{display: block;}
	.fix_nav_wp .nav_link .cur_ico{display: none;}
	.fix_nav_wp .nav_link.current .del_ico{display: none;}
	.fix_nav_wp .nav_link.current .cur_ico{display: block;color:#00a2e9;}
	.fix_nav_wp .nav_link .txt_fb{line-height: 18rpx}
	.fix_nav_wp .nav_link .mp_ico{font-size: 50rpx;line-height: 80rpx}
	.fix_nav_wp .nav_link .xiaox_ico{font-size: 64rpx;line-height: 70rpx;}
	.fix_nav_wp .nav_link .my_ico{font-size: 56rpx;}
	.fix_nav_wp .on_cor .del_ico, .fix_nav_wp .on_cor .txt{color: #00a2e9}
	/* 清楚按钮的默认样式  */
	.defalut_btn{background: transparent;border:none;overflow: visible;padding-left:0;padding-right:0;
	margin-left:0;margin-right:0;border-radius:0;}
	.defalut_btn:after{display: none;}
	.text-primary{color:#00a2e9;}
</style>
