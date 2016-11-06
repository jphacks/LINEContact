import React from "react"
import $ from "jquery"

import AppActions from "../../actions/AppActions.js"

import Text from "./elements/Text.jsx"
import Textarea from "./elements/Textarea.jsx"
import Submit from "./elements/Submit.jsx"

var doms = []
var save_id = ""
var component_title = ""

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

		doms = []

		this.props.allFormData.map((item)=>{

			switch(item.type){

				case "text":
					doms.push(<Text title={item.title} key={item.id}/>)
					break;

				case "textarea":
					doms.push(<Textarea title={item.title} key={item.id}/>)
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

			  <div className="mdl-card mdl-shadow--2dp inputTitleBox" ref="inputTitleBox">
				  <div className="mdl-card__title">
				    <h2 className="mdl-card__title-text">タイトル</h2>
				  </div>
				  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label inputArea">
				    <input className="mdl-textfield__input" type="text" id="inputTitle"/>
				  </div>
				  <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this._save_form}>
				  	決定
				  </button>
				</div>
				<div className="overlay" ref="overlay"></div>

			</div>
		)
	}

	_selectForm = (e) => {
		var id = e.target.dataset.selectid;
		save_id = id
		if(id == "submit"){
			this._save_form_submit()
		}else{
			$(".inputTitleBox").fadeIn();
			$(".overlay").fadeIn();
		}
		this._hideFormVariation()
	}

	_save_form = () => {
		component_title = $("#inputTitle").val();
		if(component_title == ""){
			alert("タイトルが入力されていません！")
			return
		}
		$("#inputTitle").val("")
		$(".inputTitleBox").fadeOut();
		$(".overlay").fadeOut();
		AppActions.create_form(save_id,component_title)
	}

	_save_form_submit = () => {
		AppActions.create_form_submit(save_id)
	}

	_hideFormVariation = () => {
		$(".form-variation").fadeOut('slow')
	}

	_addForm = () => {
		$(".form-variation").css("display","flex")
	}

}