import { Injectable, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Image {
  imgURL: string,
  comments: any[],
  like: number,
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private imageDetail = new BehaviorSubject<Image[]>([])



  constructor() { }

  addImage(newImageDetails) {
    console.log(newImageDetails)
    let exist = false
    let tempImage = this.imageDetail.getValue()
    console.log(this.imageDetail.getValue())
    for (let i = 0; i < tempImage.length; i++) {
      console.log(tempImage[i])
      let tempImage1 = tempImage[i]
      console.log(tempImage1)
      if (tempImage1.imgURL == newImageDetails.imgURL) {
        exist = true
        tempImage[i] = newImageDetails
        this.imageDetail.next(tempImage)
      } else exist = exist
    }
    if (exist == false) {
      tempImage.push(newImageDetails)
      this.imageDetail.next(tempImage)
    }

  }

  getImage() {
    return this.imageDetail
  }



}
