<template>
	<view class="container">
		<view class="header">
			评价：
		</view>
		<view class="line"></view>
		<view class="uni-flex uni-row v-star">
		    <view class="flex-item">
				<img v-for="(item,index) in starNum" class="img" :key="index" @click="chooseRate(index)"
				:src="(rate > index) ? 'https://pic.youx365.com/comment-star.png':'https://pic.youx365.com/comment-ustar.png'" />
			</view>
		</view>
		<view class="v-bt">
			<view :class="item.active == true? 'btc btactive':'btc'" v-for="(item,index) in rateDesc" :key="index" @click="chooseDesc(index)">
				{{item.desc}}
			</view>
		</view>
		<view class="v-comment">
			 <textarea class="texta" placeholder="说点什么吧" placeholder-class="pla" />
			 <view class="titdesc">
				 不低于15字，评价可得积分
			 </view>
		</view>
		<view class="uni-uploader-body">
		    <view class="uni-uploader__files">
		        <block v-for="(image,index) in imageList" :key="index">
		            <view class="uni-uploader__file">
		                <image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
						<view class="d-imgdel">
							<img class="imgdel" @click="deleteimg(index)" src="https://pic.youx365.com/comment-delete.png" />
						</view>
		            </view>
		        </block>
		        <view class="uni-uploader__input-box" v-if="imgSize > imageList.length ">
		            <view class="uni-uploader__input" @tap="chooseImage"></view>
		        </view>
		    </view>
		</view>
		<view class="btsub">
			提交
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				starNum:[{},{},{},{},{}],
				rate:4,
				rateDesc:[
					{id:0,desc:'质量好',active:true},
					{id:1,desc:'物流快',active:false},
					{id:2,desc:'服务号',active:false},
				],
				
				//图片
				imgSize: 3,
				imageList:[],
			}
		},
		methods: {
			chooseRate(value){
				this.rate = value + 1;
			},
			chooseDesc(index){
				this.rateDesc[index].active = !this.rateDesc[index].active;
			},
			//图片上传
			deleteimg(index){
				this.imageList.splice(index,1);
			},
			chooseImage: async function() {
			    if (this.imageList.length >= this.imgSize) {
			        return;
			    }
				var that = this;
			    uni.chooseImage({
			        sizeType:['original'],
			        count: this.imgSize - this.imageList.length,
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
										that.imageList.push(ossConfig.accessFile);
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
			},
			previewImage: function(e) {
			    var current = e.target.dataset.src
			    uni.previewImage({
			        current: current,
			        urls: this.imageList
			    })
			},
		}
	}
</script>

<style lang='scss'>
	.container{
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
		
		.header{
			height: 100rpx;
			line-height: 100rpx;
			font-size:28rpx;
			font-family:SourceHanSansCN;
			font-weight:500;
			color:rgba(0,0,0,1);
			margin-left: 57rpx;
		}
		.line{
			width:750px;
			height:1px;
			background:rgba(225,225,225,1);
			opacity:0.41;
		}
		
		.v-star{
			margin-left: 95rpx;
			margin-top: 38rpx;
			margin-bottom: 12rpx;
			
			.img{
				width: 48rpx;
				height: 48rpx;
				margin-left: 55rpx;
			}
		}
		
		.v-bt{
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
			
			.btc{
				text-align: center;
				height: 52rpx;
				line-height: 52rpx;
				padding: 0 40rpx 0 40rpx;
				border-radius:50rpx;
				background:rgba(234,234,234,1);
				font-size:24rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(0,0,0,1);
				margin: 40rpx 20rpx 0 20rpx;
			}
			
			.btactive{
				background: #00A390 !important;
				color:rgba(255,255,255,1) !important;
			}
		}
		
		.v-comment{
			width: 636rpx;
			height: 300rpx;
			margin: 54rpx auto;
			border-radius: 10rpx;
			border: solid 1px #E1E1E1;
			padding: 20rpx;
			font-size:24rpx;
			
			.pla{
				font-size:22rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(168,168,168,1);
			}
			
			/deep/ .pla{
				font-size:22rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(168,168,168,1);
			}
			
			.texta{
				height: 220rpx;
			}
			
			.titdesc{
				font-size:22rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(168,168,168,1);
				text-align: right;
			}
		}
	
		.uni-uploader__files{
			padding-left: 32rpx;
			
			.uni-uploader__file{
				position: relative;
			}
			
			.d-imgdel{
				position: absolute;
				top: 0;
				right: 0;
				margin: -20rpx -20rpx 0 0;
				
				.imgdel{
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	
		.btsub{
			font-size:34rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(255,255,255,1);
			text-align: center;
			width: 644rpx;
			height: 92rpx;
			line-height: 92rpx;
			margin: 71rpx auto 0;
			background-color: #FF443F;
			border-radius: 8rpx;
		}
	}
</style>
