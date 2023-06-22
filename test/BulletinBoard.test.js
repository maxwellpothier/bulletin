// Tests here
const assert = require("assert");

const compiledBoard = require("../ethereum/build/BulletinBoard.json");

// console.log("Here's the ABI", compiledBoard.abi);
// console.log("Bytecode", compiledBoard.evm.bytecode.object);

describe("BulletinBoard", () => {
	beforeEach(() => {
		console.log("Before each");
	});

	it("should compile", () => {
		assert.ok(compiledBoard);
	});

	it("is true", () => {
		assert.ok(true);
	});
});
