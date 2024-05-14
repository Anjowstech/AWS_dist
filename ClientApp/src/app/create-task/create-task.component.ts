import { Component } from '@angular/core';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  constructor() { }
  currentDate: any;
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
