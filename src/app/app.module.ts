import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { MessagesComponent } from './messages/messages.component';
import { NotfoundComponent } from './views/notfound/notfound.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { VogeltellerDetailComponent } from './views/vogelteller-detail/vogelteller-detail.component';
import { VogelsComponent } from './views/vogels/vogels.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MessagesComponent,
    NotfoundComponent,
    VogeltellerDetailComponent,
    VogelsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
