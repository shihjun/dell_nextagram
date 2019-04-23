import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { ImageService } from '../image.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';



@Component({
  selector: 'app-image-page',
  templateUrl: './image-page.component.html',
  styleUrls: ['./image-page.component.css']
})
export class ImagePageComponent implements OnInit {
  @Input() userImage = null
  comment = new FormControl("")

  imageDetails: any = [{
    imgURL: "",
    comments: [],
    like: null,
  }]

  constructor(
    private imageService: ImageService,
  ) { }

  ngOnInit() {
    this.imageService.getImage().subscribe(response => {
      console.log(response)
      console.log(this.imageDetails)
      for (let user of response) {
        if (this.userImage == user.imgURL) {
          this.imageDetails[0] = user
        }
      }
    })
    console.log(this.imageDetails)
  }

  onSubmit() {
    this.imageDetails[0].comments.push(this.comment.value)
    this.imageDetails[0].imgURL = this.userImage
    console.log(this.imageDetails)
    this.imageService.addImage(this.imageDetails[0])
    this.comment.setValue('')
  }

  addLike() {
    this.imageDetails[0].like += 1
    console.log(this.imageDetails)
    this.imageDetails[0].imgURL = this.userImage
    this.imageService.addImage(this.imageDetails[0])
  }


}
