/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { expect } from 'chai';
import { hello } from '../src/hello';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe('Hello function', () => {
    const msg = 'hello world!!';
    it(`should return ${msg}`, () => {
        const result = hello();
        expect(result).to.equal(msg);
    });
});
