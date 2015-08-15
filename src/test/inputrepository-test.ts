/// <reference path="./typings.d.ts" />
require('source-map-support').install();
import assert = require('power-assert');
import InputRepository from '../public/script/input/inputrepository';
import Controller from '../public/script/input/controller';

describe('InputRepository', () => {
	it('returns input when valid controller', () => {
		let inputRepos = new InputRepository(4);
		assert(inputRepos.shift() == null);
		inputRepos.putController(0, 0, new Controller(false, false, false, false));
		assert(inputRepos.shift() == null);
		inputRepos.putController(0, 1, new Controller(false, false, false, false));
		assert(inputRepos.shift() == null);
		inputRepos.putController(0, 2, new Controller(false, false, false, false));
		assert(inputRepos.shift() == null);
		inputRepos.putController(0, 3, new Controller(false, false, false, false));
		assert(inputRepos.shift() != null);
		assert(inputRepos.shift() == null);
	});
});
