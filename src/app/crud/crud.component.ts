import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { productModel } from '../model/product';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CrudComponent {
  productForm: FormGroup = new FormGroup({});
  productObj: productModel = new productModel();
  productList: productModel[] = [];

  constructor() {
    this.createForm();
    const oldData = localStorage.getItem("ProdData");
    console.log("Retrieved data from localStorage:", oldData);
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.productList = parseData;
    } else {
      this.productList = [];
    }
  }
  
  createForm() {
    this.productForm = new FormGroup({
      proId: new FormControl(this.productObj.ProId),
      ProName: new FormControl(this.productObj.ProName), // Konsisten dengan HTML
      ProDesc: new FormControl(this.productObj.ProDesc),
      ProPrice: new FormControl(this.productObj.ProPrice),
      ProImg: new FormControl(this.productObj.ProImg)
    });
  }  

  onSave() {
    const oldData = localStorage.getItem("ProdData");
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.productForm.controls['proId'].setValue(parseData.length +1);
      this.productList.unshift(this.productForm.value);
    } else {
      this.productList.unshift(this.productForm.value);
    }
    console.log("Product List:", this.productList); // Cek data yang akan disimpan
    localStorage.setItem("ProdData", JSON.stringify(this.productList));
  }
  

  onDelete(item: productModel) {
    const index = this.productList.indexOf(item);
    if (index > -1) {
      this.productList.splice(index, 1);
      localStorage.setItem("ProdData", JSON.stringify(this.productList));
    }
  }
  
  onEdit(item: productModel) {
    this.productForm.patchValue({
      proId: item.ProId,
      ProName: item.ProName,
      ProDesc: item.ProDesc,
      ProPrice: item.ProPrice,
      ProImg: item.ProImg
    });
  }
}


