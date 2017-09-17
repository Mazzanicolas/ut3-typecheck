import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';
import { CheckState } from '../typecheck/CheckState';
import { WhileType } from '../typecheck/WhileType';

/**
  Representación de las asignaciones de valores a variables.
*/
export class TypeAssignment implements Stmt {
  type:WhileType;
  id: string;
  exp: Exp;

  constructor(type:WhileType,id: string, exp: Exp) {
    this.type = type;
    this.id = id;
    this.exp = exp;
  }

  toString(): string {
    return `TypeAssignment(${this.type.toString()},${this.id}, ${this.exp.toString()})`;
  }

  unparse(): string {
    return `${this.id} = ${this.exp.unparse()}`;
  }

  evaluate(state: State): State {
    return undefined;
  }

  checktype(checkstate: CheckState): CheckState {
    if(checkstate.get(this.id)!=null){
      checkstate.logError(`La variable ${this.id} ya esta declarada`);
      return checkstate;
    }
    if(this.type.isCompatible(this.exp.checktype(checkstate))){
        checkstate.set(this.id,this.type);
    } else { checkstate.logError(`La asignación ${this.type} ${this.id} = ${this.exp.checktype(checkstate)} no es compatible`); }
    return checkstate;
  }
}
