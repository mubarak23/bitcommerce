
import { fiatToSatoshis } from 'bitcoin-conversion';
import { getFreshConnection } from "../db";
import { BrandResponse } from "../dto/BrandResponse";
import { CategoryResponse } from "../dto/CategoryResponse";
import { NewBrandDto } from "../dto/NewBrandDto";
import { NewCategoryDto } from "../dto/NewCategoryDto";
import { NewProductDto } from "../dto/NewProductDto";
import { ProductResponse } from "../dto/ProductResponse";
import { Brand } from "../entity/Brand";
import { Category } from "../entity/Category";
import { Product } from "../entity/Product";
import { User } from "../entity/User";
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

    }
    return responseData
  }





