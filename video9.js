const addCounter = (list) => {
	// This won't work with deepFreeze():
	// list.push(0)
	// return list
	// This will work, and is the old way:
	// return list.concat(0)
	// This will work, and is the ES6 way of 
	// concatenating arrays:
	return [...list,0]
}

const testAddCounter = () => {
	const listBefore = []
	const listAfter = [0]

	deepFreeze(listBefore)

	expect(addCounter(listBefore)).toEqual(listAfter)
}

const incrementCounter = (list, index) => {
	// Does not work because it mutates:
	// list[index]++
	// return list
	// Old way:
	// return list
	// 	.slice(0,index)
	// 	.concat([list[index]+1])
	// 	.concat(list.slice(index+1))
	// ES6 way:
	return [
		...list.slice(0,index),
		list[index] + 1,
		...list.slice(index+1)
	]
}

const testIncrementCounter = () => {
	const listBefore = [0,10,20]
	const listAfter = [0,11,20]

	deepFreeze(listBefore)

	expect(
		incrementCounter(listBefore,1)
		).toEqual(listAfter)
}

const removeCounter = (list,index) => {
	// Works, but splice is a mutating method:
	// list.splice(index,1);
	// return list
	// Old way that works and doesn't mutate:
	// return list
	// 	.slice(0,index)
	// 	.concat(list.slice(index+1))
	// ES6 way:
	return [
		...list.slice(0,index),
		...list.slice(index + 1)
	]
}

const testRemoveCounter = () => {
	const listBefore = [0,10,20]
	const listAfter = [0,20]

	deepFreeze(listBefore)

	expect(removeCounter(listBefore,1)).toEqual(listAfter)
}


testAddCounter()
testRemoveCounter()
testIncrementCounter()
console.log("All tests passed.")

// What you learned...
// - use deepFreeze to protect from mutations within a test. Just pass an array into it.
// - Do not use splice or push to mutate arrays. Instead, use slice and concat. Also, the ES6 array spread operator. 