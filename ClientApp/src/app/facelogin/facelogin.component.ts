import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DesktopCameraService } from '../service/desktop-camera.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-facelogin',
  templateUrl: './facelogin.component.html',
  styleUrls: ['./facelogin.component.css']
})
export class FaceloginComponent {
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

  constructor(private cameraService: DesktopCameraService, private router: Router, private http: HttpClient) { }


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

      if (Number(facematchpercntg) < 80) {
        this.response = "No Match Detected";
        alert("No Match detected");
      }
      else {
        this.router.navigate(['/main/TaskList']);
      }
    })
  }

  VerifyBioMetric(ImageString: string) {
    var usern: string = ImageString;
    var fd = new FormData();
    fd.set('User', usern);
    return this.http.post("https://awsfaceapilogin.azurewebsites.net/AWSLogIn", fd, { responseType: 'text' })
  }



  async stop() {
    const stram = await navigator.mediaDevices.getUserMedia({
      video: false
    });
  }

  ngOnInit(): void {
    this.videoC.nativeElement = document.getElementById('videoC');
    console.log(this.videoC.nativeElement);
    this.setupcamera();
  }
}
