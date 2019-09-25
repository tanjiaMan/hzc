<template>  
    <view>
		<user-normal></user-normal>
		<!-- <user-vip></user-vip> -->
	</view>  
</template>  
<script>
	
	import userNormal from "./userNormal.vue";
	import userVip from "./userVip.vue";
	
    export default {
		components: {
			userNormal,userVip
		},
		data(){
			return {
				
			}
		},
		onLoad(){
		},
        computed: {
			
		},
        methods: {
			
        }  
    }  
</script>  
<style lang='scss'>
	
</style>