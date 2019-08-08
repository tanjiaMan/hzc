<template>
	<view>
		<button type="primary" @tap="upload">chooseImg</button>
	</view>
</template>

<script>
	
	import * as qiniu from 'qiniu-js'
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			upload(){
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
							console.log('ossConfig',ossConfig.token);
							uni.uploadFile({
								url: 'https://upload.qiniup.com',
								filePath:file.path,
								name:'file',
								formData:{
									'key': ossConfig.fileName,
									'token': ossConfig.token
								},
								success:(uploadFile) => {
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
			}
		}
	}
</script>

<style>

</style>
