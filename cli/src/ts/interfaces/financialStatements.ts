interface IBalanceSheetValue {
  raw: number;
  fmt: string;
  longFmt: string;
}

interface IBalanceSheet {
  maxAge?: number;
  endDate?: {
    raw: number;
    fmt: string;
  };
  cash?: IBalanceSheetValue;
  shortTermInvestments?: IBalanceSheetValue;
  netReceivables?: IBalanceSheetValue;
  inventory?: IBalanceSheetValue;
  otherCurrentAssets?: IBalanceSheetValue;
  totalCurrentAssets?: IBalanceSheetValue;
  longTermInvestments?: IBalanceSheetValue;
  propertyPlantEquipment?: IBalanceSheetValue;
  goodWill?: IBalanceSheetValue;
  intangibleAssets?: IBalanceSheetValue;
  otherAssets?: IBalanceSheetValue;
  deferredLongTermAssetCharges?: IBalanceSheetValue;
  totalAssets?: IBalanceSheetValue;
  accountsPayable?: IBalanceSheetValue;
  shortLongTermDebt?: IBalanceSheetValue;
  otherCurrentLiab?: IBalanceSheetValue;
  longTermDebt?: IBalanceSheetValue;
  otherLiab?: IBalanceSheetValue;
  minorityInterest?: IBalanceSheetValue;
  totalCurrentLiabilities?: IBalanceSheetValue;
  totalLiab?: IBalanceSheetValue;
  commonStock?: IBalanceSheetValue;
  retainedEarnings?: IBalanceSheetValue;
  treasuryStock?: IBalanceSheetValue;
  capitalSurplus?: IBalanceSheetValue;
  otherStockholderEquity?: IBalanceSheetValue;
  totalStockholderEquity?: IBalanceSheetValue;
  netTangibleAssets?: IBalanceSheetValue;
}

export default IBalanceSheet;