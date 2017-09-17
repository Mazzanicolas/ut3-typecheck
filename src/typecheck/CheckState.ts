import { WhileType } from './WhileType';

export class CheckState {

  vars: Map<string, WhileType>;
  errorLog:string[];
  
  constructor() {
    this.vars = new Map<string, WhileType>();
    this.errorLog = [];
  }

  toString(): string {
    return `{ ${Array.from(this.vars.entries()).map(([key, value]) => (`${key} = ${value}`)).join("; ")} }`;
  }

  get(id: string): WhileType {
    return this.vars.get(id);
  }

  set(id: string, type: WhileType) {
    this.vars.set(id, type);
  }

  logError(error:string){
    this.errorLog.push(error);
  }
}
