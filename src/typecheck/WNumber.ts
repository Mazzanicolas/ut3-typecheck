import { WhileType } from './WhileType';
import {WInteger} from './WInteger';

export class WNumber extends WhileType {

  private static instance:WNumber=null;

  constructor(){
    super();
  }

  toString(){
    return "WNumber";
  }

  isCompatible(type:WhileType):Boolean{
    if(type instanceof WInteger||type instanceof WNumber){
      return true
    }
    return false;
  }

  public static getInstance():WNumber{
    if(this.instance==null){
      this.instance= new WNumber();
    }
    return this.instance;
  }

}
