import { Component, OnInit } from '@angular/core';
import { AsyncHttpService } from "../provider/async-http.service";
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: any;
  name: string = '';
  code: string = '';
  page = 1;
  size = 10;
  count: number;
  sort = {
    field: 'name',
    order: 'asc'
  }

  constructor(private service: AsyncHttpService, private router: Router) { }

  ngOnInit() {
    this.getProjects();
  }

  editProject(projectId) {
    this.router.navigate(['/projects/' + projectId]);
  }

  viewProject(projectId, name) {
    this.router.navigate(['/project-detail/' + projectId + '/' + name]);
  }

  createProject() {
    this.router.navigate(['/project']);
  }

  nextClick() {
    if (this.page < this.count) this.page++;
    this.getProjects();

  }

  previousClick() {
    if (this.page > 1) this.page--;
    this.getProjects();
  }

  firstClick() {
    this.page = 1;
    this.getProjects();
  }

  lastClick() {
    this.page = this.count;
    this.getProjects();
  }

  getProjects() {
    const option = {
      params: new HttpParams()
        .set('page', (this.page - 1).toString())
        .set('size', this.size.toString())
    }
    this.service.get('http://192.168.216.48:8080/protracker/app/api/projects', option).subscribe(data => {
      this.projects = data.content;
      console.log(this.projects)
      this.count = Math.ceil( data.totalElements / this.size);
    })
  }


  keyDown(e) {
    if (e.keyCode == 13) {
      this.page = 1;
      this.getProjects();
    }
  }

  sortTable(field) {
    if (field == this.sort.field) {
      if (this.sort.order == 'asc') { this.sort.order = 'desc' } else { this.sort.order = 'asc' }
    } else {
      this.sort.field = field;
      this.sort.order = 'asc';
    }
    this.getProjects();
  }


}
