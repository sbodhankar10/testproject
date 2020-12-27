import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private route: Router, private myservice: MyserviceService) { }
  loginForm:FormGroup;
  hide = true;
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password:['', Validators.required],
    });
  }

  loginUser(values){
    this.myservice.loginAuthUser(values).subscribe( res=> {
      let data = res as any;
      console.log(data);

      if(data.status === 'success'){
         localStorage.setItem('mtoken', data.token);
         localStorage.setItem('uid', data.uid);
         this.route.navigate(['image-gallery']);
        }
      this.myservice.callToast(data.message,"success");
    },error=> this.myservice.callToast(error.error.message,"error") );
  }

}
