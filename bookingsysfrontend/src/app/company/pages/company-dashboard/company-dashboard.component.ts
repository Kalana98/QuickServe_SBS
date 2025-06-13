import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-company-dashboard',
  standalone: false,
  templateUrl: './company-dashboard.component.html',
  styleUrl: './company-dashboard.component.scss'
})
export class CompanyDashboardComponent {

  bookings:any;

  constructor(private companyService: CompanyService,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.getAllAdBookings();
  }

  getAllAdBookings() {
    this.companyService.getAllAdBookings().subscribe({
      next: (res) => {
        if(res.code === '00'){
          this.bookings = res.content;
          this.notification.success('ALERT', `You have ${res.content.length} bookings`, { nzDuration: 2000 });
        }else if(res.code === '01'){
          this.bookings = [];
          this.notification.warning('ALERT', res.message, { nzDuration: 1500 });
        }else if(res.code === '05'){
          this.notification.error('ALERT', res.message, { nzDuration: 1500 });
        }
      },
       error: (err) => {
      this.notification.error('Server Error', err.error?.message || 'Something Went Wrong', {
        nzDuration: 3000
      })
    }
    });
  }

  changeBookingStatus(bookingId: number, status: string) {
  this.companyService.changeBookingStatus(bookingId, status).subscribe({
    next: (res) => {
      if (res.code === '00') {
        this.notification.success('Success', res.message || 'Booking status changed successfully', {
          nzDuration: 3000
        });
        this.getAllAdBookings();
      } else if (res.code === '01') {
        this.notification.warning('Not Found', res.message || 'Booking not found', {
          nzDuration: 3000
        });
      } else {
        this.notification.error('Error', res.message || 'Something went wrong', {
          nzDuration: 3000
        });
      }
    },
    error: (err) => {
      this.notification.error('Server Error', err.error?.message || 'Unexpected server error', {
        nzDuration: 3000
      });
    }
  });
}




}
