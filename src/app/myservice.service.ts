import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  constructor(private http: HttpClient) { }

   mongoAPIUrl: string = "http://localhost:3000/api";


   getuserID(){
     const uid = localStorage.getItem('uid');
     return uid;
   }

   AddUser(formvalues){
     const params = {
      firstname: formvalues.firstname,
      lastname: formvalues.lastname,
      email: formvalues.email,
      mobileno: formvalues.mobileno,
      city: formvalues.city,
      password: formvalues.password
   }
    return this.http.post(`${this.mongoAPIUrl}/userdetails/add`, params,  {responseType:'json'});
   }

   loginAuthUser(formvalues){
    const params = {
      email: formvalues.email,
      password: formvalues.password
    };

   return this.http.post(`${this.mongoAPIUrl}/userdetails/userLogin`, params,  { responseType: 'json'});
   }


   callToast(MessageTodisplay,type){
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: type,
      title: MessageTodisplay
    })
  }

fileUpload(formData: any) {
  return this.http.post(`${this.mongoAPIUrl}/moments/upload`, formData, {
    reportProgress: true,
    observe: 'events'
  }).pipe(
    map(event => this.getEventMessage(event))
  );
}

private getEventMessage(event: HttpEvent<any>) {
  switch (event.type) {
    case HttpEventType.UploadProgress:
      return this.fileUploadProgress(event);
    case HttpEventType.Response:
      return event.body;
    default:
      return `Upload event: ${event.type}.`;
  }
}

private fileUploadProgress(event: any) {
  const percentDone = Math.round(100 * event.loaded / event.total);
  return { progress: percentDone, files: [] };
}

   getimagedetails(){
     let userid = this.getuserID();
     return this.http.get(`${this.mongoAPIUrl}/moments/view?uid=${userid}`, {responseType:'json'})
   }
   getimagedetailswithId(id: string){
     return this.http.get(`${this.mongoAPIUrl}/moments/view/${id}`, {responseType:'json'})
   }

    updatetimagedetails(id: string, formData){
      return this.http.put(`${this.mongoAPIUrl}/moments/update/${id}`, formData, {
        reportProgress: true,
        observe: 'events',
        responseType: 'json'
      }).pipe(
        map(event => this.getEventMessage(event))
      );

    }

   deleteImageDetails(ID){
     return this.http.delete(`${this.mongoAPIUrl}/moments/delete/${ID}`,{ responseType: 'json'});
   }

}
