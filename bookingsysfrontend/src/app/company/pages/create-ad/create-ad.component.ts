import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CompanyService } from '../../services/company.service';

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
  private companyService: CompanyService
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

    formData.append('img', this.selectedFile);
    formData.append('serviceName', this.validateForm.get('serviceName').value);
    formData.append('description', this.validateForm.get('description').value);
    formData.append('price', this.validateForm.get('price').value);  

    this.companyService.postAd(formData).subscribe(res => {
    this.notification
      .success(
        'ALERT',
        `Your Ad Posted Successfully!`,
        { nzDuration: 3000 }
      );

    this.router.navigateByUrl('company/ads');
  }, error => {
    const errorMessage = error.error || "You should upload an image";
    this.notification.error('ALERT', errorMessage, { nzDuration: 3000 });
    console.log(error)
  });
  
}

get remainingChars(): number {
  const desc = this.validateForm.get('description')?.value || '';
  return 200 - desc.length;
}


}
