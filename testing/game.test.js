/**
 * @jest-environment jsdom
 */

import { describe } from "yargs";
import { winner } from "../assets/js/game";
import { expect } from "@jest/globals";


describe('Testing the winner function', () => {

	test('Check to see if empty array returns false', () => {
		const arr = [];
		expect(winner(arr)).toBe(false);
	})
})