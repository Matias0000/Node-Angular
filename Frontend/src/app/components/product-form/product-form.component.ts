import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  productId!: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    // Suscribirse a los cambios en los parámetros de la URL
    this.route.params.subscribe(params => {
      this.productId = +params['id']; // Convertir el parámetro 'id' a número
      if (this.productId) {
        this.loadProduct(this.productId);
      }
    });
    
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe(product => {
      // Rellenar el formulario con los datos del producto
      this.productForm.patchValue({
        name: product.Name,
        description: product.Description,
        price: product.Price
      });
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      if (this.productId) {
        // Actualizar producto existente
        this.productService.updateProduct(this.productId, product).subscribe(() => {
          this.snackBar.open('Producto actualizado', 'Cerrar', { duration: 5000 });
          this.router.navigate(['/']);
        });
      } else {
        // Crear nuevo producto
        this.productService.createProduct(product).subscribe(() => {
          this.snackBar.open('Producto creado', 'Cerrar', { duration: 5000 });
          this.router.navigate(['/']);
        });
      }
    }
  }
  onCancel(): void {
    this.router.navigate(['/']);
  }
}
