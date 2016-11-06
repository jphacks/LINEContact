import AppDispatcher from "../dispathcer/AppDispatcher.js"
import AppConstants from "../constants/AppConstants.js"

var AppActions = {

	change_menu(now){
		AppDispatcher.dispatch({
			actionType: AppConstants.CHANGE_MENU,
			now: now
		})
	},

	sheet_confirmation(id){
		AppDispatcher.dispatch({
			actionType: AppConstants.SHEET_CONFIRMATION,
			id: id
		})
	},

	create(title){
		AppDispatcher.dispatch({
			actionType: AppConstants.CREATE,
			title: title
		})
	},

	edit(id){
		AppDispatcher.dispatch({
			actionType: AppConstants.EDIT,
			id: id
		})
	},

	destroy(id){
		AppDispatcher.dispatch({
			actionType: AppConstants.DESTROY,
			id: id
		})
	},

	create_form(id,title){
		AppDispatcher.dispatch({
			actionType: AppConstants.CREATE_FORM,
			id: id,
			title: title
		})
	},

	create_form_submit(id){
		AppDispatcher.dispatch({
			actionType: AppConstants.CREATE_FORM_SUBMIT,
			id: id
		})
	},

	cancel(){
		AppDispatcher.dispatch({
			actionType: AppConstants.CANCEL
		})
	},

	save(id){
		AppDispatcher.dispatch({
			actionType: AppConstants.SAVE,
			id: id
		})
	},

}

export default AppActions