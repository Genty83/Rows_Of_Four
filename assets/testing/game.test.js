/**
 * @jest-environment jsdom
 */

import { winner } from "../js/game.js"


describe('Testing the winner function', () => {

	test('Check to see if empty array returns false', () => {
		const arr = [];
		expect(winner(arr)).toBe(false);
	})
}) 