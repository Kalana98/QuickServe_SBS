import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-all-ads',
  standalone: false,
  templateUrl: './all-ads.component.html',
  styleUrl: './all-ads.component.scss'
})
export class AllAdsComponent {

  ads: any;
  currentPage = 1;
  pageSize = 3;
  total = 0;

constructor(private companyService: CompanyService,
  private notification: NzNotificationService
) {}

  ngOnInit() {
    this.getAllAdsByUserId();
  }

  getAllAdsByUserId() {
    this.companyService.getAllAdsByUserId(this.currentPage - 1, this.pageSize).subscribe({
      next: (res) => {
        if(res.code === '00'){
          this.ads = res.content.content;
          this.total = res.content.totalElements;
        }else if(res.code === '01'){
          this.notification.blank('ALERT', res.message, { nzDuration: 2000 });
          this.ads = [];
          this.total = 0;
        }else if(res.code === '05'){
          this.notification.error('ALERT', res.message, { nzDuration: 2000 });
        }
      },
       error: (err) => {
        this.notification.error('Server Error', err.error?.message || 'Something went wrong', {
          nzDuration: 2000
        })
      }
    });
  }

  onPageChange(page: number): void{
    this.currentPage = page;
    this.getAllAdsByUserId();
  }

  updateImg(img){
    return 'data:image/jpeg;base64, ' + img;
  }

  deleteAd(adId:any){
    this.companyService.deleteAd(adId).subscribe({
      next: (res) => {
        if(res.code === '00'){
          this.notification.success('ALERT', res.message, { nzDuration: 2000 });
          this.getAllAdsByUserId()
        }else if(res.code === '01'){
          this.notification.blank('ALERT', res.message, { nzDuration: 2000 });
        }else if(res.code === '05'){
          this.notification.error('ALERT', res.message, { nzDuration: 2000 });
        }else if(res.code === '08'){
          this.notification.error('ALERT', res.message, { nzDuration: 20000 })
        }
      },
      error: (err) => {
        this.notification.error('Server Error', err.error?.message || 'Something went wrong', {
          nzDuration: 2000
        })
      }
    })
  }


}
 