
export interface FileData {
    filePath: string,
  
    mimeType: string;
    sizeInBytes: number;
  }
  
  
  export enum FileCloudProviders {
    CLOUDINARY = 'CLOUDINARY',
  }
  
  export enum UploadFileCategory {
    CATEGORY_PHOTO = 'CATEGORY_PHOTO',
    PRODUCT_PHOTO = 'PRODUCT_PHOTO',
    BRAND_PHOTO = 'BRAND_PHOTO',
    USER_PHOTO = 'USER_PHOTO',
  }
  