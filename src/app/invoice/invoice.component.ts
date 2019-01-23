import { Component, OnInit, Input } from '@angular/core';
import { AsyncHttpService } from "src/app/provider/async-http.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  @Input() inID: any;
  title = 'Create Invoice';
  invoices = []
  invoice: any = {
    id: '',
    projectCode: '',
    monthYear: '',
    poNumber: '',
    amount: '',
    startDate: '',
    endDate: ''
  };

  poNumbers = [
    "2104",
    "2105",
    "2106",
    "2107",
    "2108",
    "2109",
    "21010",
    "21011"
  ]

  projectCodes = [
    "B2104",
    "C2104",
    "D2104",
    "E2104",
    "F2104",
    "G2104",
    "G2104",
    "I2104"
  ]

  constructor(private service: AsyncHttpService, private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
      if (this.inID) {
        this.service.get('/assets/data/project.json').subscribe(data => {
          this.title = "Edit Invoice"
          this.invoice = data;
        });
      } else {
        const referer = {
          id: '',
          projectCode: '',
          monthYear: '',
          poNumber: '',
          amount: '',
          startDate: '',
          endDate: '',
          metaIndex: 1,
          isEditable: true
        };
        this.invoices.push(referer);
      }
  
  }

  addRow() {
    console.log(this.invoices);
    if (this.invoices.length > 0) {
      if (this.invoices[this.invoices.length - 1].amount != '' && this.invoices[this.invoices.length - 1].monthYear != '') {
        const referer = {
          id: '',
          projectCode: '',
          monthYear: '',
          poNumber: '',
          amount: '',
          startDate: '',
          endDate: '',
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
        projectCode: '',

        monthYear: '',
        poNumber: '',
        amount: '',
        startDate: '',
        endDate: '',
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

  //   ref.poNumberAmt = ref.unit * ref.qty;
  // }

  deleteInvoice(type, metaIndex?: any, ) {
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
