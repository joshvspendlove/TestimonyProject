import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  input,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Testimony } from '../testimony/testimony.model';
import { TestimonyService } from '../testimony/testimony.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TestimonyViewModalService } from './testimony-view-modal.service';

@Component({
  selector: 'app-testimony-view-modal',
  templateUrl: './testimony-view-modal.component.html',
  styleUrl: './testimony-view-modal.component.css',
})
export class TestimonyViewModalComponent implements OnInit {
  isOpen: boolean = false;
  testimonyForm!: FormGroup;
  testimony: Testimony = {
    body: "",
    title: "",
    is_private: false
  };

  constructor(
    public modalService: TestimonyViewModalService,
    private testimonyService: TestimonyService,
    private route: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.isOpen = true
    this.route.params.subscribe(params => {
      this.testimony = this.testimonyService.getTestimony(params.id)
    })

    this.modalService.modalState.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
  }

  onCancel() {
    this.modalService.closeModal();
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
  
}
