import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';
import { CheckState } from '../typecheck/CheckState';
import { WhileType } from '../typecheck/WhileType';
import { WBoolean } from '../typecheck/WBoolean';

/**
  Representación de las sentencias condicionales.
*/
export class IfThenElse implements Stmt {
  cond: Exp;
  thenBody: Stmt;
  elseBody: Stmt;

  constructor(cond: Exp, thenBody: Stmt, elseBody: Stmt) {
    this.cond = cond;
    this.thenBody = thenBody;
    this.elseBody = elseBody;
  }

  toString(): string {
    return `IfThenElse(${this.cond.toString()}, ${this.thenBody.toString()}, ${this.elseBody.toString()})`;
  }

  unparse(): string {
    return `if ${this.cond.unparse()} then { ${this.thenBody.unparse()} } else { ${this.elseBody.unparse()} }`;
  }

  evaluate(state: State): State {
    return undefined;
  }

  checktype(checkstate: CheckState): CheckState {
    var chkst = new CheckState();
    for (var i in checkstate) chkst.vars[i] = checkstate.vars[i];
    chkst = this.thenBody.checktype(chkst);
    checkstate = this.elseBody.checktype(checkstate);
    checkstate.errorLog.concat(chkst.errorLog);
    if(!WBoolean.getInstance().isCompatible(this.cond.checktype(checkstate))){
      checkstate.logError(`La condicion es de tipo ${this.cond.checktype(checkstate)}`);
    }
    for(var j in checkstate.vars){ if (!(j in chkst.vars)){ checkstate.vars.delete(j) }}
    return checkstate;
  }
}
