import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';
import { CheckState } from '../typecheck/CheckState';
import { WhileType } from '../typecheck/WhileType';
import { WBoolean } from '../typecheck/WBoolean';

/**
  Representación de las sentencias condicionales.
*/
export class IfThen implements Stmt {
  cond: Exp;
  thenBody: Stmt;

  constructor(cond: Exp, thenBody: Stmt) {
    this.cond = cond;
    this.thenBody = thenBody;
  }

  toString(): string {
    return `IfThen(${this.cond.toString()}, ${this.thenBody.toString()})`;
  }

  unparse(): string {
    return `if ${this.cond.unparse()} then { ${this.thenBody.unparse()} }`;
  }

  evaluate(state: State): State {
    return undefined;
  }

  checktype(checkstate: CheckState): CheckState {
    var chkst = new CheckState();
    for (var i in checkstate) chkst.vars[i] = checkstate.vars[i];
    chkst = this.thenBody.checktype(chkst);
    checkstate.errorLog.concat(chkst.errorLog);
    if(WBoolean.getInstance().isCompatible(this.cond.checktype(checkstate))){
      return checkstate;
    }
    checkstate.logError(`La condicion es de tipo ${this.cond.checktype(checkstate)}`);
    return checkstate;
  }
}
