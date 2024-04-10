import { Component, Input, OnInit } from '@angular/core';
import { TestimonyService } from '../testimony.service';
import { Testimony } from '../testimony.model';

@Component({
  selector: 'app-testimony-list',
  templateUrl: './testimony-list.component.html',
  styleUrl: './testimony-list.component.css',
})
export class TestimonyListComponent implements OnInit {
  @Input() listType!: String;
  testimonies!: Testimony[];
  loading: boolean;
  constructor(private testimonyService: TestimonyService) {
    testimonyService.loading.subscribe(loading =>{
      this.loading = loading
    })
  }

  ngOnInit(): void {
    if (this.listType == 'ours') {
      this.testimonyService.ourTestimonyListChanged.subscribe((testimonies) => {
        this.testimonies = testimonies;
      });
      this.testimonies = this.testimonyService.getOurTestimonies();
    }
    else if( this.listType == "mine")
    {
      this.testimonyService.myTestimonyListChanged.subscribe((testimonies) => {
        this.testimonies = testimonies;
      });
      this.testimonies = this.testimonyService.getMyTestimonies();
    }
  }
}
