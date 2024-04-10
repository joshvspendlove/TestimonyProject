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
      is_private:[true],
      is_anonymous:[false]
    });
  }

  onSubmit() {
    const value = this.testimonyForm.value;
    console.log(value)
    if (this.testimonyForm.valid) {
      const newTestimony = { title: value.title, body: value.body, is_private: value.is_private, is_anonymous: value.is_anonymous};
      this.testimonyService.addTestimony(newTestimony);
      this.router.navigate(["../"], {relativeTo: this.route})
    }
  }
}
