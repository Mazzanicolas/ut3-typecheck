import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { CheckState } from '../typecheck/CheckState';
import { WhileType } from '../typecheck/WhileType';
import { WBoolean } from '../typecheck/WBoolean';

/**
  Representación de conjunciones booleanas (AND).
*/
export class Disjunction implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Disjunction(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} || ${this.rhs.unparse()})`;
  }

  evaluate(state: State): any {
    return undefined;
  }

  checktype(checkstate: CheckState): WhileType {
    if(WBoolean.getInstance().isCompatible(this.lhs.checktype(checkstate)) && WBoolean.getInstance().isCompatible(this.rhs.checktype(checkstate))){
      return WBoolean.getInstance();
    }
    checkstate.logError(`La comparacion entre ${this.lhs.checktype(checkstate)} y ${this.rhs.checktype(checkstate)} no es compatible`);
    return WBoolean.getInstance();
  }
}
