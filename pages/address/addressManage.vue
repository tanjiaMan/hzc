<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">联系人</text>
			<input class="input" type="text" v-model="addressData.linkName" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号码</text>
			<input class="input" type="number" v-model="addressData.linkMobile" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">所在区域</text>
			<text @click="chooseAddress" class="input" v-if="addressData.areaName">
				{{addressData.provinceName}} {{addressData.cityName}} {{addressData.areaName}}
			</text>
			<text v-else @click="chooseAddress" class="input" style="color: #FF443F;">
				请选择所在区域
			</text>
		</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onConfirm="onConfirm"></mpvue-city-picker>
		
		<view class="row b-b"> 
			<text class="tit">详细地址</text>
			<!-- <input class="input" type="text" v-model="addressData.address" placeholder="楼号、门牌" placeholder-class="placeholder" /> -->
			 <textarea placeholder="楼号、门牌"  v-model="addressData.address" placeholder-class="placeholder" style="height: 60px;" />
		</view>
		<view class="row b-b">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.useDefault == 1" color="#FF443F" @change="switchChange" />
		</view>
		<button class="add-btn" @click="confirm">保存</button>
		<button class="del-btn" @click="delAddress" v-if="addressData.id">删除</button>
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
		data() {
			return {
				addressData: {
					linkName: '',
					linkMobile: '',
					address: '',
					adCode:'',
					useDefault: 0,
				},
				//城市选择
				themeColor: '#007AFF',
				cityPickerValueDefault: [0, 0, 1],
			}
		},
		async onLoad(option){
			let id = option.id;
			let title = '新增收货地址';
			if(id){
				title = '编辑收货地址'
				let address = await this.$request.ModelOrder.infoAddress(id);
				if(address.id){
					let data = {
						id: address.id,
						linkName: address.linkName,
						linkMobile: address.linkMobile,
						address: address.address,
						adCode:address.adCode,
						useDefault: address.useDefault,
						provinceName: address.provinceName,
						cityName: address.cityName,
						areaName: address.areaName
					}
					
					this.addressData = data;
					//查找地区索引
					let proIndex = provinceData.findIndex(value => value.value == address.provCode/10000);
					let cityIndex = cityData[proIndex].findIndex(value => value.value == address.cityCode/100);
					let adIndex = areaData[proIndex][cityIndex].findIndex(value => value.value == address.adCode);
					this.cityPickerValueDefault = [proIndex,cityIndex,adIndex];
					console.log(this.cityPickerValueDefault);
				}else{
					this.$api.msg('查询地址错误');
				}
			}
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			switchChange(e){
				this.addressData.useDefault = e.detail.value == false?0:1;
			},

			//提交
			async confirm(){
				let data = this.addressData;
				if(!data.linkName){
					this.$api.msg('请填写收货人姓名');
					return;
				}
				if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.linkMobile)){
					this.$api.msg('请输入正确的手机号码');
					return;
				}
				if(!data.adCode){
					this.$api.msg('请选择所在区域');
					return;
				}
				if(!data.address){
					this.$api.msg('请填写门牌号信息');
					return;
				}
				
				this.$api.msg(`保存成功`);
				
				let result = await this.$request.ModelOrder.addOrUpdateAddress(data);
				if(result.code == 'ok'){
					setTimeout(()=>{
						uni.navigateBack()
					}, 800)
				}else{
					this.$api.msg('保存失败');
				}
			},
			async delAddress(){
				uni.showModal({
				    title: '提示',
				    content: '确定删除吗？',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
				
				// let id = this.addressData.id;
				// let result = await this.$request.ModelOrder.delAddress(id);
				// if(result.code == 'ok'){
				// 	setTimeout(()=>{
				// 		uni.navigateBack()
				// 	}, 800)
				// }else{
				// 	this.$api.msg('保存失败');
				// }
			},
			chooseAddress(){
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.addressData.adCode = e.cityCode;
				let addr = e.label.split('-');
				this.addressData.provinceName = addr[0];
				this.addressData.cityName = addr[1];
				this.addressData.areaName = addr[2];
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 20rpx;
		min-height: 110upx;
		background: #fff;
		
		.tit{
			flex-shrink: 0;
			width: 140rpx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
			color: $font-color-light;
		}
	}
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
	}
	.add-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: #00A390;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(0, 163, 144, 0.49);
	}
	
	.del-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: #FF443F;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
