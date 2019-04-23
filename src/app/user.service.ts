import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';


const baseUrl = 'https://insta.nextacademy.com/api/v1'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: BehaviorSubject<any> = new BehaviorSubject([])

  constructor(private http: HttpClient) {
    this.getUsers().subscribe(response => {
      this.users.next(response)
    })

  }

  getUsers() {
    return this.http.get(`${baseUrl}/users`)
    // baseUrl + "/users"
  }

  getUserImg(id: number) {
    return this.http.get(`${baseUrl}/images?userId=${id}`)
  }

  getUsersData() {
    return this.users
  }



  submitSignUp(data: Object) {
    this.http
      .post(`${baseUrl}/users`, data)
      .subscribe(response => {
        console.log(response)
      })

  }

}
