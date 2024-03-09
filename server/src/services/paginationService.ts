// import { FindManyOptions, ObjectType } from "typeorm";
// import BaseEntity from "../entity/BaseEntity"
// import { SortOrder } from "../enums/SortOrder";
// import { BadRequestError } from "../utils/error-response-types";
// import { getFreshConnection } from "../db";
// import { IPaginatedList } from "../dto/IPaginatedList";


// export async function paginate<T extends ObjectType<BaseEntity>>(
//     entityClass: T, query: any,
//     pageSize: number, page: string | number,
//     sortOrder: SortOrder,
//     selectFields?: string[], join?: any): Promise<IPaginatedList<BaseEntity>> {
//   try {
//     parseInt(typeof page === 'number' ? `${  page}` : page)
//   } catch(e) {
//     throw new BadRequestError(`Specify a valid page number`)
//   }

//   const pageNumber = Number(page)
 
//   const connection = await getFreshConnection()
//   const repo = connection.getRepository(entityClass)

//   const totalNumber = await repo.count(query)

//   const offset = (pageNumber - 1) * pageSize
  
//   if(offset > totalNumber) {
//     const resData = {
//       pageNumber,
//       total: totalNumber,
//       pageSize,
//       dataset: []
//     }
//     return resData
//   }
//   const findParameters: FindManyOptions<BaseEntity> = {
//     where: query,
//     order: { createdAt: sortOrder },
//     take: pageSize,
//     skip: offset,
//   }
//   if (selectFields) {
//     // @ts-ignore
//     findParameters.select = selectFields
//   }
//   if (join) {
//     // @ts-ignore
//     findParameters.join = join
//   }
  
//   const pageResults = await repo.find(findParameters)

//   return {
//     pageNumber,
//     total: totalNumber,
//     pageSize,
//     dataset: pageResults
//   }
// }
