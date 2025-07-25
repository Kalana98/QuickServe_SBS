import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../basic/service/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  // getAllAds(): Observable<any> {
  //   const userId = UserStorageService.getUserId();
  //   return this.http.get(BASIC_URL + `/api/client/ads`, {
  //     headers: this.createAuthorizationHeader()
  //   });
  // }
  getAllAdsPaginated(page: number, size: number): Observable<any> {
  return this.http.get(BASIC_URL + `/api/client/ads/paginated?page=${page}&size=${size}`, {
    headers: this.createAuthorizationHeader()
  });
}

  searchAdByName(name:any): Observable<any> {
    return this.http.get(BASIC_URL + `/api/client/search/${name}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getAdDetailsByAdId(adId:any): Observable<any> {
    return this.http.get(BASIC_URL + `/api/client/ad/${adId}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteBooking(id: any): Observable<any> {
    return this.http.delete(BASIC_URL + `/api/client/delete-booking/${id}`, {
    headers: this.createAuthorizationHeader()
    });
  }

bookService(bookDTO: any): Observable<any> {
  return this.http.post(BASIC_URL + `/api/client/book-service`, bookDTO, {
    headers: this.createAuthorizationHeader()
  });
}

getMyBookings(page: number, size: number): Observable<any> {
  const userId = UserStorageService.getUserId();
  return this.http.get(`${BASIC_URL}/api/client/my-bookings/${userId}?page=${page}&size=${size}`, {
    headers: this.createAuthorizationHeader()
  });
}

giveReview(reviewDTO: any): Observable<any> {
  return this.http.post(BASIC_URL + `/api/client/review`, reviewDTO, {
    headers: this.createAuthorizationHeader()
  });
}


  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }
}
