import { identifierName } from '@angular/compiler';
import { Component, Inject, INJECTOR, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog'
import { AnimateTimings } from '@angular/animations';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit{


  freshnessList = ["Cty1", "Cty2", "Cty3"];
  productForm !: FormGroup;
  actionBtn : string ="save"
  constructor(private fromBuilder : FormBuilder ,
     private api : ApiService,
     @Inject(MAT_DIALOG_DATA) public editData : any,
     private dialogRef: MatDialogRef<DialogComponent>){}

  ngOnInit(): void {
    this.productForm = this.fromBuilder.group({
      iotName : ['',Validators.required],
      phankhuc : ['',Validators.required],
      freshness : ['',Validators.required],
      price : ['',Validators.required],
      comment : ['',Validators.required],
      date : ['',Validators.required]
    });

    if(this.editData){
      this.actionBtn = "update";
      this.productForm.controls['iotName'].setValue(this.editData.iotName);
      this.productForm.controls['phankhuc'].setValue(this.editData.phankhuc);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
    }
  }
  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value).subscribe({
          next:(res)=>{
            alert("them thanh cong");
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Them that bai")
          }
          
        })
        
      }
    }else{
      this.updateProduct()
    }
  }
  updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData.id).subscribe({
      next:(res)=>{
        alert("Successfully");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("error");
      }
    })
    
  }
}
