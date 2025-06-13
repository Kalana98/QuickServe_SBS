import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientService } from '../../services/client.service';
import { UserStorageService } from '../../../basic/service/storage/user-storage.service';

@Component({
  selector: 'app-review',
  standalone: false,
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent implements OnInit{

  bookId: number 
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

      this.bookId = this.activatedRoute.snapshot.params['id'];

    this.validateForm = this.fb.group({
      review: [null, [Validators.required, Validators.maxLength(500)]],
      rating: [null, [Validators.required]]
    });
  }

giveReview(): void {
    
  if (this.validateForm.invalid) {
      this.notification.warning('Validation', 'Please fill in all required fields.');
      return;
    }

  const reviewDTO = {
    rating: this.validateForm.get("rating").value,
    review: this.validateForm.get("review").value,
    userId: UserStorageService.getUserId(),
    bookId: this.bookId
  };

  this.clientService.giveReview(reviewDTO).subscribe({
      next: (res) => {
        if (res.code === '00') {
          this.notification.success('Success', res.message, { nzDuration: 3000 });
          this.router.navigateByUrl('/client/bookings');
        } else if(res.code === '07'){
          this.notification.warning('Warning', res.message, { nzDuration: 3000 });
        }else if(res.code === '10'){
          this.notification.warning('Warning', res.message, { nzDuration: 3000 });
        }else if(res.code === '08'){
          this.notification.error('Error', res.message, { nzDuration: 3000 });
        }
      },
      error: (err) => {
        this.notification.error('Server Error', err.error?.message || 'Something went wrong', {
          nzDuration: 3000
        });
      }
    });
}

get remainingChars(): number {
  const desc = this.validateForm.get('review')?.value || '';
  return 500 - desc.length;
}


}
