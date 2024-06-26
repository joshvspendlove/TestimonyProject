import { Component, Input, OnInit } from '@angular/core';
import { Testimony } from '../testimony.model';
import { TestimonyService } from '../testimony.service';
import { AuthenticationService } from '../../authenticate/authentication.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-testimony-item',
  templateUrl: './testimony-item.component.html',
  styleUrl: './testimony-item.component.css',
})
export class TestimonyItemComponent implements OnInit {
  constructor(
    private testimonyService: TestimonyService,
    private authService: AuthenticationService,
    private location: Location
  ) {}

  @Input() testimony!: Testimony;
  myPost!: boolean;

  ngOnInit(): void {
    this.authService.loggedInChangedEvent.subscribe(isLoggedIn => {
      this.myPost = this.authService.hasSameUserId(this.testimony.author_id);
    })
    this.myPost = this.authService.hasSameUserId(this.testimony.author_id);
  }

  onLike() {
    
  }
  

  onModalResponse(response: boolean)
  {
    if (response)
      this.testimonyService.deleteTestimony(this.testimony)
  }
}
