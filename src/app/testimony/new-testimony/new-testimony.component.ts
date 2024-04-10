import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TestimonyService } from '../testimony.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-testimony',
  templateUrl: './new-testimony.component.html',
  styleUrl: './new-testimony.component.css',
})
export class NewTestimonyComponent {
  testimonyForm!: FormGroup;
  @Input() body: String = '';
  @Input() title: String = '';

  constructor(
    private fb: FormBuilder,
    private testimonyService: TestimonyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.testimonyForm = this.fb.group({
      title: [this.title, Validators.required],
      body: [this.body, Validators.required],
      isPrivate:[true],
      anonymous:[false]
    });
  }

  onSubmit() {
    const value = this.testimonyForm.value;
    if (this.testimonyForm.valid) {
      const newTestimony = { title: value.title, body: value.body, is_private: value.isPrivate, is_anonymous: value.is_anonymous || false };
      this.testimonyService.addTestimony(newTestimony);
      this.router.navigate(["../"], {relativeTo: this.route})
    }
  }
}
