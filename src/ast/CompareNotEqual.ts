import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { CheckState } from '../typecheck/CheckState';
import { WhileType } from '../typecheck/WhileType';
import { WNumber } from '../typecheck/WNumber';
import { WBoolean } from '../typecheck/WBoolean';


/**
  Representación de las comparaciones por igual.
*/
export class CompareNotEqual implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `CompareNotEqual(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} != ${this.rhs.unparse()})`;
  }

  evaluate(state: State): any {
    return undefined;
  }

  checktype(checkstate: CheckState): WhileType {
    if(WNumber.getInstance().isCompatible((this.lhs.checktype(checkstate))) && WNumber.getInstance().isCompatible((this.rhs.checktype(checkstate)))){
      return WBoolean.getInstance();
    } else if(WBoolean.getInstance().isCompatible(this.lhs.checktype(checkstate)) && WBoolean.getInstance().isCompatible(this.rhs.checktype(checkstate))){
      return WBoolean.getInstance();
    }
     else { checkstate.logError(`La comparacion entre ${this.lhs.checktype(checkstate)} y ${this.rhs.checktype(checkstate)} no es compatible`);}
    return WBoolean.getInstance();
  }
}
