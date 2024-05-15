import { Component, OnInit, Inject } from '@angular/core';
/*import { DataShareServiceService } from 'src/app/data-share-service.service';*/


@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent implements OnInit {
  TaskID: any;
  TaskName: any;
  Brand: any;
  Category: any;
  Product: any;
  DueDate: any;
  Assigenddate: any;
  InitiallyAssigned: any;
  CurrentlyAssigned: any;
  Status: any;
  Department: any;
  Images: any;

  isPending: boolean = true;
  isInProgress: boolean = true;
  isCompleted: boolean = true;

  constructor() { }

  ngOnInit() {

  }
}

