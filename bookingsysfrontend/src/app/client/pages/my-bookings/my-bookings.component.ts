import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { UserStorageService } from '../../../basic/service/storage/user-storage.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-bookings',
  standalone: false,
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent {

  ads: any = [];
  bookedServices: any;
  username: string = '';
  currentPage = 1;
  pageSize = 6;
  total = 0;

constructor(
  private clientService: ClientService,
  private notification: NzNotificationService,
  private router: Router
) {}

ngOnInit() {
  this.getMyBookings();
  this.username = UserStorageService.getUserName();
}

getMyBookings(): void {
  this.clientService.getMyBookings(this.currentPage - 1, this.pageSize).subscribe({
    next: (res) => {
      if(res.code === '00'){
        this.bookedServices = res.content.content;
        this.total = res.content.totalElements;
        // this.notification.success('ALERT', `You have ${res.content.length} bookings`, { nzDuration: 3000});
      }else if(res.code === '01'){
        this.bookedServices = [];
        this.total = 0;
        this.notification.warning('Alert', res.message, { nzDuration: 3000})
      }else if(res.code === '05'){
        this.notification.error('Error', res.message, { nzDuration: 3000})
      }
    },
    error: (err) => {
      this.notification.error('Server Error', err.error?.message || 'Something Went Wrong', {
        nzDuration: 3000
      })
    }
  });
}

onPageChange(page: number): void {
  this.currentPage = page;
  this.getMyBookings();
}
  
deleteBooking(id:any){
    this.clientService.deleteBooking(id).subscribe(res => {
      this.notification.success(
        'SUCCESS', 
        'Booking Deleted Successfully',
        { nzDuration: 3000 }
      );
      this.getMyBookings();
    })
  }

  navigateViewPage(adId: number) {
  this.router.navigateByUrl(`/client/ad/${adId}`);
}

}
