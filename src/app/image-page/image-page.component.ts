import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from '../image.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-image-page',
  templateUrl: './image-page.component.html',
  styleUrls: ['./image-page.component.css']
})
export class ImagePageComponent implements OnInit {
  @Input() userImage = null

  comment = new FormControl("", [Validators.required])

  imageDetails: any = {
    imgURL: "",
    comments: [],
    like: null,
  }

  constructor(
    private imageService: ImageService,
  ) { }

  ngOnInit() {
    this.imageService.getImage().subscribe(response => {
      console.log(response)
      console.log(this.imageDetails)
      for (let i = 0; i < response.length; i++) {
        if (this.userImage == response[i].imgURL) {
          this.imageDetails = response[i]
        }
      }
    })
    console.log(this.imageDetails)
  }

  onSubmit() {
    if (!this.comment.invalid) {
      this.imageDetails.comments.push(this.comment.value)
      this.imageDetails.imgURL = this.userImage
      console.log(this.imageDetails)
      this.imageService.addImage(this.imageDetails)
      this.comment.setValue('')
    }
  }

  addLike() {
    this.imageDetails.like += 1
    console.log(this.imageDetails)
    this.imageDetails.imgURL = this.userImage
    this.imageService.addImage(this.imageDetails)
  }


}
