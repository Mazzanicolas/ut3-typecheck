import { WhileType } from './WhileType';

export class WInteger extends WhileType {

  private static instance:WInteger=null;

  constructor(){
    super();
  }

  toString(){
    return "WInteger";
  }

  isCompatible(type:WhileType):Boolean{
    if(type instanceof WInteger){
      return true
    }
    return false;
  }

  public static getInstance():WInteger{
    if(this.instance==null){
      this.instance= new WInteger();
    }
    return this.instance;
  }

}
