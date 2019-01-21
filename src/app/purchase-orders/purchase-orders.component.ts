import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncHttpService } from "../provider/async-http.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrls: ['./purchase-orders.component.css']
})
export class PurchaseOrdersComponent implements OnInit {
  projects: any;

  constructor(private service: AsyncHttpService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      if (params.id) this.service.get('/assets/data/projects.json').subscribe(data => {
        this.projects = data.projects;
      })
    })
  }



  editPO(id) {
    this.router.navigate(['/purchase-order/' + id]);
  }

  createPO() {
    this.router.navigate(['/purchase-order']);
  }

}
