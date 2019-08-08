<template>
	<view>
		<button type="primary" @tap="upload">chooseImg</button>
	</view>
</template>

<script>
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
							console.log('ossconfig',resut);
						})
					}
				})
			}
		}
	}
</script>

<style>

</style>
