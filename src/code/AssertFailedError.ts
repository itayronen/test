import {ErrorBase} from "./ErrorBase";

export class AssertFailedError extends ErrorBase {
    private static MESSAGE: string = "The 'Assert' stage of the test failed. See inner error.";

    constructor(public innerError: Error) {
        super((<any>AssertFailedError).name, AssertFailedError.MESSAGE, innerError);
    }
}