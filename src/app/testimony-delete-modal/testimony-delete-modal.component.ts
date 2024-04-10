import { Component, OnInit } from '@angular/core';
import { Testimony } from '../testimony/testimony.model';
import { TestimonyService } from '../testimony/testimony.service';
import { TestimonyDeleteModalService } from './testimony-delete-modal.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-testimony-delete-modal',
  templateUrl: './testimony-delete-modal.component.html',
  styleUrl: './testimony-delete-modal.component.css',
})
export class TestimonyDeleteModalComponent implements OnInit {
  isOpen: boolean = false;
  testimony: Testimony;

  constructor(
    public modalService: TestimonyDeleteModalService,
    private testimonyService: TestimonyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isOpen = true;
    this.route.params.subscribe((params) => {
      this.testimony = this.testimonyService.getMyTestimony(params.id);
    });

    this.modalService.modalState.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
  }

  onCancel() {
    this.modalService.closeModal();
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  onDelete() {
    this.testimonyService.deleteTestimony(this.testimony);

    this.modalService.closeModal();
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
