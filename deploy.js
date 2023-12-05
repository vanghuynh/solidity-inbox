const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const { abi, evm } = require("./compile");

const provider = new HDWalletProvider(
  //"REPLACE_WITH_YOUR_MNEMONIC",
  "win believe galaxy canoe mixed fatal mass huge school alcohol arm ethics",
  // remember to change this to your own phrase!
  //"REPLACE_WITH_YOUR_INFURA_URL"
  "https://sepolia.infura.io/v3/19e970920d9243d98a868b3dfa36df73"
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ["Hi there!"] })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
