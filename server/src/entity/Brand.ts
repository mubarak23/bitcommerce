import { Column, Entity } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { BrandColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { SimpleImageJson } from "../interfaces/SimpleImageJson";
import { utcNow } from "../utils/core";
import DefualtEntity from "./BaseEntity";


@Entity({ name: Tables.Brands })
export class Brand extends DefualtEntity {
  @Column({ name: BrandColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: BrandColumns.NAME, nullable: false })
  name: string;

  @Column({ name: BrandColumns.DESCRIPTION, nullable: false })
  description: string;

  @Column({ type: "jsonb", name: BrandColumns.IMAGE, nullable: true })
  image: SimpleImageJson;


  @Column({
    type: "boolean",
    name: BrandColumns.IS_SOFT_DELETED,
    nullable: false,
    default: false,
  })
  isSoftDeleted: boolean;

  initializeNewBrand(name: string, description: string){
    const now = utcNow();
    this.uuid = uuidv4();
    this.name = name;
    this.description = description;
    this.createdAt = now;
    return this
  }
}