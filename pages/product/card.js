
    export default class LastMayday {
      palette(conver,name,originPrice,price) {
        return (
{
  "width": "620rpx",
  "height": "683rpx",
  "background": "",
  "views": [
    {
      "type": "image",
      "url": conver,
      "css": {
        "width": "620rpx",
        "height": "484rpx",
        "top": "0px",
        "left": "0px",
        "rotate": "0",
        "borderRadius": "0",
        "borderWidth": "",
        "borderColor": "",
        "shadow": "",
        "mode": "scaleToFill"
      }
    },
    {
      "type": "text",
      "text": name,
      "css": {
        "color": "#282B35",
        "background": "rgba(0,0,0,0)",
        "width": "329rpx",
        "height": "87rpx",
        "top": "507rpx",
        "left": "26rpx",
        "rotate": "0",
        "borderRadius": "",
        "borderWidth": "",
        "borderColor": "#000000",
        "shadow": "",
        "padding": "0px",
        "fontSize": "30rpx",
        "fontWeight": "normal",
        "maxLines": "2",
        "lineHeight": "43rpx",
        "textStyle": "fill",
        "textDecoration": "none",
        "fontFamily": "",
        "textAlign": "left"
      }
    },
    {
      "type": "text",
      "text": "￥"+price,
      "css": {
        "color": "#FF443F",
        "background": "rgba(0,0,0,0)",
        "width": "300rpx",
        "height": "46rpx",
        "top": "613rpx",
        "left": "32rpx",
        "rotate": "0",
        "borderRadius": "",
        "borderWidth": "",
        "borderColor": "#000000",
        "shadow": "",
        "padding": "0px",
        "fontSize": "32rpx",
        "fontWeight": "normal",
        "maxLines": "2",
        "lineHeight": "46rpx",
        "textStyle": "fill",
        "textDecoration": "none",
        "fontFamily": "",
        "textAlign": "left"
      }
    },
    {
      "type": "image",
      "url": "https://pic.youx365.com/wx-qrcode.jpg",
      "css": {
        "width": "180rpx",
        "height": "190rpx",
        "top": "484rpx",
        "left": "410rpx",
        "rotate": "0",
        "borderRadius": "",
        "borderWidth": "",
        "borderColor": "#000000",
        "shadow": "",
        "mode": "scaleToFill"
      }
    },
    {
      "type": "text",
      "text": "￥"+originPrice,
      "css": {
        "color": "#9D9D9D",
        "background": "rgba(0,0,0,0)",
        "width": "200rpx",
        "height": "29rpx",
        "top": "625rpx",
        "left": "186rpx",
        "rotate": "0",
        "borderRadius": "",
        "borderWidth": "",
        "borderColor": "#000000",
        "shadow": "",
        "padding": "0px",
        "fontSize": "20rpx",
        "fontWeight": "normal",
        "maxLines": "2",
        "lineHeight": "29rpx",
        "textStyle": "fill",
        "textDecoration": "line-through",
        "fontFamily": "",
        "textAlign": "left"
      }
    }
  ]
}
        );
      }
    }
    