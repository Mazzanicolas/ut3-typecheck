import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { CheckState } from '../typecheck/CheckState';
import { WhileType } from '../typecheck/WhileType';
import { WInteger } from '../typecheck/WInteger';
import { WNumber } from '../typecheck/WNumber';

/**
  Representación de restas.
*/
export class Substraction implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Substraction(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} - ${this.rhs.unparse()})`;
  }

  evaluate(state: State): any {
    return undefined;
  }

  checktype(checkstate: CheckState): WhileType {
    if(WNumber.getInstance().isCompatible(this.lhs.checktype(checkstate)) && WNumber.getInstance().isCompatible(this.rhs.checktype(checkstate))){
      if(this.lhs.checktype(checkstate) === WInteger.getInstance() && this.rhs.checktype(checkstate) === WInteger.getInstance()){
        return WInteger.getInstance();
      }
      return WNumber.getInstance();
    }
    checkstate.logError(`la resta de ${this.lhs} y ${this.rhs} no es compatible`);
    return WNumber.getInstance();//Diferencia entre devolver un Number o Integer?
  }
}
