

export enum UserColumns {
  UUID = "uuid",
  PUBLIC_KEY = "public_key",
  EMAIL_ADDRESS = "email_address",
  PASSWORD_HASH = "password_hash",
  WALLET_NAME = "wallet_name",
  ROLE = "role",
  IS_SOFT_DELETED = "is_soft_delete",
}

export enum OrderColumns {
  UUID = "uuid",
  BUYER_USER_ID = "buyer_user_id",
  SELLER_USER_ID = "SELLER_USER_ID",
  REFERENCE = "REFERENCE",
  REFERENCE_NUMBER = "REFERENCE_NUMBER",
  ORDER_ITEMS = "ORDER_ITEMS",
  STATUS = "STATUS",
  PAYMENT_STATUS = "PAYMENT_STATUS",
  PAYMENT_REQUEST = "PAYMENT_REQUEST",
  IS_SOFT_DELETED = "is_soft_delete",
}


export const TableColumns: any = {
  ID: "id",
  IS_ENABLED: "is_enabled",
  CREATED_AT: "created_at",
  UPDATED_AT: "updated_at",
};

export default TableColumns;
