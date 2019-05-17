import { Component, OnInit } from '@angular/core';
import { Router } from '@Angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

}
