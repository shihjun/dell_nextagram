import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userID = null


  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log("userId: " + this.route.snapshot.params.id)
    this.userService
      .getUserId(this.route.snapshot.params.id)
      .subscribe(response => {
        console.log(response)
        this.userID = response
      })
  }

}
