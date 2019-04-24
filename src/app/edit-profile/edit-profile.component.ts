import { Component, OnInit } from '@angular/core'
import { UserService } from '../user.service'
import { ActivatedRoute, Router } from '@angular/router'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userName = null
  userProfileImg = null
  userId = null
  profileDetails: any = {}


  editProfileForm = new FormGroup({
    name: new FormControl(""),
    description: new FormControl(""),
    bloglink: new FormControl(""),
    fblink: new FormControl(""),
    email: new FormControl(""),
  })


  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUserName()
    this.getProfile()
  }

  getUserName() {
    this.userService
      .getUsersData()
      .subscribe(response => {
        console.log(this.route.snapshot.params.id)
        for (let user of <any[]>response) {
          if (this.route.snapshot.params.id == user.id) {
            this.userName = user.username
            this.userId = user.id
            this.userProfileImg = user.profileImage
          }
        }
      })
  }

  getProfile() {
    this.userService.getProfile().subscribe(response => {
      console.log(response)
      console.log(this.profileDetails)
      for (let i = 0; i < response.length; i++) {
        if (this.route.snapshot.params.id == response[i].userid) {
          this.profileDetails = response[i]
        }
      }
      console.log(this.profileDetails)
    })
  }


  onSubmit() {
    let tempEditProfileForm = this.editProfileForm.value
    console.log(this.editProfileForm.value)
    tempEditProfileForm["userid"] = this.userId

    console.log(tempEditProfileForm)
    this.profileDetails = tempEditProfileForm
    console.log(this.profileDetails)
    this.userService.addProfile(this.profileDetails)
    this.editProfileForm.reset()
    this.router.navigateByUrl(`/users/${this.route.snapshot.params.id}`)
  }

}
