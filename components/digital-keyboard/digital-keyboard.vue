<template>
	<view :class="['digital-keyboard',{'keyboard-show':!keyBoardSwitch}]" @tap.stop="">
		<view class="list" :hover-start-time='0' 
		@tap.stop="setKey(key)" hover-class="key-hove" 
		v-for="(key,index) in data" :key='index'>{{key=='.'&&!decimalPoint?'':key}}</view>
	</view>
</template>

<script>
	export default{
		props:['keyBoardSwitch','decimalPoint'],
		data(){
			return{
				data:[1,2,3,4,5,6,7,8,9,'.',0,''],
				value:'',
			}
		},
		methods:{
			setKey(k){
				if(k==='.'&&!this.decimalPoint){
					return;
				}
				k===''?this.value=this.value.substring(0,this.value.length-1):this.value+=k.toString();
				this.$emit('change',k)
			},
		},
		watch:{
			keyBoardSwitch:function(){
				if(!this.keyBoardSwitch)this.$emit('closeKeyboard',this.value);
			}
		}
	}
</script>

<style lang="scss">
	.digital-keyboard{
		// width: 100vw;
		// position: fixed;
		// bottom: 0;
		// overflow: hidden;
		// border-top: 1px solid #c8c8c8;
		// box-sizing: border-box;
		margin-top: 30rpx;
		
		.list{
			width: 33.3%;
			height: 80upx;
			line-height: 80upx;
			box-sizing: border-box;
			float: left;
			text-align: center;
			font-size: 24px;
			border-left:1px solid #D2D2D2;
			border-bottom: 1px solid #D2D2D2;
			background: #fff;
			&:nth-child(3n){
				border-right: 1px solid #D2D2D2;
			}
			&:last-child{
				position: relative;
				&:before{
					content: '';
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%,-50%);
					width: 50upx;
					height: 50upx;
					background: url('data:image/png;base64,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')no-repeat;
					background-size: 100% 100%;
				}
			}
		}
		.key-hove{
			font-size: 30px;
		}
	}
	.keyboard-show{
		height: 0;
	}
</style>
