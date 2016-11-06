import React from "react";
import AppStore from "../stores/AppStore.js"
import AppActions from "../actions/AppActions.js"

import Projects from "./top/Projects.jsx"
import EditView from "./main/EditView.jsx"
import $ from "jquery"

var getProjectData = () => {
	return {
		allProjects: AppStore.getAll(),
		allFormData: AppStore.getAllFormData(),
		current_page: AppStore.getCurrentPage(),
		current_form_title: AppStore.getCurrentFormTitle(),
		current_form_id: AppStore.getCurrentFormId()
	}
}

export default class App extends React.Component{

	constructor(){
		super()
		this.state = getProjectData()
	}

	componentDidMount(){
		AppStore.addChangeListener(this._onChange)
	}

	componentWillUnmount(){
		AppStore.removeChangeListener(this._onChange)
	}

	render(){

		var dom;

		switch(this.state.current_page){

			case "index":
				window.history.pushState(null,null,"/")
				dom = <Projects allProjects={this.state.allProjects} />
				break;

			case "edit":
				window.history.pushState(null,null,"/edit")
				dom = <EditView current_form_title={this.state.current_form_title} allFormData={this.state.allFormData} />
				break;

			default:
				// no

		}

		var _save = this.state.current_page == "index" ? "" : "SAVE"
		var _cancel = this.state.current_page == "index" ? "" : "CANCEL"


		return(
			<div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
			  <header className="mdl-layout__header">
			    <div className="mdl-layout__header-row">
			      <span className="mdl-layout-title">LINE CONTACT</span>

			      <div className="mdl-layout-spacer"></div>

			      <nav className="mdl-navigation mdl-layout--large-screen-only">
			        <span className="mdl-navigation__link save_button" onClick={this._cancel}>
			        	{_cancel}
			        </span>
			        <span className="mdl-navigation__link save_button" onClick={this._save}>
			        	{_save}
			        </span>
			      </nav>
			    </div>
			  </header>
			  <div className="mdl-layout__drawer">
			    <span className="mdl-layout-title">Dashboard</span>
			    <nav className="mdl-navigation">
			      <span className="mdl-navigation__link isActive" onClick={this._clickMenu} data-menuid="top">TOP</span>
			      <span className="mdl-navigation__link" onClick={this._clickMenu} data-menuid="mypage">MyPage</span>
			    </nav>
			  </div>
			  <main className="mdl-layout__content">
			  	<div className="page-content">

			  		{dom}

			    </div>
			  </main>
			  
				<div className="copy_form_html">
					<div className="code">
					<p>以下をコピーしてください</p>
						<pre>
							<code>
								{'<form data-line-contact="asdigojso">\n'}
									{'\t<div class="created_form_item">\n'}
	  								{'\t\t<label for="line_connect_3">name</label>\n'}
	  								{'\t\t<input type="text" id="line_connect_3"/>\n'}
	  							{'\t</div>\n'}
									{'\t<div class="created_form_item">\n'}
		  								{'\t\t<label for="line_connect_3">email</label>\n'}
		  								{'\t\t<input type="text" id="line_connect_3"/>\n'}
		  						{'\t</div>\n'}
		  						{'\t<div class="created_form_item">\n'}
		  							{'\t\t<label for="line_connect_1">message</label>\n'}
		  							{'\t\t<textarea rows="4" cols="40" name="line_connect_1" id="line_connect_1"></textarea>\n'}
		  						{'\t</div>\n'}
								{'</form>'}
								<div className="close" onClick={this._closeCopy}>&times;</div>
							</code>
						</pre>
					</div>
				</div>

			</div>
		)
	}

	_clickMenu = (e) => {
		var id = e.target.dataset.menuid
		AppActions.change_menu(id)
	}

	_save = () => {
		$(".copy_form_html").fadeIn()
	}

	_closeCopy = () => {
		$(".copy_form_html").fadeOut()
		AppActions.save(this.state.current_form_id)
	}

	_cancel = () => {
		AppActions.cancel()
	}

	_onChange = () => {
		this.setState(getProjectData())
	}

}