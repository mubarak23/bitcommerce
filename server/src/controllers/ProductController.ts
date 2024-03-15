import { Body, Get, Post, Query, Request, Route, Security, Tags } from "tsoa"
import { getFreshConnection } from "../db"
import { AddProductCartDto } from "../dto/AddProductCartDto"
import { BrandResponse } from "../dto/BrandResponse"
import { CartResponse } from "../dto/CartResponse"
import { CategoryResponse } from "../dto/CategoryResponse"
import { IPaginatedList } from "../dto/IPaginatedList"
import { NewBrandDto } from "../dto/NewBrandDto"
import { NewCategoryDto } from "../dto/NewCategoryDto"
import { NewProductDto } from "../dto/NewProductDto"
import { ProductResponse } from "../dto/ProductResponse"
import { Product } from "../entity/Product"
import { User } from "../entity/User"
import { SortOrder } from "../enums/SortOrder"
import { IServerResponse } from "../interfaces/IServerResponse"
import * as PaginationService from "../services/paginationService"
import * as ProductService from "../services/productService"
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

  @Get("/")
  public async handleFetchProducts(
    @Query("pageNumber") pageNumber: any,
    @Query("sortOrder") sortOrder: SortOrder,
  ): Promise<IServerResponse<IPaginatedList<ProductResponse>>> {

    const connection = await getFreshConnection()
    const productRepo = connection.getRepository(Product)

    const query: any = {
      isSoftDeleted: false,
    };
    const join = {
      alias: "product",
      leftJoinAndSelect: {
        user: "product.user",
        category: "product.category",
        brand: "product.brand",
      },
    };

    const pageSize = 20;

    const productListsPages = await PaginationService.paginate(Product,
      query, pageSize, pageNumber, sortOrder, undefined) as IPaginatedList<Product>

    const products: Product[] = productListsPages.dataset;

    const total = await productRepo.count(query);

    const productsResponse: ProductResponse[] =
      await ProductService.transformProducts(products);

    const resData: IServerResponse<IPaginatedList<ProductResponse>> = {
      status: true,
      data: { pageNumber, total, pageSize, dataset: productsResponse },
    };
    return resData;
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
