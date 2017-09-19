import { WhileType } from './WhileType';
import {WInteger} from './WInteger';

export class WUndefined extends WhileType {

  private static instance:WUndefined=null;

  constructor(){
    super();
  }

  toString(){
    return "WUndefined";
  }

  isCompatible(type:WhileType):undefined{
    return undefined;
  }

  public static getInstance():WUndefined{
    if(this.instance==null){
      this.instance= new WUndefined();
    }
    return this.instance;
  }

}
