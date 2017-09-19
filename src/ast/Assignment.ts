import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';
import { CheckState } from '../typecheck/CheckState';
import { WhileType } from '../typecheck/WhileType';
import { WUndefined } from '../typecheck/WUndefined';

/**
  Representación de las asignaciones de valores a variables.
*/
export class Assignment implements Stmt {

  id: string;
  exp: Exp;

  constructor(id: string, exp: Exp) {
    this.id = id;
    this.exp = exp;
  }

  toString(): string {
    return `Assignment(${this.id}, ${this.exp.toString()})`;
  }

  unparse(): string {
    return `${this.id} = ${this.exp.unparse()}`;
  }

  evaluate(state: State): State {
    return undefined;
  }

  checktype(checkstate: CheckState): CheckState {
    if(checkstate.get(this.id)!=null){
      if(checkstate.get(this.id).isCompatible(this.exp.checktype(checkstate))){
        checkstate.set(this.id,this.exp.checktype(checkstate));
      }else{
        checkstate.logError(`La asignacion no es compatible con ${this.exp.checktype(checkstate)}`);
        checkstate.set(this.id,checkstate.get(this.id));
      }
      return checkstate;
    }
    checkstate.set(this.id,WUndefined.getInstance());
    return checkstate;
  }
}
