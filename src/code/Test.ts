// From jasmine declerations.
// {
export declare interface DoneFn extends Function {
    (): void;

    /** fails the spec and indicates that it has completed. If the message is an Error, Error.message is used */
    fail: (message?: Error | string) => void;
}

declare function it(expectation: string, assertion?: () => void, timeout?: number): void;

declare function it(expectation: string, assertion?: (done: DoneFn) => void, timeout?: number): void;

declare function fail(e?: any): void;
// }

import {ActFailedError} from "./ActFailedError";
import {ArrangeFailedError} from "./ArrangeFailedError";
import {AssertFailedError} from "./AssertFailedError";

export interface TestMetadata {
    expectation: string;

    arrange(): void;
    act(): void;
    assert(): void;
}

export interface TestAsyncMetadata extends TestMetadata {
    done(): void;
    fail(message?: Error | string): void;
}

class MyTestMetadata implements TestMetadata {

    public stage: Stage = Stage.NoStage;
    public expectation: string;

    public arrange(): void {
        this.stage = Stage.Arrange;
    }

    public act(): void {
        this.stage = Stage.Act;
    }

    public assert(): void {
        this.stage = Stage.Assert;
    }
}

export type testFunc = (test: TestMetadata) => void;
export type testAsyncFunc = (test: TestAsyncMetadata) => void;

class MyTestAsyncMetadata extends MyTestMetadata implements TestAsyncMetadata {

    constructor(private doneFunc: DoneFn) {
        super();

        this.done = doneFunc;
    }

    public done(): void {

    }

    public fail(message?: Error | string): void {
        let error: Error;

        if (typeof message === "string") {
            error = new Error(message);
        }

        this.doneFunc.fail(getError(this.stage, error));
    }
}

export function test(expectation: string, testFunc: testFunc): void {
    it(expectation, () => {
        let test = new MyTestMetadata();

        try {
            testFunc(test);
        } catch (error) {
            error = getError(test.stage, error);

            fail(error);
        }
    });
}

export function testAsync(expectation: string, testFunc: testAsyncFunc): void {
    it(expectation, (done) => {
        let test = new MyTestAsyncMetadata(done);

        try {
            testFunc(test);
        } catch (error) {
            test.fail(error);
        }
    });
}

function getError(stage: Stage, error: Error): Error {
    switch (stage) {
        case Stage.Arrange:
            return new ArrangeFailedError(error);

        case Stage.Act:
            return new ActFailedError(error);

        case Stage.Assert:
            return new AssertFailedError(error);

        case Stage.NoStage:
            return error;

        default:
            return new Error("Unknown stage.");
    }
}

enum Stage {
    NoStage,
    Arrange,
    Act,
    Assert
}