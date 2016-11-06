import React from "react"

export default class Text extends React.Component{

	constructor(props){
		super(props)
	}

	render(){
		return(
			<div className="created_form_item">
  			<label htmlFor="line_connect_3">{this.props.title}</label>
  			<input type="text" id="line_connect_3"/>
  		</div>
		)
	}

}