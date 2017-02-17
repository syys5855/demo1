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

class ImgComponent extends React.Component{
	constructor(props) {
	  super(props);
	  this.state = {};
	}
	render(){
		let styleObj={};
		if(this.props.layout){
			styleObj=this.props.layout;
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
		hPos:{
			
		},
		vPos:{

		}

	};
	/*
		@centerIndex:number 居中显示的图片;
	*/
	relayout(centerIndex){
		
	}	
	constructor(){
		super();
		this.state={
			name:"syys",
			imagesData:imagesData,
			imgsArrangerArr:[],
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
		
	}
    render() {
		
		let controllers=[],
			imgs=[];
	
	
		imagesData.forEach( function(imgObj,index) {
			// 初始化图片的位置
			if(!this.state.imgsArrangerArr[index]){
				this.state.imgsArrangerArr[index]={
					left:0,
					top:0
				}
			}
			imgs.push(<ImgComponent data={imgObj} ref={"ImgComponent"+index} key={"ImgComponent"+index} layout={this.relayout(index)}/>);
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