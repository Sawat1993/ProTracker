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
  @Input() projectDetail: any = {
    name: '',
    managerID: '',
    startDate: '',
    endDate: '',
    projectType: '',
    description:''
  };

  constructor(private service: AsyncHttpService, private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
  }

  save(){
    console.log(this.projectDetail)
  }

}
