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
				<input class="inputclass" type="number" placeholder="请输入手机号码" placeholder-class="placeholder" />
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
		
		<view class="d-1">
			<view class="d-2">
				<img src="https://pic.youx365.com/shop-cert-3.png" />
				<text class="t1">上传身份证</text>
			</view>
			<view class="d-3">
				<input class="inputclass" type="idcard" placeholder="请输入身份证号码" placeholder-class="placeholder" />
			</view>
			<view class="d-3 uni-flex uni-row">
				<view class="flex-item">
					<img src='https://pic.youx365.com/shop-cert-5.png' class="id-img" />
				</view>
				<view class="flex-item">
					<img src='https://pic.youx365.com/shop-cert-5.png'  class="id-img" />
				</view>
			</view>
		</view>
		
		<view class="d-1">
			<view class="d-2">
				<img src="https://pic.youx365.com/shop-cert-4.png" />
				<text class="t1">营业执照上传</text>
			</view>
			<view class="d-3">
				<img src='https://pic.youx365.com/shop-cert-7.png' class="shopper-img" />
			</view>
		</view>
		
		<view class="d-1">
			<checkbox-group>
			    <label>
			        <checkbox class="ck3" value="cb" checked="true" /><text class="tit3">请勾选同意</text><text class="tit4">《开店协议》</text>
			    </label>
			</checkbox-group>
		</view>
		
		
		<view class="bt">
			提交申请
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
	
	.id-img{
		width: 340rpx;
		margin-top: 20rpx;
		height: 270rpx;
	}
	
	.shopper-img{
		width: 168rpx;
		height: 168rpx;
	}
	
	.container{
		background-color: #FFFFFF;
		padding-bottom: 50rpx;
		
		.d-1{
			width: 680rpx;
			margin: 0 auto;
			padding-top: 40rpx;
			
			.d-2{
				height: 80rpx;
				line-height: 80rpx;
				padding-left: 20rpx;
				
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
			
			.tit3{
				font-size:22rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(136,136,136,1);
				margin-left: 19rpx;
			}
			
			.tit4{
				font-size:22rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:#FF443F;
			}
			
			.ck3{
			  transform: scale(0.6,0.6);
			}
		}
		
		.bt{
			width:668rpx;
			height:88rpx;
			line-height: 88rpx;
			margin: 40rpx auto;
			background-color: #FF443F;
			text-align: center;
			font-size:30rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(255,255,255,1);
			border-radius: 6rpx;
		}
	}
	
</style>