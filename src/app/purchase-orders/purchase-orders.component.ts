import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
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
  @Input() projectID: any;
  @Output() emitter: EventEmitter<any> = new EventEmitter();

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
    this.emitter.emit({ event: 'PO-CREATE', id: id });
  }

  createPO() {
    this.emitter.emit({ event: 'PO-CREATE', id: '' });
  }

}
