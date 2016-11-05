import AppDispatcher from "../dispathcer/AppDispatcher.js"
import { EventEmitter } from "events"
import AppConstants from "../constants/AppConstants.js"
import assign from "object-assign"

const CHANGE_EVENT = 'change'

var _data = {}

var change_menu = (now) => {
	console.log(`now menu is ${now}`)
}

var sheet_confirmation = (id) => {
	console.log(`sheet confirmation id: ${id}`)
}

var create = (title) => {
	var d = new Date(),
			date = [d.getFullYear(),d.getMonth(),d.getDate()].join("/");
	var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
	_data[id] = {
		id: id,
		title: title,
		date: date
	}
}

var edit = (id) => {
	console.log(`edit id: ${id}`)
}

var destroy = (id) => {
	if(confirm("削除してもよろしいですか？")){
		delete _data[id]
	}
}

var AppStore = assign({},EventEmitter.prototype, {

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

		default:
			throw new Error("not constant ",action.actionType)

	}

})

export default AppStore