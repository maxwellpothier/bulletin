const fs = require("fs-extra");
const path = require("path");
const solc = require("solc");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const pathToBoard = path.resolve(__dirname, "contracts/BulletinBoard.sol");
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

var output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
	"BulletinBoard.sol"
];

fs.ensureDirSync(buildPath);

for (let contract in output) {
	fs.outputJsonSync(
		path.resolve(buildPath, contract + ".json"),
		output[contract]
	);
}
