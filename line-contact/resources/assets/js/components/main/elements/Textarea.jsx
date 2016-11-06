import React from "react"

export default class Textarea extends React.Component{

	render(){
		return(
			<div className="created_form_item">
  			<label htmlFor="line_connect_1">hoge</label>
  			<textarea rows="4" cols="40" name="line_connect_1" id="line_connect_1"></textarea>
  		</div>
		)
	}

}