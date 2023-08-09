import {Component, OnInit} from '@angular/core';
import {StateService} from "./services/state.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ay 7aga';
  state = '';

  constructor(private stateService: StateService) {
  }

  ngOnInit(): void {
    this.stateService.getState().subscribe(
      value => {
        this.state = value;
      }
    )
  }
}
