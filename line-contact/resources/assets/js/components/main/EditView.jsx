import React from "react"
import $ from "jquery"

import AppActions from "../../actions/AppActions.js"

import Text from "./elements/Text.jsx"
import Textarea from "./elements/Textarea.jsx"
import Submit from "./elements/Submit.jsx"

var doms = []

export default class EditView extends React.Component{

	constructor(props){
		super(props)
	}

	componentWillMount(){
		this._generate_form()
	}

	componentWillReceiveProps(){
		this._generate_form()
	}

	_generate_form(){

		console.log(this.props.allFormData)

		doms = []

		this.props.allFormData.map((item)=>{

			switch(item.type){

				case "text":
					doms.push(<Text key={item.id}/>)
					break;

				case "textarea":
					doms.push(<Textarea key={item.id}/>)
					break;

				case "radio":
					doms.push("3")
					break;

				case "checkbox":
					doms.push("4")
					break;

				case "submit":
					doms.push(<Submit key={item.id}/>);
					break;

				default:
					throw new Error("switch miss")

			}

		})

	}

	render(){

		return(
			<div className="mdl-grid" id="edit-view">
			  <div className="mdl-cell mdl-cell--2-col">
			  	<h1 className="title">{this.props.current_form_title}</h1>
			  </div>
			  <div className="mdl-cell mdl-cell--10-col editViewArea">

			  	<div className="formView">

			  		<div className="user_add_form_area">
			  			
			  			{doms}

			  		</div>


			  		<div className="add-form-area">
				  		<div className="mdl-card mdl-shadow--2dp add-form-button">
							  <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" onClick={this._addForm}>
								  <i className="material-icons">add</i>
								</button>
							</div>
							<ul className="form-variation">

								<li className="form-item" onClick={this._selectForm} data-selectid="text">
									<p data-selectid="text">テキスト（一行）</p>
									<img src="/images/inline_text.png"/>
								</li>
								<li className="form-item" onClick={this._selectForm} data-selectid="textarea">
									<p data-selectid="textarea">テキスト（複数行）</p>
									<img src="/images/text_area.png"/>
								</li>
								<li className="form-item" onClick={this._selectForm} data-selectid="radio">
									<p data-selectid="radio">ラジオボタン</p>
									<img src="/images/radio.png"/>
								</li>
								<li className="form-item" onClick={this._selectForm} data-selectid="checkbox">
									<p data-selectid="checkbox">チェックボックス</p>
									<img src="/images/check.png"/>
								</li>
								<li className="form-item" onClick={this._selectForm} data-selectid="submit">
									<p data-selectid="submit">送信ボタン</p>
									<img src="/images/submit.png"/>
								</li>
							</ul>
						</div>

			  	</div>

			  </div>
			</div>
		)
	}

	_selectForm = (e) => {
		var id = e.target.dataset.selectid;
		AppActions.create_form(id)
		this._hideFormVariation()
	}

	_hideFormVariation = () => {
		$(".form-variation").fadeOut('slow')
	}

	_addForm = () => {
		$(".form-variation").css("display","flex")
	}

}