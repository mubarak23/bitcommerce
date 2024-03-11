import { Column, Entity } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { CategoriesColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { SimpleImageJson } from "../interfaces/SimpleImageJson";
import { utcNow } from "../utils/core";
import DefualtEntity from "./BaseEntity";


@Entity({ name: Tables.Categories })
export class Category extends DefualtEntity {
  @Column({ name: CategoriesColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: CategoriesColumns.NAME, nullable: false })
  name: string;

  @Column({ name: CategoriesColumns.DESCRIPTION, nullable: false })
  description: string;

  @Column({ type: "jsonb", name: CategoriesColumns.IMAGE, nullable: true })
  image: SimpleImageJson;

  @Column({
    type: "boolean",
    name: CategoriesColumns.IS_SOFT_DELETED,
    nullable: false,
    default: false,
  })
  isSoftDeleted: boolean;

  initializeNewCategory(name: string, description: string){
    const now = utcNow();
    this.uuid = uuidv4();
    this.name = name;
    this.description = description;
    this.createdAt = now;
    return this
  }
}