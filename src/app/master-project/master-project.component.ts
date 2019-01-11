import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncHttpService } from "../provider/async-http.service";

@Component({
  selector: 'app-master-project',
  templateUrl: './master-project.component.html',
  styleUrls: ['./master-project.component.css']
})
export class MasterProjectComponent implements OnInit {

  constructor(private service: AsyncHttpService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      if(params.id) this.service.get('/assets/data/project.json').subscribe(data => {
        console.log(data);
      })
    })
  }

  ngOnInit() {
  }

}
