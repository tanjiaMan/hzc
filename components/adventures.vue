<template>
	<view class="adventures">
		<view class="tit1">
			<text>恭喜您获得</text>
			<text style="color: #FF443F !important;">{{chishu}}</text>
			<text>次抽奖机会</text>
		</view>
		
		<view class="main">
			<view class="canvas-container">
			    <view :animation="animationData" class="canvas-content" >  
			        <view class="canvas-line">  
			            <view class="canvas-litem" v-for="(item,index1) in awardsList" :key="index1" :style="[{transform:'rotate('+item.lineTurn+')'}]"></view>  
			        </view>  
					
			        <view class="canvas-list">  
			            <view class="canvas-item" v-for="(iteml,index2) in awardsList" :key="index2">  
			                <view class="canvas-item-text" :style="[{transform:'rotate('+iteml.turn+')'}]">  
			                    <text>{{iteml.award}}</text>  
			                    <image class="canvas-item-text-img" src="../../static/icon/huodong.png"></image>  
			                </view>  
			            </view>  
			        </view>  
			    </view>  
			    <view @tap="playReward" class="canvas-btn" v-bind:class="btnDisabled"></view>
			</view>  
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				awardsConfig : {
				    chance: true,  
				    awards: [  
				        { index: 0, name: '10元红包',type:0},  
				        { index: 1, name: '谢谢参与',type:1},  
				        { index: 2, name: '50元红包',type:0},  
				        { index: 3, name: '谢谢参与',type:1},  
				        { index: 4, name: '100元话费',type:0},  
				        { index: 5, name: '谢谢参与',type:1},  
				        { index: 6, name: '20元红包',type:0},  
				        { index: 7, name: '谢谢参与',type:1}  
				    ]  
				},  
				awardsList: {},  
				animationData: {},  
				btnDisabled: '',  
				chishu:2  
			};
		},
		props:{
			
		},
		created() {
			this.drawAwardRoundel();  
		},
		methods:{
			//画抽奖圆盘  
			drawAwardRoundel: function () {               
			    var awards = this.awardsConfig.awards;  
			    var awardsList = [];  
			    var turnNum = 1 / awards.length*360;  // 文字旋转 turn 值  
			
			    // 奖项列表  
			    for (var i = 0; i < awards.length; i++) {  
			        awardsList.push({ turn: i * turnNum + 'deg', lineTurn: i * turnNum + turnNum / 2 + 'deg', award: awards[i].name });  
			    }  
			
			    this.btnDisabled = this.awardsConfig.chance ? '' : 'disabled';
			    this.awardsList = awardsList;  
			},  
			
			//发起抽奖  
			playReward: function () {  
			    if (this.chishu == 0) {  
			        uni.showToast({  
			            title:'抽奖次数已经用完',  
			            icon:'none'  
			        })  
			        return  
			    }  
			    //中奖index  
			    var awardsNum = this.awardsConfig.awards;  
			    var awardIndex = Math.round(Math.random()*(awardsNum.length-1));//随机数
			    var runNum = 8;//旋转8周  
			    var duration = 4000;//时长  
			
			    // 旋转角度  
			    this.runDeg = this.runDeg || 0;  
			    this.runDeg = this.runDeg + (360 - this.runDeg % 360) + (360 * runNum - awardIndex * (360 / awardsNum.length))  
			    //创建动画  
			    var animationRun = uni.createAnimation({  
			        duration: duration,  
			         timingFunction: 'ease'  
			    })  
			    animationRun.rotate(this.runDeg).step();  
			    this.animationData= animationRun.export();  
			    this.btnDisabled= 'disabled';  
			
			    // 中奖提示  
			    var awardsConfig = this.awardsConfig;  
			    var awardType = awardsConfig.awards[awardIndex].type;     
			    this.chishu = this.chishu - 1;  
			    if (awardType == 0) {  
			        setTimeout(function () {  
			            uni.showModal({  
			                title: '恭喜',  
			                content: '获得' + (awardsConfig.awards[awardIndex].name),  
			                showCancel: false  
			            });  
			            this.btnDisabled= '';                              
			        }.bind(this), duration);  
			    }else{  
			        setTimeout(function () {  
			            uni.showModal({  
			                title: '很遗憾',  
			                content: '没中奖 ' + (awardsConfig.awards[awardIndex].name),  
			                showCancel: false  
			            });  
			             this.btnDisabled= '';  
			        }.bind(this), duration);  
			    }  
			
			}  
		}
	}
</script>

<style lang='scss'>
	page {  
	  background: #fff;  
	}
	
	.adventures{
		width: 100%;
		text-align: center;
		
		.tit1{
			font-size:26rpx;
			font-family:SourceHanSansCN;
			font-weight:400;
			color:rgba(152,152,152,1);
			margin-top: 20rpx;
			margin-bottom: 40rpx;
		}
		
		.header{  
		    display: flex;  
		    flex-direction: column;  
		    align-items: center;  
		    justify-content: center;  
		    height: 100upx;  
		}  
		/* 转盘 */  
		.main{
			background-image: url('https://pic.youx365.com/dazhuanpan-bg.png');
			width: 720rpx;
			height: 846rpx;
			margin: 0 auto;
			background-size: cover;
			padding-top: 162rpx;
			padding-left: 22rpx;
		}
		.canvas-container {  
		  margin: 0 auto;  
		  position: relative;  
		  width: 480rpx;  
		  height: 480rpx;  
		  border-radius: 50%;  
		  box-shadow: 0 1/* 0upx 30upx #333, 0 0 10upx #000;  
		  border: 10rpx solid #A83FDB;  */
		}  
		.canvas-content {  
		  position: absolute;  
		  left: 0;  
		  top: 0;  
		  z-index: 1;  
		  display: block;  
		  width: 480rpx;  
		  height:480rpx;  
		  border-radius: inherit;  
		  background-clip: padding-box;  
		  background-color: #EFD691;
		}  
		.canvas-element {  
		  position: relative;  
		  z-index: 1;  
		  width: inherit;  
		  height: inherit;  
		  border-radius: 50%;  
		}  
		.canvas-list {  
		  position: absolute;  
		  left: 0;  
		  top: 0;  
		  width: inherit;  
		  height: inherit;  
		  z-index: 9999;  
		}  
		.canvas-item {  
		  position: absolute;  
		  left: 0;  
		  top: 0;  
		  width: 100%;  
		  height: 100%;  
		  color: #e4370e;  
		  font-weight: bold;  
		  text-shadow: 0 1upx 1upx rgba(255, 255, 255, 0.6);  
		}  
		.canvas-item-text {  
		  position: relative;  
		  display: block;  
		  padding-top: 20upx;  
		  margin: 0 auto;  
		  text-align: center;  
		  -webkit-transform-origin: 50% 240rpx;  
		  transform-origin: 50% 240rpx;  
		  display: flex;  
		  flex-direction: column;  
		  align-items: center;  
		}  
		.canvas-item-text text{  
		    font-size:30upx;  
		}  
		.canvas-item-text-img{  
		    width:60upx;  
		    height:60upx;  
		    padding-top:10upx;  
		}  
		
		/* 分隔线 */  
		.canvas-line {  
		  position: absolute;  
		  left: 0;  
		  top: 0;  
		  width: inherit;  
		  height: inherit;  
		  z-index: 99;  
		}  
		.canvas-litem {  
		  position: absolute;  
		  left: 240rpx;  
		  top: 0;  
		  width: 3upx;  
		  height: 240rpx;  
		  background-color: rgba(228, 55, 14, 0.4);  
		  overflow: hidden;  
		  -webkit-transform-origin: 50% 240rpx;  
		  transform-origin: 50% 240rpx;  
		}  
		
		/**  
		* 抽奖按钮  
		*/  
		.canvas-btn {  
		  position: absolute;  
		  left: 128rpx;  
		  top: 114rpx;  
		  z-index: 400;  
		  width: 225rpx;  
		  height: 253rpx;  
		  /* border-radius: 50%;  */
		  /* color: #f4e9cc;  */
		  /* background-color: #e44025; */
		  /* line-height: 80rpx;  */
		  /* text-align: center;  */
		  /* font-size: 26rpx;  */
		  /* text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.6);  */
		  /* box-shadow: 0 3px 5px rgba(0, 0, 0, 0.6);  */
		  /* text-decoration: none; */
		  
		  background: url('https://pic.youx365.com/dazhuanpan-bt.png');
		  background-size: cover;
		}  
		/* .canvas-btn::after {  
		  position: absolute;  
		  display: block;  
		  content: ' ';  
		  left: 12upx;  
		  top: -44upx;  
		  width: 0;  
		  height: 0;  
		  overflow: hidden;  
		  border-width:30upx;  
		  border-style: solid;  
		  border-color: transparent;  
		  border-bottom-color: #e44025;  
		}  */
		.canvas-btn.disabled {  
		  pointer-events: none;  
		  /* background: #b07a7b;  
		  color: #ccc;  */
		  background: url('https://pic.youx365.com/dazhuanpan-bt.png');
		  background-size: cover;
		  filter: contrast(0.5);
		}  
		/* .canvas-btn.disabled::after {  
		  border-bottom-color: #b07a7b;  
		}  */
		.canvas-btn-table{  
		    color:#A83FDB;  
		    width:120upx;  
		    text-align: center;  
		    position: absolute;  
		    left: 240upx;  
		    top:360upx;  
		    font-size:26upx;  
		    background-color: #FFFFFF;  
		    opacity: 0.9;  
		}
	}
</style>
