import { Component, OnInit } from '@angular/core';
import { AsyncHttpService } from "../provider/async-http.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  projects: any;

  constructor(private service: AsyncHttpService, private router: Router) { }

  ngOnInit() {
    this.service.get('/assets/data/projects.json').subscribe(data => {
      this.projects = data.projects;
    })
  }

  editPO(id) {
    this.router.navigate(['/invoice/' + id]);
  }

  createPO() {
    this.router.navigate(['/invoice']);
  }
}
