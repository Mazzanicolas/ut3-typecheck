import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';
import { CheckState } from '../typecheck/CheckState';
import { WhileType } from '../typecheck/WhileType';
import { WBoolean } from '../typecheck/WBoolean';

/**
  Representación de las iteraciones while-do.
*/
export class WhileDo implements Stmt {
  cond: Exp;
  body: Stmt;

  constructor(cond: Exp, body: Stmt) {
    this.cond = cond;
    this.body = body;
  }

  toString(): string {
    return `WhileDo(${this.cond.toString()}, ${this.body.toString()})`;
  }

  unparse(): string {
    return `while ${this.cond.unparse()} do { ${this.body.unparse()} }`;
  }

  evaluate(state: State): State {
    return undefined;
  }

  checktype(checkstate: CheckState): CheckState {
    var chkst = new CheckState();
    for (var i in checkstate) chkst.vars[i] = checkstate.vars[i];
    chkst = this.body.checktype(chkst);
    checkstate.errorLog.concat(chkst.errorLog);
    if(!WBoolean.getInstance().isCompatible(this.cond.checktype(checkstate))){
      checkstate.logError(`La condicion es de tipo ${this.cond.checktype(checkstate)}`);
    }
    return checkstate;
  }
}
