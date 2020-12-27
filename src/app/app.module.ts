import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BnNgIdleService } from 'bn-ng-idle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatIconModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { TokenInterceptorService } from './token-interceptor.service';
import { AddMomentComponent } from './image-gallery/add-moment/add-moment.component';
import { ListMomentComponent } from './image-gallery/list-moment/list-moment.component';

const routes: Routes = [
{
  path: '',
  component: HomeComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'image-gallery',
  component: ImageGalleryComponent,
  canActivate: [AuthGuard],
  children: [
    {path: 'list-moment', component: ListMomentComponent},
    {path: 'add-moment', component: AddMomentComponent},
  ]
},

];



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ImageGalleryComponent,
    AddMomentComponent,
    ListMomentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatSidenavModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    MatTreeModule,
    [RouterModule.forRoot(routes)],
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService,AuthGuard,BnNgIdleService,{
    provide:HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
