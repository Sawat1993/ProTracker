import { Component, OnInit } from '@angular/core';
import { AsyncHttpService } from "src/app/provider/async-http.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  title = 'Create Invoice';
  invoices = []
  invoice: any = {
    id: '',
    poId: '',
    quantity: '',
    description: '',
    month: ''
  };

  constructor(private service: AsyncHttpService, private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.service.get('/assets/data/project.json').subscribe(data => {
          this.title = "Edit Invoice"
          this.invoice = data;
        });
      } else {
        const referer = {
          id: '',
          poId: '',
          quantity: '',
          description: '',
          month: '',
          metaIndex: 1,
          isEditable: true
        };
        this.invoices.push(referer);
      }
    })
  }

  addRow() {
    console.log(this.invoices);
    if (this.invoices.length > 0) {
      if (this.invoices[this.invoices.length - 1].quantity != '' && this.invoices[this.invoices.length - 1].month != '') {
        const referer = {
          id: '',
          poId: '',
          quantity: '',
          description: '',
          month: '',
          metaIndex: '',
          isEditable: true
        };
        this.invoices[this.invoices.length - 1].isEditable = false;
        this.invoices.push(referer)
        this.invoices[this.invoices.length - 1].metaIndex = this.invoices.length;
      }
    } else {
      const referer = {
        id: '',
        poId: '',
        quantity: '',
        description: '',
        month: '',
        metaIndex: 1,
        isEditable: true
      };
      this.invoices.push(referer);
    }
  }

  save() {
     const sendingObject = {
      invoiceId: this.invoice.id,
      invoiceArray: this.invoices
    }
    console.log(sendingObject)
  }

  editInvoice(referenceObj: any) {
    referenceObj.isEditable = !referenceObj.isEditable;
  }

  // setValue(ref) {
   
  //   ref.poAmt = ref.unit * ref.qty;
  // }

  deleteInvoice(type, metaIndex?: any,) {
    if (type === 'Create Invoice') {
      this.invoices.forEach((val, index) => {
        if (val.metaIndex == metaIndex) {
          this.invoices.splice(index, 1);
          console.log(this.invoices);
        }
      })
    }
  }

}
