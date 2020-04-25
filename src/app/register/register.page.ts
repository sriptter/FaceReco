import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ActionSheetController, NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'
import { AlertService } from '../services/http/alert/alert.service';
import { AuthenticationService } from '../services/http/authentication/authentication.service';
 


declare var faceapi;
  
//loading models localy in ionic public assets folder
//const MODEL_URL = 'assets/models';
//loading models form server
const MODEL_URL = 'https://www.techbuildz.com/models'
//loading models form local hosted server
//const MODEL_URL = 'faceapi.test/face_api_models';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  @ViewChild('registerImage', {static: true, read: ElementRef}) registerImage: ElementRef;

   public form = {
     name: null,
     email: null,
     password: null,
     image: null
   };
   public response: any;

  constructor(
             private router: Router,
             private loadingCtrl: LoadingController,
             private navCtrl: NavController,
             private actionSheetCtrl: ActionSheetController,
             private camera: Camera,
             private alert: AlertService,
             private authSrv: AuthenticationService
             ) { }

     ngOnInit() {
    //This work on the ngOnInit
    /*console.log('faceapi', faceapi);
    //let userImage = document.getElementById('user_image');
    let userImage = this.registerImage.nativeElement.querySelector('#user_image');
    console.log('============models loadind===================', faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL));
    console.log('====userimage======',userImage);
    await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    const checkImage = await faceapi.detectAllFaces(userImage);
    console.log(checkImage);
    if (!checkImage.length) {
        console.log("===========No Faces detected=========");

    }

    if (checkImage.length > 1) {
        console.log('===========Many Faces detected==========');

    }
    console.log('=====single face detected=========');*/
  }


onLogin() {
  this.router.navigate(['/login']);
}
 async loadActionSheet() {
   const actionSheet = await this.actionSheetCtrl.create({
     header: 'Choose an image',
     buttons: [{
       text: 'Camera',
       icon: 'camera',
       handler: () => {
        this.loadCamera();
       }
      },
       {
        text: 'Galery',
        icon: 'images',
        handler: () => {
         this.loadFileChooser();
      }
    },
    {
      text: 'Cancel',
      role: 'close',
      icon: 'close',
      handler: () => {
        console.log('cancel was clicked');
    }
  }]
   });

   await actionSheet.present();
 }

 loadFileChooser() {
  console.log('file chooser was clicked');

  let cameraOptions = this.cameraOptions(this.camera.PictureSourceType.PHOTOLIBRARY);
  this.camera.getPicture(cameraOptions).then(async (imageData) => {

    console.log(imageData);
    let finalData = 'data:image/jpeg;base64'+imageData;
    this.form.image = finalData;
    let userImage = this.registerImage.nativeElement.querySelector('#user_image');

    const loading = await this.loadingCtrl.create({message: 'Face detection in progress...', spinner: 'crescent'});
    loading.present().then(  async () => {

      await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      const checkImage = await faceapi.detectAllFaces(userImage);
      console.log(checkImage);
      if (!checkImage.length) {
      loading.dismiss();
      return this.alert.presentAlert('Error', 'Error', 'No face had been detected');

    }

      if (checkImage.length > 1) {
      loading.dismiss();
      return this.alert.presentAlert('Error', 'Error', 'Only a single face is accepted');

    }
      loading.dismiss();
    });
  });

 }

cameraOptions(sourceType) {
  let options: CameraOptions = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true,
    allowEdit: false,
    destinationType: this.camera.DestinationType.DATA_URL,
    mediaType: this.camera.MediaType.PICTURE,
    encodingType: this.camera.EncodingType.JPEG,
    targetHeight: 500,
    targetWidth: 500
  };

  return options;
}

 loadCamera() {
  console.log('camera was clicked');
  let cameraOptions = this.cameraOptions(this.camera.PictureSourceType.CAMERA);
  this.camera.getPicture(cameraOptions).then( async (imageData) => {
  console.log(imageData);
  let finalData = 'data:image/jpeg;base64'+imageData;
  this.form.image = finalData;
  let userImage = this.registerImage.nativeElement.querySelector('#user_image');

  const loading = await this.loadingCtrl.create({message: 'Face detection in progress...', spinner: 'crescent'});
  loading.present().then(  async () => {

      await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      const checkImage = await faceapi.detectAllFaces(userImage);
      console.log(checkImage);
      if (!checkImage.length) {
      loading.dismiss();
      return this.alert.presentAlert('Error', 'Error', 'No face was detected');

    }

      if (checkImage.length > 1) {
      loading.dismiss();
      return this.alert.presentAlert('Error', 'Error', 'Only single face is accepted');

    }
      loading.dismiss();

    }, err => {
      this.alert.presentAlert('Erreur', 'Erreur', 'There seems a problem. Please try it later ');
      console.log(err);
    });
  });
}

  async register() {
    console.log('clicked register', this.form);
    const loading = await this.loadingCtrl.create({message: 'Account creation in progress. Please wait...', spinner: 'crescent'});
    loading.present().then(async () => {
      this.authSrv.register(this.form).then((data) => {
        console.log(data);
        this.response = data;
        if (this.response.hasOwnProperty('success') && this.response.success === true) {
          loading.dismiss();
          this.alert.presentAlert('Success', 'new user', this.response.message);
          this.navCtrl.back({animated: true, animationDirection: 'back'});
        } else {
          loading.dismiss();
          this.alert.presentAlert('Error', 'Account creation failed.', this.response.message);
        }
      }, err => {

        console.log(err);
        loading.dismiss();
        this.response = err;

        if (this.response.hasOwnProperty('error') && this.response.error.success === false) {
          if (this.response.error.message.hasOwnProperty('image')) {
            for ( let data of this.response.error.message.image) {
          this.alert.presentAlert('Error', 'Error', data);

           }
          } else {

          this.alert.presentAlert('Error', 'Error', this.response.error.message);

          }

        } else {
        this.alert.presentAlert('Error', 'Connection error', 'There seems to be a problem, please check your network connection');
        }
       /* if ( this.response.hasOwnProperty('error') && this.response.error.message.hasOwnProperty('password')) {

            this.alert.presentAlert('Error', 'Erreur', this.response.error.message.password);

        } */
      });
    });
    }

}
