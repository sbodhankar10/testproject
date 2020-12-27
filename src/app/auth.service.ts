import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private hhtp:HttpClient, private route: Router,private bnIdle: BnNgIdleService) { }

  logOut(){
    localStorage.removeItem('mtoken');
    localStorage.removeItem('uid');
    this.bnIdle.stopTimer();
    this.route.navigate(['login']);
  }

  loggedIn() {
    return !!localStorage.getItem('mtoken');
  }

  getToken(){
    return localStorage.getItem('mtoken');
  }

}
