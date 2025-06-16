import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-client-dashboard',
  standalone: false,
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.scss'
})
export class ClientDashboardComponent {

  validateForm!: FormGroup;
  ads: any[] = [];
  currentPage: number = 1;
  pageSize: number = 3;
  totalAds: number = 0;
  
 // username: string = '';

constructor(
  private clientService: ClientService,
  private fb: FormBuilder,
  private router: Router,
  private notification: NzNotificationService
) {}

getAllAds() {
  this.clientService.getAllAdsPaginated(this.currentPage - 1, this.pageSize).subscribe({
    next: (res) => {
      if (res.code === '00') {
        this.ads = res.content;
        this.totalAds = res.total;
      } else {
        this.ads = [];
        this.totalAds = 0;
        this.notification.warning('No Ads', res.message, { nzDuration: 1500 });
      }
    },
    error: (err) => {
      this.notification.error('Server Error', err.error?.message || 'Something Went Wrong', {
        nzDuration: 3000
      });
    }
  });
}

onPageChange(pageIndex: number): void {
  this.currentPage = pageIndex;
  this.getAllAds();
}


ngOnInit() {
  this.validateForm = this.fb.group({
    service: [null, [Validators.required]]
  })
  this.getAllAds();
 // this.username = UserStorageService.getUserName();
}

searchAdByName() {
  this.clientService.searchAdByName(this.validateForm.get(['service']).value).subscribe({
    next: (res) => {
      if(res.code === '00'){
        this.ads = res.content;
        this.notification.success('ALERT', `You have ${res.content.length} results`, { nzDuration: 1500 });
      }else if(res.code === '01'){
        this.notification.warning('ALERT', res.message , { nzDuration: 1500 });
      }else if(res.code === '05'){
        this.notification.error('ALERT', res.message , { nzDuration: 1500 });
      }
    },
    error: (err) => {
      this.notification.error('Server Error', err.error?.message || 'Something Went Wrong', {
        nzDuration: 3000
      })
    }
  });
}

navigateViewPage(adId: number) {
  this.router.navigateByUrl(`/client/ad/${adId}`);
}


updateImg(img){
    return 'data:image/jpeg;base64, ' + img;
  }

  



}
