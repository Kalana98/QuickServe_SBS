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

constructor(
  private clientService: ClientService,
  private notification: NzNotificationService,
  private router: Router
) {}

ngOnInit() {
  this.getMyBookings();
  this.username = UserStorageService.getUserName();
}

getMyBookings() {
  this.clientService.getMyBookings().subscribe(res => {
    this.bookedServices = res;
  });
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
