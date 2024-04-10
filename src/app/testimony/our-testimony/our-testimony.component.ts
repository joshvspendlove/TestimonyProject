import { Component } from '@angular/core';
import { TestimonyService } from '../testimony.service';

@Component({
  selector: 'app-testimony',
  templateUrl: './our-testimony.component.html',
  styleUrl: './our-testimony.component.css'
})
export class OurTestimonyComponent {

  constructor(private testimonyService: TestimonyService){}
}
