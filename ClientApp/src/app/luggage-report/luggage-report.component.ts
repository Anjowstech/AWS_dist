import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-luggage-report',
  templateUrl: './luggage-report.component.html',
  styleUrls: ['./luggage-report.component.css']
})
export class LuggageReportComponent implements OnInit {
  AssignedTaskList = [
    { ID: "1", ItemCode: "P001", Description: "4 Wheel Hard trolly 55cm ", Brand: "American Tourister", ClassA_Lulu: "279", ClassA_Carrefour: "229", ClassA_UnionCoop: "0", Ecommerce_Amozon: "299", Ecommerce_Noon: "299", Average: "0", Promotion_size: "20'/24'/28", Brand_1: "Sky bags", Store: "Flipkart", Prices: "0" },
    { ID: "2", ItemCode: "P001", Description: "4 Wheel Hard trolly 55cm Green", Brand: "Delsey", ClassA_Lulu: "299", ClassA_Carrefour: "229", ClassA_UnionCoop: "229", Ecommerce_Amozon: "299", Ecommerce_Noon: "237", Average: "0", Promotion_size: "20'/24'/28", Brand_1: "Senator", Store: "Carrefour", Prices: "275" },
    { ID: "3", ItemCode: "P001", Description: "ABS Wheel Hard trolly 20inc ", Brand: "Wagon", ClassA_Lulu: "149", ClassA_Carrefour: "0", ClassA_UnionCoop: "0", Ecommerce_Amozon: "271", Ecommerce_Noon: "0", Average: "0", Promotion_size: "20'/24'/28", Brand_1: "My Choice", Store: "Carrefour", Prices: "249" },
    { ID: "4", ItemCode: "P001", Description: "4 Wheel Hard trolly 55cm silver", Brand: "senator", ClassA_Lulu: "0", ClassA_Carrefour: "0", ClassA_UnionCoop: "0", Ecommerce_Amozon: "0", Ecommerce_Noon: "99", Average: "0", Promotion_size: "20'/24'/28", Brand_1: "Senator", Store: "amazon", Prices: "365" },
    { ID: "5", ItemCode: "P001", Description: "4 Wheel Hard trolly 55cm silver ", Brand: "Carton", ClassA_Lulu: "129", ClassA_Carrefour: "95", ClassA_UnionCoop: "0", Ecommerce_Amozon: "79", Ecommerce_Noon: "199", Average: "0", Promotion_size: "20'/24'/28", Brand_1: "Senator", Store: "amazon", Prices: "345" },
    { ID: "6", ItemCode: "P001", Description: "4 Wheel Hard trolly 55cm red", Brand: "VIP", ClassA_Lulu: "229", ClassA_Carrefour: "162", ClassA_UnionCoop: "0", Ecommerce_Amozon: "139", Ecommerce_Noon: "0", Average: "0", Promotion_size: "20'/24'/28", Brand_1: "VIP", Store: "amazon", Prices: "730" },
  ];

  viewMode: any;
  constructor() { }

  ngOnInit() {
  }
}
