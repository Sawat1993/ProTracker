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
  selected = 'PD';
  selectionID = '';
  projectDetail: any;

  constructor(private service: AsyncHttpService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {

      this.activatedRoute.params.subscribe(params => {
        if (params.id) this.service.get('/assets/data/project.json').subscribe(data => {
          this.projectDetail = data;
        })
      })
    })
  }

  selectPO() {
    this.selected = 'PO'
  }

  selectIN() {
    this.selected = 'IN'
  }

  selectPD() {
    this.selected = 'PD'
  }

  selectPC() {
    this.selected = 'PC'
  }

  filter(e){
    this.selected = e.event;
    this.selectionID = e.id;
  }

}
