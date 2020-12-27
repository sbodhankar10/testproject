import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyserviceService } from '../myservice.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  adduserResponse: any;
  hide = true;
  constructor(private fb: FormBuilder, private route: Router, private myservice: MyserviceService) { }
  signUpForm:FormGroup;

  ngOnInit() {
    this.signUpForm = this.fb.group({
      firstname:['',Validators.required],
      lastname:['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      mobileno: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
      city:['', Validators.required],
      password:['', Validators.required],
    });
  }

  addNewUser(allValues){

    this.myservice.AddUser(allValues).subscribe( response => {
    this.adduserResponse = response as any;
    console.log(this.adduserResponse);
    if(this.adduserResponse.status == "success"){
      this.myservice.callToast('User Created successfully','success');
      this.route.navigate(['login']);
    }
    },err => console.log(err))
  }




}
