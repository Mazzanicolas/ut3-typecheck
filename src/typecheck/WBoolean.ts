import { WhileType } from './WhileType';

export class WBoolean extends WhileType {

  private static instance:WBoolean=null;

  constructor(){
    super();
  }

  toString(){
    return "WBoolean";
  }

  isCompatible(type:WhileType):Boolean{
    if(type instanceof WBoolean){
      return true
    }
    return false;
  }

  public static getInstance():WBoolean{
    if(this.instance==null){
      this.instance= new WBoolean();
    }
    return this.instance;
  }

}
