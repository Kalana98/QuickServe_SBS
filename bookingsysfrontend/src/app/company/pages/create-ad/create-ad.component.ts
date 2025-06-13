import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CompanyService } from '../../services/company.service';
import { UserStorageService } from '../../../basic/service/storage/user-storage.service';

@Component({
  selector: 'app-create-ad',
  standalone: false,
  templateUrl: './create-ad.component.html',
  styleUrl: './create-ad.component.scss'
})
export class CreateAdComponent {

  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  validateForm!: FormGroup;

constructor(
  private fb: FormBuilder,
  private notification: NzNotificationService,
  private router: Router,
  private companyService: CompanyService,
  private UserStorageService: UserStorageService
) {}

ngOnInit() {
  this.validateForm = this.fb.group({
    serviceName: [null, [Validators.required]],
    description: [null, [Validators.required, Validators.maxLength(200)]],
    price: [null, [Validators.required]],
  });
}

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
  this.previewImage();
}

previewImage() {
  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = reader.result;
  };
  reader.readAsDataURL(this.selectedFile);
}

postAd() {
  const formData: FormData = new FormData();

  if (this.selectedFile) {
    formData.append('img', this.selectedFile);
  }

  formData.append('serviceName', this.validateForm.get('serviceName')?.value);
  formData.append('description', this.validateForm.get('description')?.value);
  formData.append('price', this.validateForm.get('price')?.value);

  const userId = UserStorageService.getUserId();

  if (!userId) {
    this.notification.error('Error', 'User ID not found. Please login again.', { nzDuration: 3000 });
    return;
  }

  this.companyService.postAd(formData).subscribe({
  next: (res) => {
    this.notification.success('Success', res.message || 'Your Ad Posted Successfully!', { nzDuration: 3000 });
    this.router.navigateByUrl('company/ads');
  },
  error: (error) => {
    this.notification.error('Error', error.error?.message || 'Something went wrong!', { nzDuration: 3000 });
  }
});

}


get remainingChars(): number {
  const desc = this.validateForm.get('description')?.value || '';
  return 200 - desc.length;
}


}
