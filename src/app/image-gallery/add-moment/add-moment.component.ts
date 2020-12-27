import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MyserviceService } from '../../myservice.service';

@Component({
  selector: 'app-add-moment',
  templateUrl: './add-moment.component.html',
  styleUrls: ['./add-moment.component.css']
})
export class AddMomentComponent implements OnInit {
  upload: UploadResponse = new UploadResponse();
  isActive: boolean;
  dataId: string;
  titleLine = "Add new moment";
  imgData: any;
  isFileok = false;
  addfiles  : string[] = [];
  fileArray: string[] = [];
  constructor(private fb: FormBuilder, private route: Router, private myservice: MyserviceService,private activeRoute: ActivatedRoute) {
    this.activeRoute.queryParams.subscribe(params => {
      this.dataId = params['id'];
    })
  }

  imgUploadForm:FormGroup;

  ngOnInit() {
    this.imgUploadForm = this.fb.group({
      title:['',Validators.required],
      tag:['',''],
    });

    if(this.dataId){
      this.titleLine = "Update moment";
      this.myservice.getimagedetailswithId(this.dataId).subscribe((res: any) => {
        this.imgData = res.data[0] as any;
        if(this.imgData.filename.length >0){
          this.fileArray.push(this.imgData.filename);
        }

        this.imgUploadForm.controls['title'].setValue(this.imgData.title);
        this.imgUploadForm.controls['tag'].setValue(this.imgData.tag);
      })
     }

  }


  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = true;
  }

  onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = false;
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    let droppedFiles = event.dataTransfer.files;
    if(droppedFiles.length > 0) {
      this.onDroppedFile(droppedFiles)
    }
    this.isActive = false;
  }

  onDroppedFile(droppedFiles: any) {

    for(let item of droppedFiles) {
      let ext = droppedFiles[0].type.split('.').pop();
      if (ext == "image/jpeg" || ext == "image/png"){
        this.addfiles.push(item);
        this.isFileok = true;
      }else{
        this.isFileok = false;
        this.myservice.callToast("Please upload .jpg or .png files","error");
      }
    }
  }

  onSelectedFile(event: any) {
    if (event.target.files.length > 0) {
      this.onDroppedFile(event.target.files);
    }
  }

  updateGallery(){
    let formData = new FormData();
    formData.append('userfiles', JSON.stringify(this.addfiles));
    formData.append('title', this.imgUploadForm.controls['title'].value);
    formData.append('tag', this.imgUploadForm.controls['tag'].value);
    formData.append('uid', this.myservice.getuserID());
    this.myservice.updatetimagedetails(this.dataId, formData).subscribe( response => {
      this.upload = response;
      this.addfiles = [];
      if(this.upload.progress >= 100){
        this.myservice.callToast("Record updated successfully","success");
        this.route.navigate(['/image-gallery/list-moment']);
      }
    }, err => { console.log(err);})
  }

  addTogallery(){
    let formData = new FormData();

    for(let item of this.addfiles) {
    formData.append('userfiles', item);
    }
    formData.append('title', this.imgUploadForm.controls['title'].value);
    formData.append('tag', this.imgUploadForm.controls['tag'].value);
    formData.append('uid', this.myservice.getuserID());
    this.myservice.fileUpload(formData).subscribe(result => {
      this.upload = result;
      this.addfiles = [];
      if(this.upload.progress >= 100){
      this.myservice.callToast("Record added successfully","success");
      this.route.navigate(['/image-gallery/list-moment']);
      }
    }, err => { console.log(err); });
  }

}

export class UploadResponse {
  progress: number;
  files: [];
}
