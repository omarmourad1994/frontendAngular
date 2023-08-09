import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private myBehaviorSubject = new BehaviorSubject<string>('default value');

  constructor() {
  }

  setState(value: string) {
    this.myBehaviorSubject.next(value);
  }

  getState() {
    return this.myBehaviorSubject.asObservable();
  }
}
