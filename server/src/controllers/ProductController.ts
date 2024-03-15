import { Body, Get, Post, Request, Route, Security, Tags } from "tsoa"
import { AddProductCartDto } from "../dto/AddProductCartDto"
import { BrandResponse } from "../dto/BrandResponse"
import { CartResponse } from "../dto/CartResponse"
import { CategoryResponse } from "../dto/CategoryResponse"
import { NewBrandDto } from "../dto/NewBrandDto"
import { NewCategoryDto } from "../dto/NewCategoryDto"
import { NewProductDto } from "../dto/NewProductDto"
import { ProductResponse } from "../dto/ProductResponse"
import { User } from "../entity/User"
import { IServerResponse } from "../interfaces/IServerResponse"
import * as ProductService from '../services/productService'

@Route("/api/product")
@Tags("Product Service")
export class ProductController {


@Get('/category')
public async handleFetchCategories(@Request() req: any): Promise<IServerResponse<CategoryResponse[]>> {
  
    const fetchAllCategories = await ProductService.fetchCategories()

    const resData: IServerResponse<CategoryResponse[]> = {
      status: true,
      data: fetchAllCategories
    }
    return resData
  }

@Get('/brand')
public async handleFetchBrands(@Request() req: any): Promise<IServerResponse<BrandResponse[]>> {
    
      const fetchAllBrands = await ProductService.fetchBrands()
  
      const resData: IServerResponse<BrandResponse[]> = {
        status: true,
        data: fetchAllBrands
      }
      return resData
  }  

@Security("jwt")
@Get('/fetch-cart-items')
public async handleFetchCartItems(@Request() req: any): Promise<IServerResponse<CartResponse>> {

      const currentUser = req.user;

      const fetchCartItems = await ProductService.fetchCartItems(currentUser.id)
  
      const resData: IServerResponse<CartResponse> = {
        status: true,
        data: fetchCartItems
      }
      return resData
  }  


@Post("/category")
public async handlNewCategory(@Body() reqBody: NewCategoryDto) : Promise<IServerResponse<CategoryResponse>>{
   
    const newCategory = await ProductService.newCategory(reqBody)
   
    const resData : IServerResponse<CategoryResponse> = {
        status: true,
        data:newCategory,
        message: 'New Product Category Created' 
    }
    return resData
}

@Post("/brand")
public async handlNewBrand(@Body() reqBody: NewBrandDto) : Promise<IServerResponse<BrandResponse>>{
   
    const newCategory = await ProductService.newBrand(reqBody)
   
    const resData : IServerResponse<BrandResponse> = {
        status: true,
        data:newCategory,
        message: 'New Product Category Created' 
    }
    return resData
}


@Security("jwt")
@Post('/new')
public async handleNewProduct(@Request() req: any, @Body() reqBody: NewProductDto): Promise<IServerResponse<ProductResponse>> {
    
    const currentUser: User = req.user

    const saveNewProduct = await ProductService.saveNewProduct(currentUser, reqBody)
    
    const resData: IServerResponse<ProductResponse> = {
      status: true,
      data: saveNewProduct
    }

    return resData
  }

@Security("jwt")
@Post('/add-to-cart')
public async handleAddProductToCart(@Request() req: any, @Body() reqBody: AddProductCartDto): Promise<IServerResponse<boolean>> {
    
    const currentUser: User = req.user

    const addProductToCart = await ProductService.addProductToCart(currentUser, reqBody)
    
    const resData: IServerResponse<boolean> = {
      status: true,
      data: addProductToCart
    }

    return resData
  }



}
