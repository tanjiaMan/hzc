<template>  
    <view class="container">
		<view class="d-1">
			<view class="d-2">
				<img src="https://pic.youx365.com/shop-cert-1.png" />
				<text class="t1">姓名</text>
			</view>
			<view class="d-3">
				<input v-model="shopcert.realName" class="inputclass" placeholder="请输入真实姓名" placeholder-class="placeholder" />
			</view>
		</view>
		
		<view class="d-1">
			<view class="d-2">
				<img src="https://pic.youx365.com/shop-cert-1.png" />
				<text class="t1">手机号码</text>
			</view>
			<view class="d-3">
				<input v-model="shopcert.contact" class="inputclass" type="number" placeholder="请输入手机号码" placeholder-class="placeholder" />
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
				<input v-model="shopcert.address" class="inputclass" placeholder="请输入详细地址" placeholder-class="placeholder" />
			</view>
		</view>
		
		<view class="d-1">
			<view class="d-2">
				<img src="https://pic.youx365.com/shop-cert-3.png" />
				<text class="t1">上传身份证</text>
			</view>
			<view class="d-3">
				<input v-model="shopcert.idCard" class="inputclass" type="idcard" placeholder="请输入身份证号码" placeholder-class="placeholder" />
			</view>
			<view class="d-3 uni-flex uni-row">
				<view class="flex-item">
					<img :src='imgCard1' class="id-img" @click="chooseImage(1)" />
				</view>
				<view class="flex-item">
					<img :src='imgCard2'  class="id-img" @click="chooseImage(2)" />
				</view>
			</view>
		</view>
		
		<view class="d-1">
			<view class="d-2">
				<img src="https://pic.youx365.com/shop-cert-4.png" />
				<text class="t1">营业执照上传</text>
			</view>
			<view class="d-3">
				<img v-if="imgCert ==null || imgCert =='' " src='https://pic.youx365.com/shop-cert-7.png' class="shopper-img" @click="chooseImage(3)" />
				<image v-else :src="imgCert" class="shopper-img1" mode="aspectFit" @click="chooseImage(3)" />
			</view>
		</view>
		
		<view class="d-1">
			<label @click="agreeXy">
			    <checkbox value="" :checked="agree" class="ck3" /><text class="tit3">请勾选同意</text><text class="tit4">《开店协议》</text>
			</label>
		</view>
		
		
		<view class="bt" @click="submit">
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
				agree: false,
				addressData:{
					
				},
				//城市选择
				themeColor: '#007AFF',
				cityPickerValueDefault: [0, 0, 1],
				imgCard1:"https://pic.youx365.com/shop-cert-11.png",
				imgCard2:"https://pic.youx365.com/shop-cert-10.png",
				imgCert:'',
				shopcert:{
					realName: '',
					contact: '',
					address: '',
					idCard: '',
					cardImgList: [],
					certImgList: []
				}
			}
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
			},
			submit(){
				console.log('this.agree',this.agree);
				if(this.agree == false){
					this.$api.msg('请先同意开店协议');
					return;
				}
				if(this.imgCard1 == 'https://pic.youx365.com/shop-cert-11.png'){
					this.$api.msg('请上传身份证正面');
					return;
				}
				if(this.imgCard2 == 'https://pic.youx365.com/shop-cert-10.png'){
					this.$api.msg('请上传身份证反面');
					return;
				}
				if(this.imgCert == ''){
					this.$api.msg('请上传营业执照');
					return
				}
				if(!this.addressData.areaName){
					this.$api.msg('请选择所在地域');
					return;
				}
				this.shopcert.address = this.addressData.provinceName + '' + this.addressData.cityName + this.addressData.areaName + this.shopcert.address;
				this.shopcert.cardImgList.push(this.imgCard1);
				this.shopcert.cardImgList.push(this.imgCard2);
				this.shopcert.certImgList.push(this.imgCert);
				this.$request.ModelUser.applyShop(this.shopcert).then(result => {
					if(result == '' || result.code == 'ok'){
						this.$api.msg('申请成功,审核中!');
						this.shopcert = {
							realName: '',
							contact: '',
							address: '',
							idCard: '',
							cardImgList: [],
							certImgList: []
						};
						this.agree = false;
						this.addressData = {};
						this.imgCard1="https://pic.youx365.com/shop-cert-11.png";
						this.imgCard2="https://pic.youx365.com/shop-cert-10.png";
						this.imgCert='';
					}else{
						this.$api.msg(result.msg);
					}
				})
			},
			agreeXy(e){
				this.agree = !this.agree;
			},
			chooseImage(type){
				var that = this;
				uni.chooseImage({
				    sizeType:['original'],
				    count: 1,
				    success: (res) => {
						if(res.errMsg != 'chooseImage:ok'){
							that.$api.msg(res.errMsg);
							return;
						}
						res.tempFiles.forEach(file => {
							let filename = file.path;
							if(filename.indexOf('.') == -1){ //TODO
								filename =  filename + '.png';
							}
							let values = {fileType:'PIC_TXT',fileNames:filename};
							that.$request.ModelCommons.getOssConfig(values).then(result => {
								console.log('ossconfig',result);
								let ossConfig = result.data[0];
								uni.uploadFile({
									url: 'https://upload.qiniup.com',
									filePath:file.path,
									name:'file',
									formData:{
										'key': ossConfig.fileName,
										'token': ossConfig.token
									},
									success:(uploadFile) => {
										if(type == 1){
											that.imgCard1 = ossConfig.accessFile;
										}else if(type == 2){
											that.imgCard2 = ossConfig.accessFile;
										}else if(type==3){
											that.imgCert = ossConfig.accessFile;
										}
										console.log('success',uploadFile);
									},
									fail:(e) => {
										console.log('fail',e);
									},
									complete:(result) => {
										console.log('complete',result);
									}
								});
							})
						});
				    },
				    fail: (err) => {
				        this.$api.msg('失败');
				    }
				})
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
		margin-left: -20rpx;
	}
	
	.inputclass{
		font-size:26rpx;
		height: 73rpx;
		border: solid 1px rgba(238,238,238,1);
		border-radius:10rpx;
		padding-left: 20rpx;
	}
	
	.id-img{
		width: 308rpx;
		margin-top: 20rpx;
		height: 250rpx;
		margin-left: 20rpx;
	}
	
	.shopper-img{
		width: 168rpx;
		height: 168rpx;
	}
	
	.shopper-img1{
		width: 200rpx;
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