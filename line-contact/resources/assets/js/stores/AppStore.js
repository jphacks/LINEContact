import AppDispatcher from "../dispathcer/AppDispatcher.js"
import { EventEmitter } from "events"
import AppConstants from "../constants/AppConstants.js"
import assign from "object-assign"

const CHANGE_EVENT = 'change'

var _data = {}
var _form_data = []

var _current_page = "index"
var _current_form_title = ""
var _current_id = ""

// home change menu
var change_menu = (now) => {
	console.log(`now menu is ${now}`)
}

// project sheet confirmation
var sheet_confirmation = (id) => {
	console.log(`sheet confirmation id: ${id}`)
}

// project create
var create = (title) => {
	var d = new Date(),
			date = [d.getFullYear(),d.getMonth(),d.getDate()].join("/");
	var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
	_data[id] = {
		id: id,
		title: title,
		date: date,
		form_data: []
	}
}

var getTitle = (id) => {
	return _data[id].title
}

// project edit
var edit = (id) => {
	_current_id = id
	_current_form_title = getTitle(id)
	_current_page = "edit"
	_form_data = _data[id].form_data || []
}

// project destory
var destroy = (id) => {
	if(confirm("削除してもよろしいですか？")){
		delete _data[id]
	}
}

// create form
var create_form = (id,title) => {
	_form_data.push({
		type: id,
		title: title,
		id: "line_connect_" + (+new Date() + Math.floor(Math.random() * 999999)).toString(36)
	})
}

// submit button create
var create_form_submit = (id) => {
	_form_data.push({
		type: id,
		id: "line_connect_" + (+new Date() + Math.floor(Math.random() * 999999)).toString(36)
	})
}

// form data save
var save = (id) => {
	_data[id].form_data = _form_data
	_form_data = []
	_current_page = "index"
}

// form data cancel
var cancel = () => {
	_form_data = []
	_current_page = "index"
}

var AppStore = assign({},EventEmitter.prototype, {

	getCurrentPage(){
		return _current_page
	},

	getCurrentFormId(){
		return _current_id
	},

	getCurrentFormTitle(){
		return _current_form_title
	},

	getAllFormData(){
		console.log(_form_data)
		return _form_data
	},

	getAll(){
		return _data
	},

	emitChange(){
		this.emit(CHANGE_EVENT)
	},

	addChangeListener(callback){
		this.on(CHANGE_EVENT,callback)
	},

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT,callback)
	}

})

AppDispatcher.register((action)=>{

	switch(action.actionType){

		case AppConstants.CHANGE_MENU:
			change_menu(action.now)
			AppStore.emitChange()
			break;

		case AppConstants.SHEET_CONFIRMATION:
			sheet_confirmation(action.id)
			AppStore.emitChange()
			break;

		case AppConstants.CREATE:
			create(action.title)
			AppStore.emitChange()
			break;

		case AppConstants.EDIT:
			edit(action.id)
			AppStore.emitChange()
			break;

		case AppConstants.DESTROY:
			destroy(action.id)
			AppStore.emitChange()
			break;

		case AppConstants.CREATE_FORM:
			if(action.id !== undefined) create_form(action.id,action.title)
			AppStore.emitChange()
			break;

		case AppConstants.CREATE_FORM_SUBMIT:
			if(action.id !== undefined) create_form_submit(action.id)
			AppStore.emitChange()
			break;

		case AppConstants.CANCEL:
			cancel()
			AppStore.emitChange()
			break;

		case AppConstants.SAVE:
			save(action.id)
			AppStore.emitChange()
			break;

		default:
			throw new Error("not constant ",action.actionType)

	}

})

export default AppStore