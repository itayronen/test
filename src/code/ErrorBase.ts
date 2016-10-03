export abstract class ErrorBase {
    private rawMessage: string;
    private rawSack: string;
    public stack: string = (<any>new Error()).stack;

    constructor(public name: string, public message: string, public innerError?: Error) {
        this.rawMessage = message;
        this.rawSack = this.stack;

        this.message = this.rawMessage;

        if (this.innerError) {
            this.message += "\n#InnerError--> " + this.innerError.message;
            this.stack += "\n\n#InnerError-->\n" + (<any>this.innerError).stack;
        }
    }

    public toString() {
        let str = this.name + ": " + this.message;

        if (this.innerError) {
            str += "\nInner error:\n" + this.innerError.toString();
        }

        return str;
    }
}
