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
				uni.chooseImage({
					count:1,
					sizeType:['original'],
					success(res){
						console.log('res',res);
					}
				})
			}
		}
	}
</script>

<style>

</style>
