require('normalize.css/normalize.css');
// require('styles/App.css');
require('styles/stage.scss');


import React from 'react';

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
		return (
			<div className="stage-img">
				<img  src={this.props.data.imgUrl} alt={this.props.data.title}/>
				<div className="stage-img-title">
					{this.props.data.title}
				</div>
			</div>
		);
	}
}

class AppComponent extends React.Component {
	constructor(){
		super();
		this.state={
			name:"syys",
			imagesData:imagesData
		}
		
	}
    render() {
		
		let controllers=[],
			imgs=[];
		imagesData.forEach( function(imgObj,index) {
			imgs.push(<ImgComponent data={imgObj} ref={"ImgComponent"+index} key={"ImgComponent"+index}/>);
		});
		console.log(imgs);
        return ( 
        	<div className="stage">
				<div className="stage-imgs">
					{imgs}
				</div>
				<div className="stage-nav"></div>
        	</div>
        );
    }
}

AppComponent.defaultProps = {};

export default AppComponent;