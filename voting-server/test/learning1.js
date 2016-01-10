import {expect} from 'chai';
import {List} from 'immutable';

describe('correctness', () => {

    describe('a sum', () => {

        function add(x,y){
            return x + y;
        }

    it('is correct',() => {
        let x = 4;
        let y = 10;
	let sum = add(x,y);

        expect(sum).to.equal(14);
	expect(x).to.equal(4);
	expect(y).to.equal(10);
        });
    });
});

describe('is feline',()=>{

    describe('a cat', () =>{

        function identify(animal){
            switch(animal){
                case "leopard":
                    return "It is a cat."
                case "terrier":
                    return "It is not a cat."
                default:
                    return "I can't tell."
            }
        }

        it("is not a cat",() => {
            let animal = "terrier";
            let identification = identify(animal);
            expect(identification).to.equal("It is not a cat.")
        })

        it("is uncertain",()=>{
            let animal = "panda";
            let identification = identify(animal);
            expect(identification).to.equal("I can't tell.")
        })

        it("is a cat",()=>{
            let animal = "leopard";
            let identification = identify(animal);
            expect(identification).to.equal("It is a cat.")
        })

    })

})

describe('positivity',()=>{
    describe('value', ()=>{
        function abs(number){
            return Math.abs(number)
        }

        it('is positive',()=>{
            let number = -10;
            let newNumber = abs(number)

            expect(newNumber).to.equal(10);
            expect(number).to.equal(-10)
        })
    })
})