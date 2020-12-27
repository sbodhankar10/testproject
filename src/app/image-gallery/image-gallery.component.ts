import { Component, OnInit } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit {

  constructor(private bnIdle: BnNgIdleService,private auth: AuthService) { }
  addDisplay: boolean;
  panelOpenState: any;
  ngOnInit() {
    this.bnIdle.startWatching(600).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        this.auth.logOut();
      }
    });
  }

  userLogout(){
    this.auth.logOut();
  }

}
