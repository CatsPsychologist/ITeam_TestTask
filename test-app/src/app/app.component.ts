import {Component, OnDestroy} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import {TimeTransformService} from "./shared/services/time-transform.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnDestroy{
  title = 'test-app';

  public s: number | string = 0 + '0';
  public m: number | string = 0 + '0';
  public h: number | string = 0 + '0';

  public start: boolean = false;
  public waiting: boolean = false;
  public lastTime: number;

  protected timeArr: number[] = [];

  private _subscription: Subscription;
  private timeInterval$: Observable<number>;

  constructor(
    private timeService: TimeTransformService
  ) {
  }

  startTimer(){
    this.timeInterval$ = interval(1000)

    if(!this.start){
      this.start = true
      this._subscription = this.timeInterval$.subscribe((time : number) => {
        if(this.lastTime > 1){
          time = this.lastTime
        }
        time ++;

        this.lastTime = time;
        this.timeArr = this.timeService.getTime(time, this.s, this.m, this.h);

        this.s = this.timeArr[2];
        this.m = this.timeArr[1];
        this.h = this.timeArr[0];
      })
    }
    else{
      this.reset()
    }
  }

  wait(){
    if(!this.waiting){
      this.waiting = true;

      this._subscription.unsubscribe();
    }
  }

  stopWait(){
    if(this.waiting){
      this.waiting = false;
      this.start = false;

      this.startTimer();
    }
  }

  reset(){
    this.lastTime = 0;

    this.start = false;
    this.waiting = false;

    this.s = this.m = this.h = 0 + '0';
    this._subscription.unsubscribe();
  }

  ngOnDestroy(){
    this._subscription.unsubscribe();
  }

}


