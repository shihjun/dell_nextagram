import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  showUserImg = false
  userName = null
  userProfileImg = null
  userImages = null
  userImg = null

  profileDetails: any = [{}]

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getUserImg()
    this.getUserName()
    this.getProfile()
  }

  getUserImg() {
    this.userService
      .getUserImg(this.route.snapshot.params.id)
      .subscribe(response => {
        this.userImages = response
        console.log(this.userImages)
      })
  }

  getUserName() {
    this.userService
      .getUsersData()
      .subscribe(response => {
        for (let user of <any[]>response) {
          if (this.route.snapshot.params.id == user.id) {
            this.userName = user.username
            this.userProfileImg = user.profileImage
            console.log(user.profileImage)
          }
        }
      })
  }

  getProfile() {
    this.userService.getProfile().subscribe(response => {
      console.log(response)
      console.log(this.profileDetails)
      for (let profile of response) {
        if (this.route.snapshot.params.id == profile.userid) {
          this.profileDetails[0] = profile
        }
      }
    })
  }

  toggleShowUserImg(userImg) {
    this.showUserImg = true
    this.userImg = userImg
  }

  toggleShowUserProfile() {
    this.showUserImg = false
    this.userImg = null
  }
}
