import React from "react"
import $ from "jquery"

import AppActions from "../../actions/AppActions.js"

export default class EditView extends React.Component{

	constructor(props){
		super(props)
	}

	render(){
		return(
			<div className="mdl-grid" id="edit-view">
			  <div className="mdl-cell mdl-cell--2-col">
			  	<h1 className="title">Hoge</h1>
			  </div>
			  <div className="mdl-cell mdl-cell--10-col editViewArea">

			  	<div className="formView">
			  		<div className="mdl-card mdl-shadow--2dp add-form-button">
						  <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" onClick={this._addForm}>
							  <i className="material-icons">add</i>
							</button>
						</div>
						<ul className="form-variation">

							<li className="form-item" onClick={this._hoge}>
								<p>テキスト（一行）</p>
								<img src="/images/inline_text.png"/>
							</li>
							<li className="form-item" onClick={this._hoge}>
								<p>テキスト（一行）</p>
								<img src="/images/inline_text.png"/>
							</li>
							<li className="form-item" onClick={this._hoge}>
								<p>テキスト（一行）</p>
								<img src="/images/inline_text.png"/>
							</li>
						
						</ul>
			  	</div>

			  </div>
			</div>
		)
	}

	_addForm = () => {
		$(".form-variation").css("display","flex")
	}

	_hoge = () => {
		$(".form-variation").fadeOut('slow')
	}

}