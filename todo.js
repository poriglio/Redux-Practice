const toggleToDo = (todo) => {
	// todo.completed = !todo.completed
	// return todo
	return Object.assign({},todo,{completed:!todo.completed})
}

const todos = (state = [],action) => {
	switch(action.type){
		case "add_todo":
			return [...state,
				{
					id      : action.id,
					text    : action.text,
					completed : false
				}
			]
		case "toggle_todo":
			return [
				...state.slice(0,action.id),
				toggleToDo({
					id        : action.id,
					text      : action.text,
					completed : action.completed
				}),
				...state.slice(action.id+1)
			]
		default:
			return state
	}
}

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

testAddTodo();
testToggleTodo();
console.log("All tests passed!")

// When you return, go back to tutorial part/video #12. Your toggle test does pass, but it needs to run without needing to send action.text to the reducer. Looks like Map will be a better solution.