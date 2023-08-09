import {Component, Input, OnInit, Output} from '@angular/core';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  counter = 0;
  @Input()
  in = 'empty string';

  @Output()
  out = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  do() {
    this.counter++;
    this.out.emit(this.counter)
  }

}
