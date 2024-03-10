import { Column, Entity } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Roles } from "../enums/Roles";
import { UserColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { utcNow } from "../utils/core";
import DefualtEntity from "./BaseEntity";


@Entity({ name: Tables.Users })
export class User extends DefualtEntity {
  @Column({ name: UserColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: UserColumns.PUBLIC_KEY, nullable: true })
  publicKey: string;

  @Column({ name: UserColumns.EMAIL_ADDRESS, nullable: false })
  emailAddress: string;

  @Column({ name: UserColumns.PASSWORD_HASH, nullable: false})
  passwordHash: string;

  @Column({ name: UserColumns.WALLET_NAME, nullable: true })
  walletName: string;

  @Column({ name: UserColumns.ROLE, nullable: true, default: Roles.BUYER})
  role: Roles;

  @Column({
    type: "boolean",
    name: UserColumns.IS_SOFT_DELETED,
    nullable: false,
    default: false,
  })
  isSoftDeleted: boolean;

  initializeNewUser(emailAddress: string, passwordHash: string){
    const now = utcNow();
    this.uuid = uuidv4();
    this.emailAddress = emailAddress,
    this.passwordHash = passwordHash,
    this.createdAt = now;
    return this
  }
}