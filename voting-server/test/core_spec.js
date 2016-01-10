import {expect} from 'chai';
import {List,Map} from 'immutable';

import {setEntries,next,vote} from "../src/core";

describe('immutability', () => {

    // describe('a number', () => {

    //     function increment(currentState) {
    //         return currentState + 1;
    //     }

    //     it('is immutable', () => {
    //         let state = 42;
    //         let nextState = increment(state);
 
    //         expect(nextState).to.equal(43);
	   //  expect(state).to.equal(42);
    //     });

    // });

    describe("A List", () => {
        function addMovie(currentState, movie){
            return currentState.push(movie);
            // return currentState.update("movies",movies => movies.push(movie));
        }

        // "update" is an Immutable helper function to make the code more concise.

        // You don't NEED to use Immutable; in Redux docs, plain arrays and objects are used, and you can refrain from mutating them by convention.

        it("is immutable", () => {
            let state = List.of("Trainspotting","28 Days Later");
            let nextState = addMovie(state,"Sunshine");

            expect(nextState).to.equal(List.of(
                "Trainspotting",
                "28 Days Later",
                "Sunshine"));
            expect(state).to.equal(List.of("Trainspotting","28 Days Later"));
        })
    })

});

describe("application logic", () => {
    describe("setEntries",()=>{

        it("adds the entries to the state",()=>{
            const state = Map();
            const entries = List.of("Trainspotting","28 Days Later");
            const nextState = setEntries(state,entries);
            expect(nextState).to.equal(Map({
                entries: List.of("Trainspotting","28 Days Later")
            }))
        })

        it("converts to immutable",()=>{
            const state = Map();
            const entries = ["Trainspotting","28 Days Later"]
            const nextState = setEntries(state,entries)
            expect(nextState).to.equal(Map({
                entries: List.of("Trainspotting","28 Days Later")
            }))
        })
    })

    describe("next",()=>{
        it("takes the next two entries under vote",()=>{
            const state = Map({
                entries: List.of("Trainspotting","28 Days Later","Sunshine")
            })
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of("Trainspotting","28 Days Later")
                }),
                entries: List.of("Sunshine")
            }))
        })

        it("puts winner of current vote back to entries",()=>{
            const state = Map({
                vote: Map({
                    pair: List.of("Trainspotting","28 Days Later"),
                    tally: Map({
                        "Trainspotting": 4,
                        "28 Days Later": 2
                    })
                }),
                entries: List.of("Sunshine","Millions","127 Hours")
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of("Sunshine","Millions")
                }),
                entries: List.of("127 Hours","Trainspotting")
            }));
        });

        it("puts both from tied vote back to entries",()=>{
            const state = Map({
                vote: Map({
                    pair: List.of("Trainspotting","28 Days Later"),
                    tally: Map({
                        "Trainspotting": 3,
                        "28 Days Later": 3
                    })
                }),
                entries: List.of("Sunshine","Millions","127 Hours")
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of("Sunshine","Millions")
                }),
                entries: List.of("127 Hours","Trainspotting","28 Days Later")
            }));
        });
    });

    describe("vote",()=>{
        it("creates a tally for the voted entry",()=>{
            const state = Map({
                vote: Map({
                    pair: List.of("Trainspotting","28 Days Later")
                }),
                entries: List()
            });
            const nextState = vote(state,"Trainspotting");
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of("Trainspotting","28 Days Later"),
                    tally: Map({
                        "Trainspotting":1
                    })
                }),
                entries: List()
            }))
        })

        it("adds to existing tally for the voted entry",()=>{
            const state = Map({
                vote: Map({
                    pair: List.of("Trainspotting","28 Days Later"),
                    tally: Map({
                        "Trainspotting":3,
                        "28 Days Later":2
                    })
                }),
                entries: List()
            });
            const nextState = vote(state,"Trainspotting");
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of("Trainspotting","28 Days Later"),
                    tally: Map({
                        "Trainspotting": 4,
                        "28 Days Later": 2
                    })
                }),
                entries: List()
            }))
        })
    })
})

