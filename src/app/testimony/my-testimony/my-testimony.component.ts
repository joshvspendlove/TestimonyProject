import { Component, OnInit } from '@angular/core';
import { TestimonyService } from '../testimony.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-my-testimony',
  templateUrl: './my-testimony.component.html',
  styleUrl: './my-testimony.component.css',
})
export class MyTestimonyComponent implements OnInit {
  isSharing: boolean = false;
  constructor(
    private testimonyService: TestimonyService,
    private router: Router
  ) {}
  ngOnInit(): void {
    
  }

  onRouterActivated()
  {
    this.isSharing = true;
  }

  onRouterDeactivated()
  {
    this.isSharing = false;
  }
}
