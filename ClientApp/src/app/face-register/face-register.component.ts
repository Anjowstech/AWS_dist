import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataShareServiceService } from 'src/app/data-share-service.service';

@Component({
  selector: 'app-face-register',
  templateUrl: './face-register.component.html',
  styleUrls: ['./face-register.component.css']
})
export class FaceRegisterComponent {
  @ViewChild("videoC", { static: true })
  public videoC!: ElementRef;
  @ViewChild("canvas", { static: true })
  public canvas!: ElementRef;

  captures: string[] = [];
  isCaptured: boolean = true;
  isRecord: boolean = false;
  response: string = "";
  imageString = '';
  faceApiResponse: Observable<string> | undefined;
  filestream: any;

  Userlist: string[] = [];
  Username: string = "";
  Password: string = "";

  constructor(
    private router: Router, private http: HttpClient, private datashare: DataShareServiceService, private matDialog: MatDialog) { }


  async setupcamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stram = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        if (stram) {
          this.videoC.nativeElement.srcObject = stram;
          this.videoC.nativeElement.play();

        }
        else {

        }
      }
      catch (e) {
        console.log(e);
        alert("No Camera Found")
        this.matDialog.closeAll();
      }


    }


  }


  register() {
    this.drawImageToCanvas(this.videoC.nativeElement);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
    this.isCaptured = false;
    this.isRecord = true;

  }
  drawImageToCanvas(image: any) {
    this.canvas.nativeElement.getContext("2d").drawImage(image, 0, 0, 450, 450);

  }


  

 


  async stop() {
    const stram = await navigator.mediaDevices.getUserMedia({
      video: true
    });


    if (stram.getAudioTracks) {
      stram.getAudioTracks().forEach((track: any) => {
        track.stop();
      });
    }

    if (stram.getVideoTracks) {
      stram.getVideoTracks().forEach((track: any) => {
        track.stop();
      });
    }

  }

  FaceRegister() {

    this.captures = [];

    this.drawImageToCanvas(this.videoC.nativeElement);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));

    const BASE64_MARKER = ';base64,';
    const parts = this.captures[0].split(BASE64_MARKER);
    const contentType = parts[1];

    this.RegisterBioMetric(contentType).subscribe((RegisterBioMetric) => {
      console.warn("RegisterBioMetric", RegisterBioMetric)
      var RegisterResult = RegisterBioMetric

      if (RegisterResult == "Registered Successfully") {
        alert("Registered Successfully");
      }


    })


  }

  RegisterBioMetric(ImageString: string) {
    var usern: string = ImageString;
    var fd = new FormData();
    fd.set('Userstream', usern);
    fd.set('Username', this.Username);
    fd.set('Password', this.Password);
    return this.http.post("https://awsfaceapilogin.azurewebsites.net/RegisterFaceLogin", fd, { responseType: 'text' })
  }

  ngOnInit(): void {

    this.Userlist = this.datashare.getpdrlist();
    this.Username = this.Userlist[0];
    this.Password = this.Userlist[1];


    this.videoC.nativeElement = document.getElementById('videoC');
    console.log(this.videoC.nativeElement);
    this.setupcamera();
  }
}
