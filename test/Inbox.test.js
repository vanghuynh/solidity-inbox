const ganache = require('ganache');
const { Web3 } = require('web3');

// updated ganache and web3 imports added for convenience
const assert = require('assert');

// instance web 3 need provider to connect local test network
const web3 = new Web3(ganache.provider());



// contract test code will go here
class Car {
    park() {
        return 'stopped';
    }

    drive() {
        return 'vroom';
    }

}


let car;

beforeEach(() => {
    console.log('before each');
    car = new Car();
})

describe('Car', () => {
    it('can park', () => {
        assert.equal(car.park(), 'stopped');
    });

    it('can drive', () => {
        assert.equal(car.drive(), 'vroom');
    });
});
