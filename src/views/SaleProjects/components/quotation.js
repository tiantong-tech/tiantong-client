const quotationTypeMap = {
  mechanics: '机械报价',
  engineering: '工程报价',
  electronic_control: '电控报价',
}

export function getQuotationTypeText (type) {
  return quotationTypeMap[type]
}
