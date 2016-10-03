import {ErrorBase} from "./ErrorBase";

export class ActFailedError extends ErrorBase {
    private static MESSAGE: string = "The 'Act' stage of the test failed. See inner error.";

    constructor(public innerError: Error) {
        super((<any>ActFailedError).name, ActFailedError.MESSAGE, innerError);
    }
}