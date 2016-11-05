import React from "react"
import $ from "jquery"

import AppActions from "../actions/AppActions.js"

export default class Projects extends React.Component{

	constructor(props){
		super(props)
	}

	render(){

		var cards = []
		var allProjects = this.props.allProjects;
		for(var data in allProjects){
			cards.push(
				<li className="mdl-card mdl-shadow--2dp card" key={allProjects[data].id}>
					<h3 className="title">{allProjects[data].title}</h3>
					<div className="mdl-card__actions mdl-card--border footer">
						<span className="date">{allProjects[data].date}</span>
				    <button id={allProjects[data].id} className="mdl-button mdl-js-button mdl-button--icon menu-button" onClick={this._showMenu}>
				    	<i className="material-icons">more_horiz</i>
				    </button>
				  </div>
				  <ul className={allProjects[data].id + "-menu menu"} data-mdl-for={allProjects[data].id}>
					  {/*<li className="menu-item" onClick={this._sheet_confirmation}>シートを確認</li>*/}
					  <li className="menu-item" onClick={this._edit}>編集</li>
					  <li className="menu-item delete-button" onClick={this._destroy}>削除</li>
					  <li className="menu-item" onClick={this._closeMenuView}>閉じる</li>
					</ul>
				</li>
			)
		}

		return(
			<div>
				<ul className="card-grid">
							
					{cards}

					<li className="mdl-card mdl-shadow--2dp card">
						<button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" onClick={this._showInputTitleBox}>
						  <i className="material-icons">add</i>
						</button>
					</li>
					
				</ul>

				<div className="mdl-card mdl-shadow--2dp inputTitleBox" ref="inputTitleBox">
				  <div className="mdl-card__title">
				    <h2 className="mdl-card__title-text">タイトル</h2>
				  </div>
				  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label inputArea">
				    <input className="mdl-textfield__input" type="text" id="inputTitle"/>
				    <label className="mdl-textfield__label" htmlFor="inputTitle">Title...</label>
				  </div>
				  <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this._create}>
				  	決定
				  </button>
				</div>
				<div className="overlay" ref="overlay"></div>

			</div>
		)
	}

	_showMenu = (e) => {
		var id = e.target.parentNode.id
		$(".menu").hide()
		$("."+id+"-menu").fadeIn()
	}

	_showInputTitleBox = () => {
		$(".inputTitleBox").fadeIn();
		$(".overlay").fadeIn();
	}

	_closeMenuView = () => {
		$(".menu").fadeOut()
	}

	_create = () =>{
		var title = $("#inputTitle").val();
		if(title == ""){
			alert("タイトルが入力されていません！")
			return
		}
		$("#inputTitle").val("")
		$(".inputTitleBox").fadeOut();
		$(".overlay").fadeOut();
		AppActions.create(title)
	}

	_sheet_confirmation = (e) => {
		var id = e.target.parentNode.dataset.mdlFor;
		AppActions.sheet_confirmation(id)
		this._closeMenuView()
	}

	_edit = (e) => {
		var id = e.target.parentNode.dataset.mdlFor;
		AppActions.edit(id)
		this._closeMenuView()
	}

	_destroy = (e) => {
		var id = e.target.parentNode.dataset.mdlFor;
		AppActions.destroy(id)
		this._closeMenuView()
	}

}