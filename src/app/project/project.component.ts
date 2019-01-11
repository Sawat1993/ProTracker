import { Component, OnInit } from '@angular/core';
import { AsyncHttpService } from "../provider/async-http.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: any;

  constructor(private service: AsyncHttpService, private router: Router) { }

  ngOnInit() {
    this.service.get('/assets/data/project.json').subscribe(data => {
      this.projects = data.projects;
    })
  }

  editProject(projectId){
    this.router.navigate(['/project-detail/' + projectId]);
  }

  createProject(){
    this.router.navigate(['/admin']);
  }

}
