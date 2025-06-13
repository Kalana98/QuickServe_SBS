import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserStorageService } from '../../../basic/service/storage/user-storage.service';

@Component({
  selector: 'app-ad-detail',
  standalone: false,
  templateUrl: './ad-detail.component.html',
  styleUrl: './ad-detail.component.scss'
})
export class AdDetailComponent {

   adId: any;
   avatarUrl: any;
   ad: any;

   reviews: any;

   validateForm!: FormGroup;

  constructor(
    private clientService: ClientService,
    private activatedroute: ActivatedRoute,
    private notification: NzNotificationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
  this.validateForm = this.fb.group({
    bookDate: [null, [Validators.required]]
  });
  this.adId = this.activatedroute.snapshot.params['adId'];
  this.getAdDetailsByAdId();
}


  getAdDetailsByAdId() {
  this.clientService.getAdDetailsByAdId(this.adId).subscribe({
    next: (res) => {
      if (res.code === '00') {
        const data = res.content;
        this.avatarUrl = 'data:image/jpeg;base64,' + data.adDTO.returnedImg;
        this.ad = data.adDTO;
        this.reviews = data.reviewDTOList;
      } else if (res.code === '01') {
        this.notification.warning('ALERT', res.message, { nzDuration: 3000 });
      } else if (res.code === '05') {
        this.notification.error('ALERT', res.message, { nzDuration: 3000 });
      }
    },
    error: (err) => {
      this.notification.error('Server Error', err.error?.message || 'Something went wrong', {
        nzDuration: 3000
      });
    }
  });
}

  
  disablePastDates = (current: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return current < today;
  };


  bookService() {
  const bookServiceDTO = {
    bookDate: this.validateForm.get(['bookDate']).value,
    adId: this.adId,
    userId: UserStorageService.getUserId()
  }

  this.clientService.bookService(bookServiceDTO).subscribe({
    next: (res) => {
      if(res.code === '00'){
        this.notification.success('Success', res.message, { nzDuration: 3000 });
        this.router.navigateByUrl('/client/bookings');
      }else if(res.code === '01'){
        this.notification.warning('ALERT', res.message, { nzDuration: 3000 });
      }else if(res.code === '10'){
        this.notification.warning('ALERT', res.message, { nzDuration: 3000 });
      }else if(res.code === '05'){
        this.notification.error('LAERT', res.message, { nzDuration: 3000 });
      }
    },
    error: (err) => {
      this.notification.error('Server Error', err.error?.message || 'Something went wrong', { nzDuration: 3000 });
    }
    
  });
}


}
