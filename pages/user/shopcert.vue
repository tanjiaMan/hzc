<template>  
    <view class="container">
		<view class="d-1">
			<view class="d-2">
				<img src="https://pic.youx365.com/shop-cert-1.png" />
				<text class="t1">姓名</text>
			</view>
			<view class="d-3">
				<input class="inputclass" placeholder="请输入真实姓名" placeholder-class="placeholder" />
			</view>
		</view>
		
		<view class="d-1">
			<view class="d-2">
				<img src="https://pic.youx365.com/shop-cert-1.png" />
				<text class="t1">手机号码</text>
			</view>
			<view class="d-3">
				<input class="inputclass" placeholder="请输入手机号码" placeholder-class="placeholder" />
			</view>
		</view>
		
		<view class="d-1">
			<view class="d-2">
				<img src="https://pic.youx365.com/shop-cert-2.png" />
				<text class="t1">联系地址</text>
			</view>
			<view class="d-3">
				<view @click="chooseAddress" class="tabinput1" v-if="addressData.areaName">
					{{addressData.provinceName}} {{addressData.cityName}} {{addressData.areaName}}
				</view>
				<view v-else @click="chooseAddress" class="tabinput">
					请选择所在区域
				</view>
				<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
				 @onConfirm="onConfirm"></mpvue-city-picker>
			</view>
			<view class="d-3">
				<input class="inputclass" placeholder="请输入详细地址" placeholder-class="placeholder" />
			</view>
		</view>
		
		
	</view>  
</template>  
<script>
	
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import provinceData from '@/components/mpvue-citypicker/city-data/province.js';
	import cityData from '@/components/mpvue-citypicker/city-data/city.js';
	import areaData from '@/components/mpvue-citypicker/city-data/area.js';
	
    export default {
		components: {
			mpvueCityPicker
		},
		data(){
			return {
				addressData:{
					
				},
				//城市选择
				themeColor: '#007AFF',
				cityPickerValueDefault: [0, 0, 1],
			}
		},
		onLoad(){
		},
        computed: {
			
		},
        methods: {
			chooseAddress(){
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.addressData.adCode = e.cityCode;
				let addr = e.label.split('-');
				this.addressData.provinceName = addr[0];
				this.addressData.cityName = addr[1];
				this.addressData.areaName = addr[2];
				this.addressData = Object.assign({}, this.addressData);
				console.log('this.addressData',this.addressData);
			}
        }  
    }  
</script>  
<style lang='scss'>
	
	.tabinput{
		font-size:24rpx;
		font-family:SourceHanSansCN;
		font-weight:400;
		color:rgba(131,131,131,1);
		background:rgba(238,238,238,1);
		border-radius:10rpx;
		height: 73rpx;
		line-height: 73rpx;
		padding-left: 20rpx;
		margin-bottom: 20px;
	}
	
	.tabinput1{
		font-size:26rpx;
		font-family:SourceHanSansCN;
		font-weight:400;
		color:rgba(131,131,131,1);
		border: solid 1px rgba(238,238,238,1);
		border-radius:10rpx;
		height: 73rpx;
		line-height: 73rpx;
		padding-left: 20rpx;
		margin-bottom: 20px;
	}
	
	.placeholder{
		font-size:24rpx;
		font-family:SourceHanSansCN;
		font-weight:400;
		color:rgba(131,131,131,1);
		background:rgba(238,238,238,1);
		border-radius:10rpx;
		height: 73rpx;
		line-height: 73rpx;
		padding-left: 20rpx;
		width: 660rpx;
	}
	
	.inputclass{
		font-size:26rpx;
		height: 73rpx;
		border: solid 1px rgba(238,238,238,1);
		border-radius:10rpx;
	}
	
	.container{
		background-color: #FFFFFF;
		padding-bottom: 50rpx;
		
		.d-1{
			width: 680rpx;
			margin: 0 auto;
			
			.d-2{
				height: 80rpx;
				line-height: 80rpx;
				padding-left: 20px;
				
				img{
					width: 38rpx;
					height: 38rpx;
					vertical-align: middle;
				}
				
				image{
					width: 38rpx;
					height: 38rpx;
					vertical-align: middle;
				}
				
				.t1{
					font-size:26rpx;
					font-family:SourceHanSansCN;
					font-weight:400;
					color:rgba(0,0,0,1);
					margin-left: 15rpx;
				}
			}
			
			.d-3{
				
			}
		}
	}
	
</style>