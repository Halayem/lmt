import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-experiance-list',
  templateUrl: './user-experiance-list.component.html',
  styleUrls: ['./user-experiance-list.component.scss']
})
export class UserExperianceListComponent implements OnInit {

  @Input() projects;
  constructor() { }

  ngOnInit() {
  }

}
