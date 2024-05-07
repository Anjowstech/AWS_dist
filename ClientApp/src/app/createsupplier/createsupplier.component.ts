import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-createsupplier',
  templateUrl: './createsupplier.component.html',
  styleUrls: ['./createsupplier.component.css']
})

  
export class CreatesupplierComponent {
  currentDate: Date = new Date();
  constructor(private matDialog: MatDialog) { }
  closeDialog(): void {
    this.matDialog.closeAll();
  }
  placeholderText: string = 'Custom Placeholder';
  showDatePickerFlag: boolean = false;

  openDatePicker() {
    this.showDatePickerFlag = !this.showDatePickerFlag; // Toggle the visibility of the date picker
  }

  handleDateChange(event: any) {
    console.log('Selected date:', event.target.value);
  }

  handleFileInput(event: any) {
    const files: FileList = event.target.files;
    this.uploadFiles(files);
  }

  handleDrop(event: any) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    this.uploadFiles(files);
  }

  allowDrop(event: any) {
    event.preventDefault();
  }

  uploadFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Here you can implement your logic to upload each file
      console.log('Uploading file:', file);
    }
  }

  ngOnInit() {
  }
}

