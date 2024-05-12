/**
 * @jest-environment jsdom
 */


import { winner } from "../js/game.js"

describe('Testing the winner function', () => {
    test('Check if false is returned', () => {
        const arr = [];
        expect(winner(arr)).toBe(false);
    })
})