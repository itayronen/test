import {ErrorBase} from "./ErrorBase";
 
export class ArrangeFailedError extends ErrorBase {
    private static MESSAGE: string = "The 'Arrange' stage of the test failed. See inner error.";

    constructor(public innerError: Error) {
        super((<any>ArrangeFailedError).name, ArrangeFailedError.MESSAGE, innerError);
    }
}
