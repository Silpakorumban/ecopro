import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../apicall.service';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
public productList:any;
public filterCategory : any

searchKey:string ="";
  constructor(private api:ApicallService,private cartService : CartService, private router:Router) { }

  ngOnInit(): void {


    this.api.getProduct().subscribe((Data) => {
      this.productList=JSON.parse(JSON.stringify(Data));
      this.filterCategory = Data;
      this.productList.forEach((a:any) => {
        if(a.category ==="women's clothing" || a.category ==="men's clothing"){
          a.category ="fashion"
        }
        Object.assign(a,{quantity:1,total:a.price});
      });
      console.log(this.productList)
    });

     this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }
  
  filter(category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })
   
}
addtocart(item:any){
  
  this.cartService.addtoCart(item);
  this.router.navigate(['cart'])
  console.log("hai")
  console.log(item)

}
}