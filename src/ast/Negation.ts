import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { CheckState } from '../typecheck/CheckState';
import { WhileType } from '../typecheck/WhileType';
import { WBoolean } from '../typecheck/WBoolean';

/**
  Representación de las negaciones de expresiones booleanas.
*/
export class Negation implements Exp {

  exp: Exp;

  constructor(exp: Exp) {
    this.exp = exp;
  }

  toString(): string {
    return `Negation(${this.exp.toString()})`;
  }

  unparse(): string {
    return `(!${this.exp.unparse()})`;
  }

  evaluate(state: State): any {
    return undefined;
  }

  checktype(checkstate: CheckState): WhileType {
    if(WBoolean.getInstance().isCompatible(this.exp.checktype(checkstate))){
      return WBoolean.getInstance();
    }
    checkstate.logError(`La negacion es de tipo ${this.exp.checktype(checkstate)}`);
    return WBoolean.getInstance();
  }
}
