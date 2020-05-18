import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/Interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: Product;

  constructor(private prodSrv: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    if (this.product == null) {

      this.prodSrv.GetProduct(this.route.snapshot.params['id']).subscribe(
        res => {
          this.product = res
          alert(JSON.stringify(res))
        }
      )

    }
  }

}
