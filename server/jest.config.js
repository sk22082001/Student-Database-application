/* eslint-disable no-undef */
module.exports = {
    preset: './jest-preset.js', // Point to the created preset file
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    testEnvironment: 'node',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)?$',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    };
  