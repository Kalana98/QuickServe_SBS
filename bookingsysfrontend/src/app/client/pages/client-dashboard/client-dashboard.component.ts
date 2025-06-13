import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-dashboard',
  standalone: false,
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.scss'
})
export class ClientDashboardComponent {

  ads: any = [];
  validateForm!: FormGroup;
 // username: string = '';

constructor(
  private clientService: ClientService,
  private fb: FormBuilder,
  private router: Router
) {}

getAllAds() {
  this.clientService.getAllAds().subscribe(res => {
    this.ads = res;
  });
}

ngOnInit() {
  this.validateForm = this.fb.group({
    service: [null, [Validators.required]]
  })
  this.getAllAds();
 // this.username = UserStorageService.getUserName();
}

searchAdByName() {
  this.clientService.searchAdByName(this.validateForm.get(['service']).value).subscribe(res => {
    this.ads = res;
  });
}

navigateViewPage(adId: number) {
  this.router.navigateByUrl(`/client/ad/${adId}`);
}


updateImg(img){
    return 'data:image/jpeg;base64, ' + img;
  }



}
