import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { FormControl, FormGroup } from '@angular/forms'
import { UserService } from '../user.service'

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  signupForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(
    private service: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    const data = this.signupForm.value
    this.service.submitSignUp(data)
  }
}
