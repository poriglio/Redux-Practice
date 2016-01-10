import {List,Map} from "immutable"

export function setEntries(state, entries){
    return state.set("entries",List(entries))
}

export function getWinners(vote){

}

export function next(state){
	const entries = state.get("entries");
	return state.merge({
		vote: Map({pair: entries.take(2)}),
		entries: entries.skip(2)
	})
}

export function vote(state,entry){
	return state.updateIn(
		['vote','tally',entry],
		0,
		tally => tally + 1
		);
}

// In the above function, updateIn says:
// Reach into the nested data structure path specified in the array;
// Apply this function there.
// If there are keys missing along that path,
// create new maps in their place.
// If the value at the end is missing,
// initialize it with 0.