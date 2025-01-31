import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private screenSizeSubject = new BehaviorSubject<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  screenSize$ = fromEvent(window, 'resize')

  constructor() {}

/*   @HostListener('window:resize', ['$event'])
  onResize(): void {
    console.log('Resize event detected');
    this.screenSizeSubject.next({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  } */
}