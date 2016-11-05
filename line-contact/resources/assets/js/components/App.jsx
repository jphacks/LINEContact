import React from "react";
import AppStore from "../stores/AppStore.js"
import AppActions from "../actions/AppActions.js"

import Projects from "./Projects.jsx"

var getProjectData = () => {
	return {
		allProjects: AppStore.getAll()
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

		return(
			<div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
			  <header className="mdl-layout__header">
			    <div className="mdl-layout__header-row">
			      <span className="mdl-layout-title">LINE CONTACT</span>
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
			    
						<Projects
							allProjects={this.state.allProjects}
						/>

			    </div>
			  </main>
			</div>
		)
	}

	_clickMenu = (e) => {
		var id = e.target.dataset.menuid
		AppActions.change_menu(id)
	}

	_onChange = () => {
		this.setState(getProjectData)
	}

}