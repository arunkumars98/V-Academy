import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RouterModule } from "@angular/router";
import { SignupAddComponent } from './homepage/signup-ad/signup-add.component';
import { AdvAdComponent } from './homepage/adv-ad/adv-ad.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from "@angular/forms";
import { LoginpageComponent } from './loginpage/loginpage.component';
import { CommonHeaderComponent } from './common-header/common-header.component';
import { HeaderProfileComponent } from './header-profile/header-profile.component';
import { HttpClientModule} from "@angular/common/http";
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { RestServiceService } from "./rest-service.service";
import { CourselearnpageComponent } from './courselearnpage/courselearnpage.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import { CoursesDetailsPageComponent } from './courses-details-page/courses-details-page.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { FourmPageComponent } from './fourm-page/fourm-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InstructorProfilePageComponent } from './instructor-profile-page/instructor-profile-page.component';
import { InstructorLoginPageComponent } from './instructor-login-page/instructor-login-page.component';
import { AdminLoginPageComponent } from './admin-login-page/admin-login-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { VideoStreamPageComponent } from './video-stream-page/video-stream-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    SignupAddComponent,
    AdvAdComponent,
    FooterComponent,
    LoginpageComponent,
    CommonHeaderComponent,
    HeaderProfileComponent,
    CoursesPageComponent,
    CourselearnpageComponent,
    UserProfilePageComponent,
    CoursesDetailsPageComponent,
    PaymentPageComponent,
    FourmPageComponent,
    PageNotFoundComponent,
    InstructorProfilePageComponent,
    InstructorLoginPageComponent,
    AdminLoginPageComponent,
    AdminPageComponent,
    VideoStreamPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot([
      {
        path : '',
        component : HomepageComponent
      },
      {
        path : 'user/:type',
        component : LoginpageComponent
      },
      {
        path : 'courses/all-courses',
        component: CoursesPageComponent
      },
      {
        path : 'course/:course',
        component: CoursesDetailsPageComponent
      },
      {
        path: 'courses/learn',
        component: CourselearnpageComponent
      },
      {
        path: 'payment',
        component : PaymentPageComponent
      },
      {
        path: 'forum',
        component: FourmPageComponent
      },
      {
        path: 'profile/user',
        component : UserProfilePageComponent
      },
      {
        path: 'profile/instructor',
        component : InstructorProfilePageComponent
      },
      {
        path: 'instructor/login',
        component : InstructorLoginPageComponent
      },
      {
        path: 'admin/login',
        component : AdminLoginPageComponent
      },
      {
        path: 'admin/control',
        component : AdminPageComponent
      },
      {
        path: 'instructor/video-stream',
        component : VideoStreamPageComponent
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
      ]
    )
  ],
  providers: [RestServiceService],

  bootstrap: [AppComponent]
})
export class AppModule { }
