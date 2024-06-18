import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products:Product[] = [];
  displayedColumns: string[] = ['Name', 'Description', 'Price', 'actions']; 

  constructor(private productService: ProductService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }
  

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(product => product.ID !== id); // Actualizar la lista localmente
      this.snackBar.open('Producto eliminado', 'Cerrar', { duration: 2000 });
    }, error => {
      console.error('Error al eliminar el producto', error);
      this.snackBar.open('Error al eliminar el producto', 'Cerrar', { duration: 2000 });
    });
  }
}
