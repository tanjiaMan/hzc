<template>
	<view class="container">
		<view class="d_item">
			<view class="d_left">新密码</view>
			<view class="d_right">
				<input v-model="pwd" type="number" password="true" placeholder="请输入6位数字密码" placeholder-class="placeholderClass" />
			</view>
		</view>
		<view class="d_item">
			<view class="d_left">确认密码</view>
			<view class="d_right">
				<input v-model="rePwd" type="number" password="true" placeholder="请再次输入密码" placeholder-class="placeholderClass" />
			</view>
		</view>
		<view class="d_bt" @click="submit">
			提交
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pwd:'',
				rePwd:'',
				mobile:'',
				verifycode:'',
			}
		},
		onLoad(option){
			this.mobile = option.mobile;
			this.verifycode = option.verifycode;
		},
		methods: {
			async submit(){
				if(this.pwd == null || this.pwd == ''){
					this.$api.msg('请输入新登录密码');
					return;
				}
				if(this.rePwd == null || this.rePwd == ''){
					this.$api.msg('请输入确定密码');
					return;
				}
				if(this.pwd != this.rePwd){
					this.$api.msg('两次输入的密码不一样');
					return;
				}
				if(this.pwd.length != 6){
					this.$api.msg('请输入6位数字密码');
					return;
				}
				let result = await this.$request.ModelUser.setPwd(this.pwd,this.mobile,this.verifycode);
				if(result.code == 'ok'){
					this.pwd = '';
					this.rePwd = '';
					this.$api.msg("设置密码成功");
					uni.navigateBack();
				}else{
					this.$api.msg(result.msg);
				}
			}
		}
	}
</script>

<style lang='scss'>
	
	page{
		background-color: #FFFFFF !important;
	}
	
	.d_item{
		display: flex;
		align-items: center;
		height: 102rpx;
		border-bottom: solid 1px #E5E5E5;
		
		.d_left{
			width: 260rpx;
			text-align: center;
			font-size:26rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(51,51,51,1);
		}
	}
	
	.placeholderClass{
		font-size:26rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(203,203,203,1);
	}
	
	.d_bt{
		width:608rpx;
		height:68rpx;
		line-height:68rpx;
		background:rgba(0,163,144,1);
		border-radius:4px;
		text-align: center;
		font-size:30rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(254,254,254,1);
		margin: 100rpx auto;
	}
</style>
