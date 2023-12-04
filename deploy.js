const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
//updated web3 and hdwallet-provider imports added for convenience
const { interface, bytecode } = require("./compile");

// deploy code will go here
// never put your private key here
// just for test

const provider = new HDWalletProvider(
  "win believe galaxy canoe mixed fatal mass huge xx xx xx xx",
  "https://sepolia.infura.io/v3/xxxx"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("deploy from account: ", accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi there!"] })
    .send({ from: accounts[0], gas: "1000000" });
  console.log("contract deployed to: ", result.options.address);
  provider.engine.stop();
};

deploy();
