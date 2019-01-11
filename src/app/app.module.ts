import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

//Services
import { LoaderService } from './provider/loader';
import { NotificationService } from './provider/notification';
import { AsyncHttpService } from './provider/async-http.service';

//Components
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { AdminComponent } from './admin/admin.component'
import { AppComponent } from './app.component';
import { LoaderComponent } from './loader/loader.component';

//Routing
import { RouterModule, Routes } from '@angular/router';
import { MasterProjectComponent } from './master-project/master-project.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'projects', component: ProjectComponent },
  { path: 'project-detail/:id', component: MasterProjectComponent },
  { path: 'project-detail', component: MasterProjectComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'index.html', redirectTo: '/home', pathMatch: 'full' },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    HeaderComponent,
    HomeComponent,
    ProjectComponent,
    AdminComponent,
    MasterProjectComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [LoaderService, NotificationService, AsyncHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
