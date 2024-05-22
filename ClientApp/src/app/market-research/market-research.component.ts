import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CameraComponent } from '../camera/camera.component'
import { ViewImagesComponent } from '../view-images/view-images.component'





@Component({
  selector: 'app-market-research',
  templateUrl: './market-research.component.html',
  styleUrls: ['./market-research.component.css']
})
export class MarketResearchComponent implements OnInit  {
  datapcc: any = [];
  OrderManagementList: any = []
  Auditlist: any = [];
  active: any;
  productdescription: any;
  ngtaskname: any;
  ngproduct: any;
  picturefile1: any;
  ngcategory: any;
  ngstatus: any;
  item: any;
  ngassigneddate: any;
  constructor(public dialog: MatDialog) { }
  opencamera() {
    const dialogRef = this.dialog.open(CameraComponent, {
      width: '50%', height: '70%', disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      //     console.log('The dialog was closed', result);

      if (result != "") {
      
      }
    });
  }
  viewimages() {
    const dialogRef = this.dialog.open(ViewImagesComponent, {
      width: '50%', height: '70%', disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      //     console.log('The dialog was closed', result);

      if (result != "") {

      }
    });
  }
  ngOnInit() {

    this.datapcc = [{ Itemno: "1", Information: "Product Description & Codes or Formulation Code", CheckOff: false, checked: "", UserName: "", locked: "E" },
    { Itemno: "2", Information: "Product formula including %'s, INCI names, Trade Names and Suppliers", CheckOff: false, checked: "", UserName: "", locked: "E" },
    { Itemno: "3", Information: "Perfumes - 26 potential allergens content list from perfume supplie", CheckOff: false, checked: "", UserName: "", locked: "E" },
    { Itemno: "4", Information: "INCI list with %'s", CheckOff: false, checked: "", UserName: "", locked: "E" },
    { Itemno: "5", Information: "Stability Summary,  with reference to methods(this usually shows the stability at ambient 30C, 40C, freeze-thaw etc.)", CheckOff: false, checked: "", UserName: "", locked: "E" },
    { Itemno: "6", Information: "Manufacturing Procedure summary", CheckOff: false, checked: "", UserName: "", locked: "E" },
    { Itemno: "7", Information: "Specification - Viscosity, pH and other test data listed", CheckOff: false, checked: "", UserName: "", locked: "E" },

    { Itemno: "8", Information: "Labeling requirements", CheckOff: false, checked: "", UserName: "", locked: "E" },
    { Itemno: "9", Information: "Product Testing Results - Microbiological Challenge test records for products that contain water", CheckOff: false, checked: "", UserName: "", locked: "E" },
    { Itemno: "10", Information: "Content - declare in g. or ml.", CheckOff: false, checked: "", UserName: "", locked: "E" },
    { Itemno: "11", Information: "Claim Substantiation summary with refererences (this is proof that pack claims are able to be substantiated)", CheckOff: false, checked: "", UserName: "", locked: "E" },
    { Itemno: "12", Information: "Proposed pack copy or artwork for each carton and label (make sure claims in Pack copy are checked)", CheckOff: false, checked: "", UserName: "", locked: "E" },
    { Itemno: "13", Information: "PAO (Product After Opening) time or best before date (Minimum Durability)", CheckOff: false, checked: "", UserName: "", locked: "E" },
    { Itemno: "14", Information: "Product Safety Assessment Statement - Executive Summary", CheckOff: false, checked: "", UserName: "", locked: "E" },
    { Itemno: "15", Information: "Legal Compliance for Annex III restricted materials, colors & preservatives and sunscreen (CIR Panel review, preservative, sunscreen and color legal compliance check)", CheckOff: false, checked: "", UserName: "", locked: "E" },
    { Itemno: "16", Information: "A picture of the final product should appear in the PCC (as this will be required when on-line registration is available)", CheckOff: false, checked: "", UserName: "", locked: "E" },
    { Itemno: "17", Information: "Perfumes and Flavors should have IFRA and/or RFIM compliance statements from the perfume shop", CheckOff: false, checked: "", UserName: "", locked: "E" },
    { Itemno: "18", Information: "Raw Material ingredient specifications and technical data sheets", CheckOff: false, checked: "", UserName: "", locked: "E" },
    { Itemno: "19", Information: "Summary of GMP statement(a statement on company letter head declaring ISO standards and/or GMP compliance)", CheckOff: false, checked: "", UserName: "", locked: "E" },
    { Itemno: "20", Information: "The product must not have been tested on animals", CheckOff: false, checked: "", UserName: "", locked: "E" },
    { Itemno: "21", Information: "The assessments has assumed that the raw materials are of Cosmetic or Pharmaceutical grade and are low in impurities", CheckOff: false, checked: "", UserName: "", locked: "E" },
    { Itemno: "22", Information: "Miscellaneous Information for Product Info. File", CheckOff: false, checked: "", UserName: "", locked: "E" }
    ]



    this.OrderManagementList = [
      { TaskID: "1", TaskName: "Sweets ", Supplier: "Marketing Research In-Progress ", Location: "Purchase Manager", PMI: "24/4/2024", Name: "Sahil Gupta", Designation: "GM", ContactNo: "9876543210", Status: "Branding InProgress", PurOrderNo: "Jams" },
      

    ];

    
    this.Auditlist = [
      { Date: "17/4/2024", TaskName: "TaskName: Sweets and Salty Savoury Branding is InProgress", Username: "Admin" },
      { Date: "16/4/2024", TaskName: "TaskName: Tea Branding is InProgress", Username: "Admin" },
      { Date: "13/4/2024", TaskName: "TaskName: Dates Branding is InProgress", Username: "Admin" },
      { Date: "12/4/2024", TaskName: "TaskName: Coffee Branding is InProgress", Username: "Admin" },
      { Date: "11/4/2024", TaskName: "TaskName: Syrups Branding is InProgress", Username: "Admin" },
      { Date: "10/4/2024", TaskName: "TaskName: Almond Oil Branding is InProgress", Username: "Admin" },
      { Date: "09/4/2024", TaskName: "TaskName: Popcorn Branding Completed", Username: "Admin" },

    ];
  }

}

