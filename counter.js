console.log("helllo")

const counter = (state = 0, action) => {
	switch(action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default:
			return state;
	}
}

// DUMB COMPONENT
const Counter = ({
	value, 
	onIncrement, 
	onDecrement
}) => (
	<div>
		<h1>{value}</h1>
		<button onClick={onIncrement}>+</button>
		<button onClick={onDecrement}>-</button>
	</div>
);

const { createStore } = Redux;
const store = createStore(counter);

// SMART COMPONENT
const render = () => {
	// document.body.innerText = store.getState();
	// console.log(document.body.innerText);
	ReactDOM.render(
		<Counter 
			value={store.getState()}
			onIncrement = {() =>
				store.dispatch({
					type: 'INCREMENT'
				})
			}
			onDecrement = {() =>
				store.dispatch({
					type: 'DECREMENT'
				})
			} 
		/>,
		document.getElementById('root')
	);
};

store.subscribe(render);
render();