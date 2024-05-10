import { Component, OnInit } from '@angular/core';
import { MsgBoxComponent } from 'src/app/msg-box/msg-box.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReOrderPopUpComponent } from 'src/app/re-order/re-order-pop-up/re-order-pop-up.component';


@Component({
  selector: 'app-re-order',
  templateUrl: './re-order.component.html',
  styleUrls: ['./re-order.component.css']
})
export class ReOrderComponent implements OnInit {

  i: number=0;
  j: number=0;
  Qtyval: any="0";

  ReorderData = [{ TaskID: "1", TaskName: "Sweets and Salty Savoury", Supplier: "Chocovic", Location: "India", PMI: "Chocovic", Name: "Sahil Gupta", Designation: "General Manager", ContactNo: "9876543210", Status: "Branding Completed", PurOrderNo: "PO00N001", PurOrderDt: "13/04/2024",CurrentQty:"50",OrderLevel:"80",CurrentCost:"0",SelectedQty:"0",Cost:"5.25" },
    { TaskID: "2", TaskName: "Tea", Supplier: "GoodLife", Location: "USA", PMI: "Esah(Rulio Tea Company)", Name: "Bijit Sharma", Designation: "CEO", ContactNo: "9876543210", Status: "Inventory Check", PurOrderNo: "PO00N002", PurOrderDt: "12/04/2024", CurrentQty: "80", OrderLevel: "100", CurrentCost: "0", SelectedQty: "0", Cost: "10.50"  },
    { TaskID: "3", TaskName: "Dates", Supplier: "Golden Target", Location: "Moracco", PMI: "Cooperative Mahi Coop", Name: "Mandar Tilak", Designation: "Marketing Manager", ContactNo: "9876543210", Status: "Order Assembly", PurOrderNo: "PO00N003", PurOrderDt: "11/04/2024", CurrentQty: "150", OrderLevel: "200", CurrentCost: "0", SelectedQty: "0", Cost: "20.75"},
    { TaskID: "4", TaskName: "Coffee", Supplier: "Fanna Tech", Location: "Brazil", PMI: "Worldwide Trade Solutions", Name: "Saneesh Thomas", Designation: "Sales Manager", ContactNo: "9876543210", Status: "Reached Warehouse", PurOrderNo: "PO00N004", PurOrderDt: "10/04/2024", CurrentQty: "20", OrderLevel: "50", CurrentCost: "0", SelectedQty: "0", Cost: "50.22" },
    { TaskID: "5", TaskName: "Syrups", Supplier: "Wink", Location: "Mexico", PMI: "Chocovic", Name: "Jessica garcia", Designation: "Operations Manager", ContactNo: "9876543210", Status: "Quality Check", PurOrderNo: "PO00N005", PurOrderDt: "9/04/2024", CurrentQty: "70", OrderLevel: "100", CurrentCost: "0", SelectedQty: "0", Cost: "100.78"},
    { TaskID: "6", TaskName: "Almond Oil", Supplier: "Delta Foods", Location: "Germany", PMI: "Esah(Rulio Tea Company)", Name: "Joseph", Designation: "Engineer", ContactNo: "9876543210", Status: "Order Batch Processing", PurOrderNo: "PO00N006", PurOrderDt: "8/04/2024", CurrentQty: "200", OrderLevel: "40", CurrentCost: "0", SelectedQty: "0", Cost: "150.65"  },
    { TaskID: "7", TaskName: "Popcorn", Supplier: "Chocovic", Location: "Spain", PMI: "Cooperative Mahi Coop", Name: "Fatima", Designation: "Head of Export", ContactNo: "9876543210", Status: "Clearence InProgress", PurOrderNo: "PO00N007", PurOrderDt: "7/04/2024", CurrentQty: "60", OrderLevel: "100", CurrentCost: "0", SelectedQty: "0", Cost: "200.88" },
  ];

  constructor(private router: Router,public dialog: MatDialog) { }


  SetCost(Qtyval:any, PONo:any) {

    this.Qtyval = Qtyval.target.value;

    if (Number(this.Qtyval) < 0) {
      this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: 'Quantity should be above 0' } });
      Qtyval.target.value = 0;
    }
    else {
      this.i = 0;
      this.j = 0;
      for (let item of this.ReorderData) {
        if (item.PurOrderNo == PONo) {
          if (Number(Qtyval.target.value) <= Number(item.OrderLevel)) {
            var val = (Number(Qtyval.target.value) * Number(item.Cost)).toString();
            item.CurrentCost = val;
            item.SelectedQty = Qtyval.target.value;
          }

          else {
            this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: 'Quantity should not exceed the Limit Level' } });
            Qtyval.target.value = item.OrderLevel;
          }
        }
        this.i++;
      }
    }

  }

  RedirectToOrderMng(Qtyval:any, rowvalue:any) {
    if (Number(Qtyval) == 0) {
      this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: 'Please select the quantity' } });
    }
    else {
      var data = [rowvalue, Qtyval]

      const dialogRef = this.dialog.open(ReOrderPopUpComponent, {
        height: "auto",
        width: '40%',
        data: { displaydata: data }, disableClose: true
      });
    }
  }


  ngOnInit() {

  }

}
