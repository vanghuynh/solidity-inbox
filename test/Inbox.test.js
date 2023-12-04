const ganache = require("ganache");
const { Web3 } = require("web3");

// updated ganache and web3 imports added for convenience
const assert = require("assert");

// instance web 3 need provider to connect local test network
const web3 = new Web3(ganache.provider());

// import interface and bytecode from compiled contract
const { interface, bytecode } = require("../compile");

// contract test code will go here

let accounts;
let inbox;

beforeEach(async () => {
  console.log("before each");
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  // teach web3 about what methods an Inbox contract has
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    // tell web3 that we want to deploy a new copy of this contract
    .deploy({ data: bytecode, arguments: ["Hi there!"] })
    // instruct web3 to send out a transaction that creates this contract
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, "Hi there!");
  });

  it("can change the message", async () => {
    await inbox.methods.setMessage("bye").send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, "bye");
  });
});
