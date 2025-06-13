import { Component } from '@angular/core';
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
export class ReviewComponent {

  bookId: number 
  validateForm!: FormGroup;

constructor(private fb: FormBuilder,
  private notification: NzNotificationService,
  private router: Router,
  private clientService: ClientService,
  private activatedroute: ActivatedRoute) {}

ngOnInit() {

    this.bookId = this.activatedroute.snapshot.params['id'];

  this.validateForm = this.fb.group({
    review: [null, [Validators.required, Validators.maxLength(500)]],
    rating: [null, [Validators.required]]
  })
}

giveReview() {
  const reviewDTO = {
    rating: this.validateForm.get("rating").value,
    review: this.validateForm.get("review").value,
    userId: UserStorageService.getUserId(),
    bookId: this.bookId
  };

  this.clientService.giveReview(reviewDTO).subscribe(res => {
    this.notification
      .success(
        'SUCCESS',
        `Review posted successfully`,
        { nzDuration: 3000 }
      );
    this.router.navigateByUrl("/client/bookings");
  }, error => {
    this.notification
      .error(
        'ERROR',
        `${error.message}`,
        { nzDuration: 3000 }
      );
  });
}

get remainingChars(): number {
  const desc = this.validateForm.get('review')?.value || '';
  return 500 - desc.length;
}


}
