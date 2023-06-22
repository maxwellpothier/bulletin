const fs = require("fs");
const path = require("path");
const solc = require("solc");

const pathToBoard = path.resolve(__dirname, "../contracts/BulletinBoard.sol");

const sourceCode = fs.readFileSync(pathToBoard, "utf8");

const input = {
	language: "Solidity",
	sources: {
		"BulletinBoard.sol": {
			content: sourceCode,
		},
	},
	settings: {
		outputSelection: {
			"*": {
				"*": ["*"],
			},
		},
	},
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

for (const contractName in output.contracts["BulletinBoard.sol"]) {
	console.log(
		contractName +
			": " +
			output.contracts["BulletinBoard.sol"][contractName].evm.bytecode
				.object
	);
}
