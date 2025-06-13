import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from './basic/service/storage/user-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'bookingsysfrontend';

  isClientLoggedIn: boolean = UserStorageService.isClientLoggedIn();
  isCompanyLoggedIn: boolean = UserStorageService.isCompanyLoggedIn();
  username: string = '';


  constructor(private router: Router) {}

  ngOnInit() {
    this.updateLoginStatus();

    this.router.events.subscribe(() => {
      this.updateLoginStatus();
    });
  }

  updateLoginStatus() {
    this.isClientLoggedIn = UserStorageService.isClientLoggedIn();
    this.isCompanyLoggedIn = UserStorageService.isCompanyLoggedIn();
    this.username = UserStorageService.getUserName();
  }


  logout() {
    UserStorageService.signOut();
    this.router.navigateByUrl('/');
  }

}


