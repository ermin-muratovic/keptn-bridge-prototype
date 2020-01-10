import {Trace} from "./trace";

export class Root extends Trace {
  traces: Trace[];

  isFaulty(): boolean {
    let result: boolean = false;
    if(this.traces) {
      this.traces.forEach((trace) => {
        if(trace.isFaulty()) {
          result = true;
        }
      });
    }
    return result;
  }

  isSuccessful(): boolean {
    let result: boolean = false;
    return !this.isFaulty() && result;
  }

  getLastTrace(): Trace {
    return this.traces ? this.traces[this.traces.length - 1] : null;
  }

  static fromJSON(data: any) {
    return Object.assign(new this, data);
  }
}
