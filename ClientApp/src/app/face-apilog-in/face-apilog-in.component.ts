import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
//import { FaceRecognitionService } from '../service/face-recognition.service';
//import { FaceRecognitionResponse } from '../models/face.model';
//import { DesktopCameraService } from '../service/desktop-camera.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataShareServiceService } from 'src/app/data-share-service.service';


@Component({
  selector: 'app-face-apilog-in',
  templateUrl: './face-apilog-in.component.html',
  styleUrls: ['./face-apilog-in.component.css']
})


export class FaceAPILogInComponent implements OnInit {

  @ViewChild("videoC", { static: true })
  public videoC!: ElementRef;
  @ViewChild("canvas", { static: true })
  public canvas!: ElementRef;

  @ViewChild("img", { static: true })
  public img!: ElementRef;


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

  stram: any;

  constructor( private router: Router, private http: HttpClient, private datashare: DataShareServiceService) { }


  async setupcamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        this.stram = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        if (this.stram) {
          this.videoC.nativeElement.srcObject = this.stram;
          this.videoC.nativeElement.play();

        }
        else {

        }
      }
      catch (e) {
        console.log(e);
        alert('No Camera Found');
        this.router.navigate(['/login']);
      }
      
        
    }

    
  }


  register() {
    this.captures = [];
    this.drawImageToCanvas(this.videoC.nativeElement);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
    this.isCaptured = false;
    this.isRecord = true;

    if (this.stram.getVideoTracks) {
      this.stram.getVideoTracks().forEach((track: any) => {
        track.stop();
      });
    }


    this.img.nativeElement = document.getElementById('img');
    this.img.nativeElement.src = this.captures[0];
  }
  drawImageToCanvas(image: any) {
    this.canvas.nativeElement.getContext("2d").drawImage(image, 0, 0, 450, 450);
    
  }

  Retake() {
    this.setupcamera();
    this.isCaptured = true;
    this.isRecord = false;
  }

 
  BioMetriclogin() {

    this.drawImageToCanvas(this.videoC.nativeElement);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));

    this.imageString = this.captures[0];
    console.log(this.imageString);
    const BASE64_MARKER = ';base64,';
    const parts = this.imageString.split(BASE64_MARKER);
    const contentType = parts[1];

    this.VerifyBioMetric(contentType).subscribe((userdetails) => {
      console.warn("userdetails", userdetails)
      var FaceMatch = userdetails


      const facematchper = FaceMatch.split(',');
      var facematchpercntg = facematchper[0];
      var userID = facematchper[1];

      alert(facematchpercntg);

      if (Number(facematchpercntg) < 75) {
         this.response = "No Match Detected";
         alert("No Match detected");
        //this.router.navigate(['/main/TaskList']);
      }
      else {
        if (this.stram.getVideoTracks) {
          this.stram.getVideoTracks().forEach((track: any) => {
            track.stop();
          });
        }
        this.router.navigate(['/main/TaskList']);
      }
    })
  }

  VerifyBioMetric(ImageString: string) {
    var usern: string = ImageString;
    var fd = new FormData();
    fd.set('User', usern);
    fd.set('Username', this.Username);
    fd.set('Password', this.Password);
    return this.http.post("https://awsfaceapilogin.azurewebsites.net/CompareCosmosData", fd, { responseType:'text' })
  }


  FaceRegister() {
    const BASE64_MARKER = ';base64,';
    const parts = this.captures[0].split(BASE64_MARKER);
    const contentType = parts[1];
    this.RegisterBioMetric(contentType).subscribe((RegisterBioMetric) => {
      console.warn("RegisterBioMetric", RegisterBioMetric)
      var RegisterResult = RegisterBioMetric
      if (RegisterResult == "Registered Successfully") {
        alert("Registered Successfully");
        this.router.navigate(['/main/TaskList']);
      }
      else {
        alert("Failed, Try Again");
        this.Retake();
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
    this.canvas.nativeElement = document.getElementById('canvas');

  }
}
