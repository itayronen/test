# itay-test
The library allows to declare the test stage.  
If an error is thrown, it will be wrapped with an appropriate error.

## Install
`npm install --save-dev itay-test`

## Basic Usage
```ts
import {test, testAsync} from "./Test";
describe("Some tests", () => {
    test("test indexOf.", (t) => {
        t.arrange();
        let list = [];
        list.push(1);
        list.push(2);
        list.push(3);

        t.act();
        let result = list.indexOf(2);

        t.assert();
        expect(result).toBe(1);
    });
});
```