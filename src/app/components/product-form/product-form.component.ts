import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/prduct.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      id: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
        [this.idValidator()],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: ['', Validators.required],
      date_release: ['', Validators.required],
      date_revision: ['', Validators.required],
    });
  }

  onSubmit(): void {
  if (this.form.valid) {
    const newProduct = this.form.value;

    this.productService.create(newProduct).subscribe({
      next: () => {
        alert('Producto agregado con éxito');
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert('Error al agregar el producto');
        console.error(err);
      }
    });
  }
}


  onReset(): void {
    this.form.reset();
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
  idValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.productService
        .verifyId(control.value)
        .pipe(map((exists:boolean) => (exists ? { idExists: true } : null)));
    };
  }
}
