import { Component, OnInit } from '@angular/core';
import { AsyncHttpService } from "src/app/provider/async-http.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {

  title = 'Create PO';
  pos = [];
  po: any = {
    id: '',
    qty: '',
    unit: '',
    totalAmount: '',
    poAmt: ''
  };
  

  constructor(private service: AsyncHttpService, private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.service.get('/assets/data/project.json').subscribe(data => {
          this.title = "Edit PO"
          this.po = data;
        });
      } else {
        const referer = {
          id: '',
          qty: '',
          unit: '',
          poAmt: '',
          metaIndex: 1,
          isEditable: true
        };
        this.pos.push(referer);
      }
    })
  }

  addRow() {
    console.log(this.pos);
    if (this.pos.length > 0) {
      if (this.pos[this.pos.length - 1].qty != '' && this.pos[this.pos.length - 1].unit != '') {
        const referer = {
          id: '',
          qty: '',
          unit: '',
          poAmt: '',
          metaIndex: '',
          isEditable: true
        };
        this.pos[this.pos.length - 1].isEditable = false;
        this.pos.push(referer)
        this.pos[this.pos.length -1].metaIndex = this.pos.length;
      }
    } else {
      const referer = {
          id: '',
          qty: '',
          unit: '',
          poAmt: '',
          metaIndex: 1,
          isEditable: true
        };
        this.pos.push(referer);
    }
  }

  save() {
    const sendingObject = {
      poId: this.po.id,
      poArray: this.pos
    }
    console.log(sendingObject);
  }

  editPO(referenceObj: any) {
    referenceObj.isEditable = !referenceObj.isEditable;
  }

  setValue(ref) {
   
    ref.poAmt = ref.unit * ref.qty;
  }

  deletePo(type, metaIndex?: any,) {
    if (type === 'Create PO') {
      this.pos.forEach((val, index) => {
        if (val.metaIndex == metaIndex) {
          this.pos.splice(index, 1);
          console.log(this.pos);
        }
      })
    }
  }

}
