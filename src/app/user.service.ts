import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';

const baseUrl = 'https://insta.nextacademy.com/api/v1'

interface userProfile {
  name: string,
  description: string,
  bloglink: string,
  fblink: string,
  email: string,
  userid: string,
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: BehaviorSubject<any> = new BehaviorSubject([])
  private profileDetails = new BehaviorSubject<userProfile[]>([])

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

  addProfile(newProfileDetails) {
    let exist = false
    let tempProfile = this.profileDetails.getValue()
    console.log(newProfileDetails)
    console.log(tempProfile)

    for (let i = 0; i < tempProfile.length; i++) {
      console.log(tempProfile[i])
      let tempProfile1 = tempProfile[i]
      console.log(tempProfile1)
      if (tempProfile1.userid == newProfileDetails.userid) {
        console.log(tempProfile1)
        exist = true
        tempProfile[i] = newProfileDetails
        this.profileDetails.next(tempProfile)
      } else exist = exist
    }

    if (exist == false) {
      console.log(tempProfile)
      tempProfile.push(newProfileDetails)
      this.profileDetails.next(tempProfile)
    }
    console.log(tempProfile)
  }

  getProfile() {
    return this.profileDetails
  }

}
