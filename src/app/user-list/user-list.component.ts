import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service'


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users = null

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getUserList()
  }

  getUserList() {
    this.userService
      .getUsersData()
      .subscribe(response => {
        this.users = response
      })
  }

}
