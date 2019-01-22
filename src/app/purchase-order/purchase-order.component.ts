import { Component, OnInit, Input } from '@angular/core';
import { AsyncHttpService } from "src/app/provider/async-http.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {

  title = 'Create PO';
  @Input() poID: any;
  pos = [];
  po: any = {
    qty: '',
    lineNumber: '',
    lineDesc: '',
    rate: '',
    totalAmount: '',
    poAmt: ''
  };


  constructor(private service: AsyncHttpService, private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
      if (this.poID) {
        this.service.get('/assets/data/project.json').subscribe(data => {
          this.title = "Edit PO"
          this.po = data;
        });
      } else {
        const referer = {
          qty: '',
          lineNumber: '',
          lineDesc: '',
          rate: '',
          poAmt: '',
          metaIndex: 1,
          isEditable: true
        };
        this.pos.push(referer);
      }
  }

  addRow() {
    console.log(this.pos);
    if (this.pos.length > 0) {
      if (this.pos[this.pos.length - 1].qty != '' && this.pos[this.pos.length - 1].lineNumber != '') {
        const referer = {
          qty: '',
          lineNumber: '',
          lineDesc: '',
          rate: '',
          poAmt: '',
          metaIndex: '',
          isEditable: true
        };
        this.pos[this.pos.length - 1].isEditable = false;
        this.pos.push(referer)
        this.pos[this.pos.length - 1].metaIndex = this.pos.length;
      }
    } else {
      const referer = {
        qty: '',
        lineNumber: '',
        lineDesc: '',
        rate: '',
        poAmt: '',
        metaIndex: 1,
        isEditable: true
      };
      this.pos.push(referer);
    }
  }

  save() {
    const sendingObject = {
      poNumber: this.po.number,
      poArray: this.pos
    }
    console.log(sendingObject);
  }

  editPO(referenceObj: any) {
    referenceObj.isEditable = !referenceObj.isEditable;
  }

  setValue(ref) {

    ref.poAmt = ref.rate * ref.qty;
  }

  deletePo(type, metaIndex?: any, ) {
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
