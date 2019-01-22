import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncHttpService } from "../provider/async-http.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @Input() title: any = 'Create Project';
  @Input() projectID: any;
  projectDetail: any = {
    name: '',
    managerID: '',
    startDate: '',
    endDate: '',
    projectType: '',
    description: ''
  };

  constructor(private service: AsyncHttpService, private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    this.service.get('/assets/data/project.json').subscribe(data => {
      this.projectDetail = data;
    })
  }

  save() {
    console.log(this.projectID)
  }

}

