import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  id: number = 0;
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/data.json');
  }
  getProductById(id: string | number): Observable<Product | undefined> {
    return this.http.get<Product[]>('assets/data.json').pipe(
      map((products) =>
        products.find((product) => {
          return product.id === id;
        })
      )
    );
  }
  idIncerment(): number {
    return (this.id += 1);
  }
}
