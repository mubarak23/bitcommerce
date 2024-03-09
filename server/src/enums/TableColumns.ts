



export enum ServiceColumns {
  UUID = "uuid",
  NAME = "name",
  IS_SOFT_DELETED = "is_soft_delete"
}

export enum ServiceTransactionColumns {
  UUID = "uuid",
  SERVICE_ID = "service_id",
  SERVICE_NAME = "service_name",
  PROVIDER = "provider",
  PAYER_EMAIL = "payer_email",
  PAYER_NAME = "payer_name",
  AMOUNT = "amount",
  SATS_AMOUNT = "SATS_AMOUNT",
  INVOICE_REQUEST = "invoice_request",
  PHONE_NUMBER = "phone_number",
  METER_NUMBER = "meter_number",
  DESCRIPTION = "description",
  REFERENCE = "reference",
  STATUS = "status",
  PAYMENT_HASH = "payment_hash",
  INVOICE_RESPONSE = "invoice_response", 
  IS_SOFT_DELETED = "is_soft_delete"
}

export enum AlbyWebhookColumns {
  UUID = "uuid",
  ALBY_ID = "alby_id",
  DESCRIPTION = "description",
  URL = "url",
  FILTER_TYPE = "filter_type",
  WEBHOOK_REQUEST = "webhook_request",
  WEBHOOK_RESPONSE = "webhook_response",
  IS_SOFT_DELETED = "is_soft_delete",
}


export const TableColumns: any = {
  ID: "id",
  IS_ENABLED: "is_enabled",
  CREATED_AT: "created_at",
  UPDATED_AT: "updated_at",
};

export default TableColumns;
