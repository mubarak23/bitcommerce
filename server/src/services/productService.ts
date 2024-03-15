
import { fiatToSatoshis } from 'bitcoin-conversion';
import _ from 'underscore';
import { getFreshConnection } from "../db";
import { AddProductCartDto } from '../dto/AddProductCartDto';
import { BrandResponse } from "../dto/BrandResponse";
import { CartResponse } from '../dto/CartResponse';
import { CategoryResponse } from "../dto/CategoryResponse";
import { NewBrandDto } from "../dto/NewBrandDto";
import { NewCategoryDto } from "../dto/NewCategoryDto";
import { NewProductDto } from "../dto/NewProductDto";
import { ProductResponse } from "../dto/ProductResponse";
import { Brand } from "../entity/Brand";
import { Cart } from '../entity/Cart';
import { Category } from "../entity/Category";
import { Product } from "../entity/Product";
import { User } from "../entity/User";
import { CartItemJson } from '../interfaces/CartItemJson';
import * as ProfileService from '../services/profileService';
import { UnprocessableEntityError } from "../utils/error-response-types";

export const newBrand = async (payload: NewBrandDto): Promise<BrandResponse> => {
  const connection = await getFreshConnection()
  const brandRepo = connection.getRepository(Brand)

  const brandExist = await brandRepo.findOne({
    where: { name: payload.name, isSoftDeleted: false}
  })

  if(brandExist){
    const brand: BrandResponse = {
      uuid: brandExist.uuid,
      name: brandExist.name,
      description: brandExist.description,
      image: brandExist.image
    }
    return brand
  }

  let newBrand = new Brand().initializeNewBrand(payload.name, payload.description)
  newBrand = await brandRepo.save(newBrand)

  return { 
    uuid: newBrand.uuid,
    name: newBrand.name,
    description: newBrand.description
  }
}

export const newCategory = async (payload: NewCategoryDto): Promise<CategoryResponse> => {
  const connection = await getFreshConnection()
  const categoryRepo = connection.getRepository(Category)

  const categoryExist = await categoryRepo.findOne({
    where: { name: payload.name, isSoftDeleted: false}
  })

  if(categoryExist){
    const category: CategoryResponse = {
      uuid: categoryExist.uuid,
      name: categoryExist.name,
      description: categoryExist.description,
      image: categoryExist.image
    }
    return category
  }

  let newCategory = new Category().initializeNewCategory(payload.name, payload.description)
  newCategory = await categoryRepo.save(newCategory)

  return { 
    uuid: newCategory.uuid,
    name: newCategory.name,
    description: newCategory.description
  }
}

export const fetchCategories = async (): Promise<CategoryResponse[]> => {
  const connection = await getFreshConnection()
  const categoryRepo = connection.getRepository(Category)

  const categories = await categoryRepo.find({
    where: { isSoftDeleted: false}
  })

  if(categories.length === 0){
    throw new UnprocessableEntityError('No Categories At the moment')
  }

  let transformCategories: CategoryResponse[] = []

  for( const category of  categories){

    const responseData: CategoryResponse = {
      uuid: category.uuid,
      name: category.name,
      description: category.description,
      image: category.image
    }
    transformCategories.push(responseData)
  }
  
    return transformCategories
  }

  export const transformCategory = async (uuid: string): Promise<CategoryResponse> => {

    const connection = await getFreshConnection()
    const categoryRepo = connection.getRepository(Category)

    const categoryExist = await categoryRepo.findOne({
      where: { uuid, isSoftDeleted: false}
    })
  
    if(!categoryExist){
     throw new UnprocessableEntityError("Category Does Not Exist")
    }

    const category: CategoryResponse = {
      uuid: categoryExist.uuid,
      name: categoryExist.name,
      description: categoryExist.description,
      image: categoryExist.image
    }
    return category

  }

  export const transformBrand = async (uuid: string): Promise<BrandResponse> => {

    const connection = await getFreshConnection()
    const brandRepo = connection.getRepository(Brand)

    const brandExist = await brandRepo.findOne({
      where: { uuid, isSoftDeleted: false}
    })
  
    if(!brandExist){
     throw new UnprocessableEntityError("Brand Does Not Exist")
    }

    const brand: BrandResponse = {
      uuid: brandExist.uuid,
      name: brandExist.name,
      description: brandExist.description,
      image: brandExist.image
    }
    return brand

  }


export const fetchBrands = async (): Promise<BrandResponse[]> => {
  const connection = await getFreshConnection()
  const brandRepo = connection.getRepository(Brand)

  const brands = await brandRepo.find({
    where: { isSoftDeleted: false}
  })

  if(brands.length === 0){
    throw new UnprocessableEntityError('No Brands At the moment')
  }

  let transformCategories: BrandResponse[] = []

  for( const brand of  brands){

    const responseData: BrandResponse = {
      uuid: brand.uuid,
      name: brand.name,
      description: brand.description,
      image: brand.image
    }
    transformCategories.push(responseData)
  }
  
    return transformCategories
  }


  export const fetchCartItems = async (buyerId: number): Promise<CartResponse> => {
    const connection = await getFreshConnection()
    const cartRepo = connection.getRepository(Cart)
  
    const buyerCart = await cartRepo.findOne({
      where: { userId: buyerId, isSoftDeleted: false}
    })
  
    if(buyerCart){
      throw new UnprocessableEntityError('No Cart Available')
    }

    if(buyerCart.cartItems.length === 0){
      throw new UnprocessableEntityError('No items in cart at the moment')
    }
  
    let transformCart: CartResponse = {
      uuid: buyerCart.uuid,
      cartItems: buyerCart.cartItems,
      userId: buyerCart.userId
    }
  
    return transformCart
  
  }
  

  export const saveNewProduct = async (sellerUser: User, payload: NewProductDto): Promise<ProductResponse> => {
    const connection = await getFreshConnection()
    const productRepo = connection.getRepository(Product)
    const brandRepo = connection.getRepository(Brand)
   const categoryRepo = connection.getRepository(Category)
  
    const productExist = await productRepo.findOne({
      where: { name: payload.name, isSoftDeleted: false}
    })
  
    if(productExist){
      throw new UnprocessableEntityError(`Product with Provided Name already exist - ${payload.name}`)
    }
    
    const category = await categoryRepo.findOne({
      uuid: payload.categoryUuid, isSoftDeleted: false 
    })

    if(!category){
      throw new UnprocessableEntityError("Category Does Not Exist")
    }

    const brandExist = await brandRepo.findOne({
      where: { uuid: payload.brandUuid, isSoftDeleted: false}
    })
  
    if(!brandExist){
     throw new UnprocessableEntityError("Brand Does Not Exist")
    }

    const satsAmount = await fiatToSatoshis(payload.price, 'NGN');
    let newProduct = new Product().initializeNewProductBySeller(sellerUser.id, payload.name, payload.description, payload.price, satsAmount, payload.maxQty, payload.minQty)

    newProduct = await productRepo.save(newProduct)
  
    const responseData: ProductResponse = {
      productUuid: newProduct.uuid,
      brandUuid: brandExist.uuid,
      categoryUuid: category.uuid,
      name: newProduct.name,
      description: newProduct.description,
      minQty: newProduct.minQty,
      maxQty: newProduct.maxQty,
      price: newProduct.price,
      priceInSats: satsAmount,
      seller: sellerUser

    }
    return responseData
  }


  export const addProductToCart = async (buyerUser: User,  payload: AddProductCartDto): Promise<boolean> => {
    const connection = await getFreshConnection()
    const prooductRepo = connection.getRepository(Product)
    const cartRepo = connection.getRepository(Cart)
    
    const productExist = await prooductRepo.findOne({
      where: { uuid: payload.productUuid, isSoftDeleted: false}
    })

    if(!productExist){
      throw new UnprocessableEntityError("Product Does Not Exist")
    }

    const userCartExist = await cartRepo.findOne({
      where: { userId: buyerUser.id, isSoftDeleted: false }
    })

    if(!userCartExist) {
      let newCart = new Cart().initializeFirstCart(buyerUser.id, productExist, payload.quantity)

      await cartRepo.save(newCart)
      return true
    }
    
    const { cartItems } = userCartExist;
    const itemFoundInCart: CartItemJson | undefined = cartItems.find(
      (cartItem) => cartItem.productUuid === productExist.uuid
    );

    if(!itemFoundInCart){
      const newCartItem: CartItemJson = {
        productUuid: productExist.uuid,
        productId: productExist.id,
        quantity: payload.quantity,
        productName: productExist.name,
        unitPrice: productExist.price,
      }
      await cartRepo.createQueryBuilder()
      .update(Cart)
      .set({
        cartItems: [...cartItems, newCartItem]
      })
      .where({
        id: userCartExist.id
      })
      .execute()

      return true
    }

    itemFoundInCart.productId = productExist.id,
    itemFoundInCart.productUuid = productExist.uuid,
    itemFoundInCart.quantity = payload.quantity,
    itemFoundInCart.unitPrice = productExist.price,
    itemFoundInCart.productName = productExist.name

    await cartRepo.createQueryBuilder()
    .update(Cart)
    .set({
      cartItems
    })
    .where({
      id: userCartExist.id
    })
    .execute()
      
    return true
   
    }

 
    export const transformProducts = async (products: Product[]): Promise<ProductResponse[]> => {
      if(!products.length) {
        return []
      }

      const sellerUserIds = products.filter((product) => product.isActive === true).map((product) => product.userId);
    
      const sellerPublicProfiles = await ProfileService.getPublicProfileFromUserIds(
        sellerUserIds
      );
    

      const productsResponse: ProductResponse[] = []
    
      for(const product of products) {

        const sellerUserUuid = product.sellerUser.uuid;
        const sellerPublicProfile = sellerPublicProfiles.find(
          (publicProfile) => publicProfile.uuid === sellerUserUuid
        );
    
        const productImages = product.images || []
        const productResponseImages: {url: string, mimetype: string, keyFromCloudProvider: string }[] = 
          productImages.map(pImage => _.omit(pImage, 'fileCloudProvider'))

        const transformProduct: ProductResponse = {
          productUuid: product.uuid,
          categoryUuid: product.category.uuid,
          categoryName: product.category.name,
          brandUuid: product.brand.uuid,
          brandName: product.brand.name,
          name: product.name,
          description: product.description,
          minQty: product.minQty,
          maxQty: product.maxQty,
          price: product.price,
          priceInSats: product.priceInSats,
          images: productResponseImages,
          seller: sellerPublicProfile
        }
        productsResponse.push(transformProduct)
      }
    
      return productsResponse;
    };
    
    
    export const transformProduct = async (productUuid: string): Promise<ProductResponse> => {

      const connection = await getFreshConnection()
      const productRepo = connection.getRepository(Product)
    
     
      const join = {
        alias: "product",
        leftJoinAndSelect: {
          sellerUser: "product.sellerUser",
          category: "product.category",
          brand: "product.brand",
        },
      };
  
      const productExist = await productRepo.findOne({
        where: { uuid: productUuid, isSoftDeleted: false},
        join
      })
    
      if(!productExist){
       throw new UnprocessableEntityError("Product Does Not Exist")
      }


      const sellerPublicProfile = await ProfileService.IPublicProfile(
        productExist.sellerUser
      ); 
  
      const transformProduct: ProductResponse = {
        productUuid: productExist.uuid,
        categoryUuid: productExist.category.uuid,
        categoryName: productExist.category.name,
        brandUuid: productExist.brand.uuid,
        brandName: productExist.brand.name,
        name: productExist.name,
        description: productExist.description,
        minQty: productExist.minQty,
        maxQty: productExist.maxQty,
        price: productExist.price,
        priceInSats: productExist.priceInSats,
        images: productExist.images,
        seller: sellerPublicProfile
      }
      return transformProduct
  
    }
