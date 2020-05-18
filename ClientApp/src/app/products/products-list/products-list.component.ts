import { Router } from '@angular/router';
import { AlertifyService } from './../../services/alertify.service';
import { Product } from './../../Interfaces/product';
import { ProductService } from './../../services/product.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
  ChangeDetectorRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  modalRef: BsModalRef;
  // @ViewChild('CreateModal') modal: TemplateRef<any>;

  @ViewChild('CreateModal', { static: false }) public modal: ModalDirective;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  ModalTitle: string;
  IsModalForUpdate: boolean;

  dtOptions: DataTables.Settings = {};
  Products: Product[] = [];
  userRoleStatus: string;

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger = new Subject();

  /// Create Form  ////
  CreateForm: FormGroup;
  name: FormControl;
  description: FormControl;
  outOfStock: FormControl;
  imageUrl: FormControl;
  price: FormControl;
  id: FormControl;

  IsAdmin: boolean;

  //



  constructor(
    private prodSrv: ProductService,
    private fb: FormBuilder,
    private alertify: AlertifyService,
    private modalService: BsModalService,
    private chRef: ChangeDetectorRef,
    private Router: Router

  ) { }

  ngOnInit(): void {
    this.InitCreateForm();
    if (localStorage.getItem("userRole") == "Admin") {
      this.IsAdmin = true;
    }

    this.userRoleStatus = localStorage.getItem('userRole');

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 9,
      autoWidth: true,
      order: [[0, 'desc']],
    };
    this.prodSrv.GetProducts().subscribe(
      (res) => {
        console.log(res);
        this.Products = res;
        this.chRef.detectChanges();
        this.dtTrigger.next();
      },
      (err) => {
        console.log(err);
      }
    );
    // Calling the DT trigger to manually render the table
  }

  onAddProduct() {
    this.InitCreateForm()
    this.ModalTitle = `Create New Product `
    this.IsModalForUpdate = false;
    this.modalRef = this.modalService.show(this.modal);
  }
  onUpdateModal(id: number) {

    this.prodSrv.GetProduct(id).subscribe(
      res => {
        console.log(res)
        this.ModalTitle = `Update ${res.name}`
        this.IsModalForUpdate = true;
        this.CreateForm.setValue({
          name: res.name,
          description: res.description,
          price: res.price,
          imageUrl: res.imageUrl,
          outOfStock: res.outOfStock,
          productId: res.productId
        })

        this.modalRef = this.modalService.show(this.modal);




      },
      err => { console.log(err) }
    )



  }
  onSubmit() {
    console.log('value');

    console.log(this.CreateForm.value);

    var model: Product = this.CreateForm.getRawValue();
    console.log(model);

    if (model.productId === 0) {
      this.prodSrv.AddProduct(model).subscribe(
        (res) => {
          // console.log(res);
          alert('Created');
        },
        (err) => {
          console.log(err);
        }
      );
    }
    else {
      this.prodSrv.UpdateProduct(model.productId, model).subscribe(
        res => { console.log(res); alert("updated") },
        err => { console.log(err); alert("Error") }
      )



    }
    this.CreateForm.reset()
    this.modalRef.hide()
    // this.dtTrigger.next();
    this.rerender();

  }

  onSelect(model: Product) {
    this.Router.navigateByUrl("/products/" + model.productId);
  }


  onDelete(id: number) {
    this.prodSrv.DeleteProduct(id).subscribe(
      res => {
        console.log(res); //alert("Deleted")
        this.alertify.success(JSON.stringify(res))
        this.rerender();
      },
      err => {
        console.log(err); //alert("Error") 
        this.alertify.error(err)

      }
    )
  }



  InitCreateForm() {
    this.name = new FormControl('Product 1', [
      Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]),
    ]);
    this.description = new FormControl('Product 1', [
      Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
    ]);
    this.outOfStock = new FormControl(false, [
      Validators.compose([Validators.required]),
    ]);
    this.price = new FormControl(0, [
      Validators.compose([
        Validators.required,
        Validators.min(1),
        Validators.max(90000),
      ]),
    ]);
    this.imageUrl = new FormControl('ffffss', [
      Validators.compose([Validators.required]),
    ]);
    this.id = new FormControl(0);

    this.CreateForm = this.fb.group({
      name: this.name,
      price: this.price,
      description: this.description,
      imageUrl: this.imageUrl,
      outOfStock: this.outOfStock,
      productId: this.id
    });
  }



  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }






  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
