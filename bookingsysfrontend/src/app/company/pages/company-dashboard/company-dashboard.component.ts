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
  currentPage = 1;
  pageSize = 7;
  total = 0;

  constructor(private companyService: CompanyService,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.getAllAdBookings();
  }

  getAllAdBookings(): void {
  this.companyService.getAllAdBookings(this.currentPage - 1, this.pageSize).subscribe({
    next: (res) => {
      if (res.code === '00') {
        this.bookings = res.content.content;
        this.total = res.content.totalElements;
        // this.notification.success('ALERT', `You have ${res.content.totalElements} bookings`, { nzDuration: 2000 });
        console.log(res.content);
      } else if (res.code === '01') {
        this.bookings = [];
        this.total = 0;
        this.notification.warning('ALERT', res.message, { nzDuration: 1500 });
      }
    },
    error: (err) => {
      this.notification.error('Server Error', err.error?.message || 'Something Went Wrong', {
        nzDuration: 3000
      });
    }
  });
}

onPageChange(page: number): void {
  this.currentPage = page;
  this.getAllAdBookings();
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
