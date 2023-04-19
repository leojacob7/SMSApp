import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { AppComponent } from './app.component';
import { ButtonComponent } from './component/button/button.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { HomeComponent } from './component/home/home.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './component/header/header.component';
import { MessageBoxComponent } from './component/message-box/message-box.component';
import { MessageBubblesComponent } from './component/message-bubbles/message-bubbles.component';
import { SendMessageComponent } from './component/send-message/send-message.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';

const appRoutes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignUpComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuardGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    MessageBoxComponent,
    MessageBubblesComponent,
    SendMessageComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
  ],
  providers: [AuthGuardGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
