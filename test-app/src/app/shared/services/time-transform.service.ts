import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeTransformService {

  constructor() { }

  getTime(ms : any, s : any, m : any, h : any){

    s = ms % 60;
    m = Math.floor(ms / 60) % 60;
    h = Math.floor(ms / 3600);

    s = s < 10 ? '0' + s : s;
    m = m < 10 ? '0' + m : m;
    h = h < 10 ? '0' + h : h;

    return[h, m, s]
  }

    // his.m = Math.floor(value / 60) % 60;
    // this.h = Math.floor(value / 3600);
    //
    // this.s = this.s < 10 ? '0' + this.s : this.s;
    // this.m = this.m < 10 ? '0' + this.m : this.m;
    // this.h = this.h < 10 ? '0' + this.h : this.h;


}
