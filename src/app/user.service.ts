import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

const UsersUrl = 'https://tranquil-beach-87956.herokuapp.com/api/v1/users'
const UserImg = 'https://tranquil-beach-87956.herokuapp.com/api/v1/images?userId'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(UsersUrl)
  }

  getUserId(id) {
    return this.http.get(UserImg + `=${id}`)
  }

}
