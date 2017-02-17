require('normalize.css/normalize.css');
// require('styles/App.css');
require('styles/stage.scss');


import React from 'react';
import ControllreComponent from './Controller';
var ReactDOM =require('react-dom');
// let yeomanImage = require('../images/yeoman.png');
let imagesData = require("../../data/imagesData.json");
imagesData=(function(imgsArr){
	imgsArr.forEach(function(imgObj,index){
		imgObj.imgUrl=require("../images/"+imgObj.fileName);//获取url
	});
	return imgsArr;

})(imagesData);

// 获取范围的随机数
function random(low,high){
	return Math.ceil(Math.random()*(high-low)+low);
}

class ImgComponent extends React.Component{
	constructor() {
	  super();
	}
	render(){
		var styleObj={left:0,top:0};
		if(this.props.layout.pos){
			styleObj=this.props.layout.pos;
		}
		return (
			<div className="stage-img" style={styleObj}>
				<img  src={this.props.data.imgUrl} alt={this.props.data.title} />
				<div className="stage-img-title">
					{this.props.data.title}
				</div>
			</div>
		);
	}
}



class AppComponent extends React.Component {
	// 图片的坐标信息
	static Constant={
		centerPos:{
			left:0,
			top:0
		},
		// 水平坐标
		// left: 左边区域
		// right:右边区域
		hPosRange:{
			left:{
				// left:[0,0]
				// top:[0,0]
			},
			right:{
				// left:[0,0]
				// top:[0,0]
			}
		},
		// 垂直坐标
		// top:   顶部区域
		// bottom:底部区域
		vPosRange:{
			top:{
				// left:[0,0]
				// top:[0,0]
			},
			bottom:{
				// left:[0,0]
				// top:[0,0]
			}
		}

	};
	/*
		@centerIndex:number 居中显示的图片;
	*/
	relayout(centerIndex){
		var imgsArrangerArr=this.state.imgsArrangerArr,
			Constant=AppComponent.Constant,
			centerPos=Constant.centerPos,
			hPosRange=Constant.hPosRange,
			vPosRange=Constant.vPosRange;

		
		
		var _imgs = imgsArrangerArr.splice(centerIndex);
		imgsArrangerArr[0].pos=centerPos;
		_imgs.forEach(function(value,index){
			if(index%2===0){
				value.pos.left=random(hPosRange.left.left[0],hPosRange.left.left[1]);
				value.pos.top=random(hPosRange.left.top[0],hPosRange.left.top[1]);
			}
			else{
				value.pos.left=random(hPosRange.right.left[0],hPosRange.right.left[1]);
				value.pos.top=random(hPosRange.right.top[0],hPosRange.right.top[1]);
			}	
		});

		_imgs.splice(centerIndex-1, 0,imgsArrangerArr[0])
		this.setState({
			imgsArrangerArr: _imgs
		});
	}	
	constructor(){
		super();
		this.state={
			name:"syys",
			imagesData:imagesData,
			imgsArrangerArr:[]
		}
	}
	componentDidMount(){
		// 获取图片的大小
		let imgE = ReactDOM.findDOMNode(this.refs.ImgComponent0),
			imgH=imgE.scrollHeight,
			imgW=imgE.scrollWidth,
			imgHalfH=Math.ceil(imgH/2),
			imgHalfW=Math.ceil(imgW/2),
			Constant=AppComponent.Constant;

		//获取stage的大小
		let stageE=ReactDOM.findDOMNode(this.refs.stage),
			stageH=stageE.scrollHeight,
			stageW=stageE.scrollWidth,
			stageHalfW=Math.ceil(stageW/2),
			stageHalfH=Math.ceil(stageH/2);

		// 计算中心点的位置
		Constant.centerPos.left=Math.ceil(stageHalfW-imgHalfW);
		Constant.centerPos.top=Math.ceil(stageHalfH-imgHalfH);
		
		// 计算左边区域的位置
		Constant.hPosRange.left.left=[Math.ceil(-imgHalfW),Math.ceil(stageHalfW-imgHalfW)];
		Constant.hPosRange.left.top=[Math.ceil(-imgHalfH),Math.ceil(stageHalfH+imgHalfH)];
	
		// 计算右边区域的位置
		Constant.hPosRange.right.left=[Math.ceil(stageHalfW+imgHalfW),Math.ceil(stageW+imgHalfW)];
		Constant.hPosRange.right.top=[Math.ceil(-imgHalfH),Math.ceil(stageHalfH+imgHalfH)];

		// 计算顶部的区域位置
		Constant.vPosRange.top.left=[Math.ceil(stageHalfW-imgHalfW),Math.ceil(stageHalfW+imgHalfW)];
		Constant.vPosRange.top.top=[Math.ceil(-imgHalfH),Math.ceil(stageHalfH-imgHalfH)];

		// 计算顶部的区域位置
		Constant.vPosRange.bottom.left=[Math.ceil(stageHalfW-imgHalfW),Math.ceil(stageHalfW+imgHalfW)];
		Constant.vPosRange.bottom.top=[Math.ceil(stageHalfH+imgHalfH),Math.ceil(stageH+imgHalfH)];

		this.relayout(1);
	}
    render() {
		
		let controllers=[],
			imgs=[];
	
	
		imagesData.forEach( function(imgObj,index) {
			// 初始化图片的位置
			if(!this.state.imgsArrangerArr[index]){
				this.state.imgsArrangerArr[index]={
					pos:{
						left:0,
						top:0
					}
				}
			}
			imgs.push(<ImgComponent data={imgObj} ref={"ImgComponent"+index} key={"ImgComponent"+index}
				layout={this.state.imgsArrangerArr[index]}/>);
			controllers.push(<ControllreComponent key={"ControllreComponent"+index}/>);
		}.bind(this));

        return ( 
        	<div ref="stage" className="stage">
				<div className="stage-imgs">
					{imgs}
				</div>
				<div className="stage-nav">
					{controllers}
				</div>
        	</div>
        );
    }
}

AppComponent.defaultProps = {};

export default AppComponent;