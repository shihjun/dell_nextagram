import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  users = null
  userImg = null

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getUserImg()
  }

  getUserImg() {
    this.userService
      .getUsers()
      .subscribe(response => {
        this.users = response
        for (let user of this.users) {
          if (this.route.snapshot.params.username == user.username) {
            this.userService
              .getUserId(user.id)
              .subscribe(response => {
                this.userImg = response
              })
          }
        }
      })
  }
}
