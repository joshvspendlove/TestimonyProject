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
import { TestimonyEditModalService } from './testimony-edit-modal.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-testimony-edit-modal',
  templateUrl: './testimony-edit-modal.component.html',
  styleUrl: './testimony-edit-modal.component.css',
})
export class TestimonyEditModalComponent implements OnInit {
  isOpen: boolean = false;
  testimonyForm!: FormGroup;
  testimony: Testimony = {
    body: '',
    title: '',
    is_private: false,
  };

  constructor(
    public modalService: TestimonyEditModalService,
    private fb: FormBuilder,
    private testimonyService: TestimonyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isOpen = true;
    this.route.params.subscribe((params) => {
      this.testimony = this.testimonyService.getMyTestimony(params.id);
    });
    this.testimonyForm = this.fb.group({
      title: [this.testimony.title, Validators.required],
      body: [this.testimony.body, Validators.required],
      is_private: [this.testimony.is_private],
      is_anonymous: [this.testimony.is_anonymous || false],
    });

    this.modalService.modalState.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
  }

  onCancel() {
    this.modalService.closeModal();
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  onSubmit() {
    const value = this.testimonyForm.value;
    if (this.testimonyForm.valid) {
      const updatedTestimony = {
        ...this.testimony,
        title: value.title,
        body: value.body,
        is_private: value.is_private,
        is_anonymous: value.is_anonymous,
      };
      this.testimonyService.updateTestimony(updatedTestimony);
    }
    this.modalService.closeModal();
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
