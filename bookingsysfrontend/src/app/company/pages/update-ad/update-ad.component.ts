import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-update-ad',
  standalone: false,
  templateUrl: './update-ad.component.html',
  styleUrl: './update-ad.component.scss'
})
export class UpdateAdComponent {

  adId: any;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  validateForm!: FormGroup;
  existingImage: string | null = null;
  imgChanged = false;

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private companyService: CompanyService,
    private activatedroute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      serviceName: [null, [Validators.required]],
      description: [null, [Validators.required, Validators.maxLength(200)]],
      price: [null, [Validators.required]],
    });
    this.adId = this.activatedroute.snapshot.params['id'];
    this.getAdById();
  }

  getAdById() {
  this.companyService.getAdById(this.adId).subscribe({
    next: (res) => {
      if (res.code === '00') {
        const ad = res.content;
        this.validateForm.patchValue(ad);
        if (ad.returnedImg) {
          this.existingImage = 'data:image/jpeg;base64,' + ad.returnedImg;
        }
      } else if (res.code === '01') {
        this.notification.warning('Not Found', res.message || 'Ad not found', { nzDuration: 3000 });
      } else {
        this.notification.error('Error', res.message || 'Unexpected error occurred', { nzDuration: 3000 });
      }
    },
    error: (err) => {
      this.notification.error('Server Error', err.error?.message || 'Something went wrong', {
        nzDuration: 3000
      });
      console.error(err);
    }
  });
}


  get remainingChars(): number {
    const desc = this.validateForm.get('description')?.value || '';
    return 200 - desc.length;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
    this.existingImage = null;
    this.imgChanged = true;
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  updateAd() {
    const formData: FormData = new FormData();
    if (this.imgChanged && this.selectedFile) {
      formData.append('img', this.selectedFile);
    }

    formData.append('serviceName', this.validateForm.get('serviceName')?.value);
    formData.append('description', this.validateForm.get('description')?.value);
    formData.append('price', this.validateForm.get('price')?.value);

    this.companyService.updateAd(this.adId, formData).subscribe({
      next: (res) => {
        if (res.code === '00') {
          this.notification.success('Success', res.message || 'Ad Updated Successfully', { nzDuration: 3000 });
          this.router.navigateByUrl('/company/ads');
        } else if (res.code === '01') {
          this.notification.warning('Not Found', res.message || 'Ad not found', { nzDuration: 3000 });
        } else {
          this.notification.error('Error', res.message || 'Unexpected error occurred', { nzDuration: 3000 });
        }
      },
      error: (err) => {
        this.notification.error('Server Error', err.error?.message || 'Something went wrong', { nzDuration: 3000 });
        console.error(err);
      }
    });
  }

}
