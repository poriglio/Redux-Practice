const visibilityFilter = (state = "show_all",action) => {
	switch(action.type){
		case "set_visibility":
			return action.filter;
		default:
			return state;
	}
}

const todo = (state,action) => {
	switch(action.type){
		case "add_todo":
			return {
				id: action.id,
				text: action.text,
				completed: false
			}
		case "toggle_todo":
			return Object.assign({},state,{completed:!state.completed})
		default:
			return state;
	}
}

const todos = (state = [],action) => {
	switch(action.type){
		case "add_todo":
			return [...state,
				todo(undefined,action)
			]
		case "toggle_todo":
			// return [
			// 	...state.slice(0,action.id),
			// 	toggleToDo({
			// 		id        : action.id,
			// 		text      : action.text,
			// 		completed : action.completed
			// 	}),
			// 	...state.slice(action.id+1)
			// ]
			return state.map(function(item){
				if(item.id != action.id){
					return item
				}
				else{
					return todo(item,action)
				}
			})
		default:
			return state
	}
}

// const todoApp = (state = {}, action) => {
// 	todos: todos(
// 			state.todos,
// 			action
// 		);
// 	visibilityFilter : visibilityFilter(
// 			state.visibilityFilter,
// 			action
// 		)
// }

const {createStore} = Redux;
const store = createStore(todoApp)
const {combineReducers} = Redux;
// The below is shorthand for the todoApp function I wrote above. You just need to pass in an object mapping the state field names and the reducers that manager them: 
// const todoApp = combineReducers({
// 	todos: todos,
// 	visibilityFilter: visibilityFilter
// })
// The below is shorter-hand ES6 to do the same thing given that the field name should, by convention, be the same as the reducer name:
const todoApp = combineReducers({
	todos,
	visibilityFilter
})

const testAddTodo = () => {
	const action = {
		id        : 0,
		text      : "go to the park",
		completed : false,
		type      : "add_todo"
	}
	const prevState = []
	const nextState = [
		{
			id        : 0,
			text      : "go to the park",
			completed : false
		}
	]
	deepFreeze(prevState)
	expect(todos(prevState,action)).toEqual(nextState)
}

const testToggleTodo = () => {

	const prevState = [{
		id        : 0,
		text      : "walk dog",
		completed : false 
	},{
		id        : 1,
		text      : "brush teeth",
		completed : false 
	},{
		id        : 2,
		text      : "go to bed",
		completed : false 
	}]

	const nextState = [{
		id        : 0,
		text      : "walk dog",
		completed : false 
	},{
		id        : 1,
		text      : "brush teeth",
		completed : true
	},{
		id        : 2,
		text      : "go to bed",
		completed : false 
	}]

	const action = {
		type    : "toggle_todo",
		id      : 1,
		text    : "brush teeth"
	}

	deepFreeze(prevState)

	expect(todos(prevState,action)).toEqual(nextState)
}

const testVisibilityFilter = () => {
	const prevState = "show_all"
	const nextState = "hide_all"
	const action = {
		type    : "set_visibility",
		filter  : "hide_all"
	};
	deepFreeze(prevState);
	expect(visibilityFilter(prevState,action)).toEqual(nextState)
}

testAddTodo();
testToggleTodo();
testVisibilityFilter();
console.log("All tests passed!")