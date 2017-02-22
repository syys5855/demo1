require("../styles/Test.scss");
import React from 'react';
class Test extends React.Component{
	constructor(props) {
	  super(props);	
	}
	render(){
		return (
			<div className='test'>
				<h1>Hello Iam H1</h1>
				<h2>iam H2</h2>				
			</div>
		);
	}
}
export {Test as default}