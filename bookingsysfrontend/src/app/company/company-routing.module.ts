import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyDashboardComponent } from './pages/company-dashboard/company-dashboard.component';
import { CreateAdComponent } from './pages/create-ad/create-ad.component';
import { AllAdsComponent } from './pages/all-ads/all-ads.component';
import { UpdateAdComponent } from './pages/update-ad/update-ad.component';

const routes: Routes = [
  { path: 'dashboard', component: CompanyDashboardComponent },
  { path: 'ad', component: CreateAdComponent },
  { path: 'ads', component: AllAdsComponent },
  { path: 'ad/:id', component: UpdateAdComponent },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
