import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncHttpService } from "../provider/async-http.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-master-project',
  templateUrl: './master-project.component.html',
  styleUrls: ['./master-project.component.css']
})
export class MasterProjectComponent implements OnInit {

  projects: any;
  title : string;
  selected = 'PO';

  constructor(private service: AsyncHttpService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.title = params.name;
    })
  }

  selectPO() {
    this.selected = 'PO'
  }

  selectIN() {
    this.selected = 'IN'
  }

}
