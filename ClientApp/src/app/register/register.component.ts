
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from './../services/account.service';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  returnUrl: string;
  errorList: string[];
  registerForm: FormGroup;
  username: FormControl;
  password: FormControl;
  confirmPassword: FormControl;

  email: FormControl;

  modalRef: BsModalRef;
  @ViewChild('template') modal: TemplateRef<any>;


  constructor(private FB: FormBuilder, private Acc: AccountService,
    private Router: Router,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.username = new FormControl('', [Validators
      .compose([Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)])

    ]);



    this.password = new FormControl('', [Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=.*[$@]).{8,30}$/)
    ])


    ]);

    this.confirmPassword = new FormControl('', [Validators.compose([
      Validators.required,
      this.MustMatch(this.password)
    ])


    ]);

    this.email = new FormControl('', [Validators.required, Validators.email]);

    this.registerForm = this.FB.group({
      "username": this.username,
      "password": this.password,
      "email": this.email,
      "confirmPassword": this.confirmPassword
    }

    )

  }

  Register() {
    this.errorList = [];
    console.log(this.registerForm.value)
    var regData = this.registerForm.value
    this.Acc.Register(regData.username, regData.password, regData.email).subscribe(result => {

      console.log("ReturnUrl : " + this.returnUrl + "Result :  Ok")
      alert('successfully Registerd')
    },
      errors => {
        console.log(errors)
        errors.error.value.forEach(err => {
          this.errorList.push(err);
          this.modalRef = this.modalService.show(this.modal);
        });

      }

    )

  }


  Validatepassword(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }



  MustMatch(passwordControl: AbstractControl): ValidatorFn {
    return (cpasswordControl: AbstractControl): { [key: string]: boolean } | null => {
      // return null if controls haven't initialised yet
      if (!passwordControl && !cpasswordControl) {
        return null;
      }

      // return null if another validator has already found an error on the matchingControl
      if (cpasswordControl.hasError && !passwordControl.hasError) {
        return null;
      }
      // set error on matchingControl if validation fails
      if (passwordControl.value !== cpasswordControl.value) {
        return { 'mustMatch': true };
      }
      else {
        return null;
      }

    }


  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }







}
