import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { TripComponent } from './pages/trip/trip.component';
import { AddComponent } from './pages/trip/add/add.component';
//pagination
import { NgxPaginationModule } from 'ngx-pagination';
//recherche
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DomainComponent } from './pages/domain/domain.component';
import { MatSelectModule } from "@angular/material/select";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    //pagination
    NgxPaginationModule,
    //recherche
    Ng2SearchPipeModule,
    ToastrModule.forRoot()
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, TripComponent, AddComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
