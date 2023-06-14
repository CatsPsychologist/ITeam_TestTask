import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {debounceTime, filter, Subject, Subscription} from "rxjs";

@Directive({
  selector: '[click.single],[click.double]',
})
export class DbClickDirective {

  @Input() debounceTime = 300;
  @Output('click.double') doubleClick = new EventEmitter();

  private clicksSubject = new Subject<MouseEvent>();
  private subscription: Subscription;

  constructor() {}

  ngOnInit() {
    this.subscription =
      this.clicksSubject.pipe(
        debounceTime(this.debounceTime))
        .subscribe(event => {
      if (event.type === 'dblclick') {
        this.doubleClick.emit(event);
      }
    });
  }

  // tried to make code prettier
  // ngOnInit() {
  //   this.subscription = this.clicksSubject.pipe(
  //     debounceTime(this.debounceTime),
  //     filter(event => event.type === 'dblclick')
  //   ).subscribe(this.doubleClick.emit);
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('dblclick', ['$event'])
  doubleClickEvent(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.clicksSubject.next(event);
  }

}
