<template>
	<view>
		图片地址：{{picUrl}}
		<button type="primary" @tap="uploadPic">chooseImg</button>
		视频地址: {{videoUrl}}
		<button type="primary" @tap="uploadVide">chooseVideo</button>
		<video v-if="videoUrl != null && videoUrl != '' " :src="videoUrl" controls></video>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				picUrl: '',
				videoUrl: '',
			}
		},
		methods: {
			uploadPic(){
				var that = this;
				uni.chooseImage({
					count:1,
					sizeType:['original'],
					success(res){
						console.log('res',res);
						if(res.errMsg != 'chooseImage:ok'){
							that.$api.msg(res.errMsg);
							return;
						}
						let file = res.tempFiles[0];
						console.log('file',file);
						let values = {fileType:'PIC_TXT',fileNames:file.path};
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
									that.picUrl = ossConfig.accessFile;
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
					}
				})
			},
			uploadVide(){
				var that = this;
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success:(res) => {
						console.log('video',res);
						if(res.errMsg != 'chooseVideo:ok'){
							that.$api.msg(res.errMsg);
							return;
						}
						//上传视频
						console.log('file',res);
						let values = {fileType:'VIDEO',fileNames:res.tempFilePath};
						that.$request.ModelCommons.getOssConfig(values).then(result => {
							console.log('ossconfig',result);
							let ossConfig = result.data[0];
							const uploadTask = uni.uploadFile({
								url: 'https://upload.qiniup.com',
								filePath:res.tempFilePath,
								name:'file',
								formData:{
									'key': ossConfig.fileName,
									'token': ossConfig.token
								},
								success:(uploadFile) => {
									that.videoUrl = ossConfig.accessFile;
									console.log('success',uploadFile);
								},
								fail:(e) => {
									console.log('fail',e);
								},
								complete:(result) => {
									console.log('complete',result);
								}
							});
							
							uploadTask.onProgressUpdate((res) => {
							    console.log('上传进度' + res.progress);
							    console.log('已经上传的数据长度' + res.totalBytesSent);
							    console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
							
							    // 测试条件，取消上传任务。
							    // if (res.progress > 50) {
							    //     uploadTask.abort();
							    // }
							});
							
						})
					}
				});
			}
		}
	}
</script>

<style>

</style>
