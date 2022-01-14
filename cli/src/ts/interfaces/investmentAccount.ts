interface ITransaction {
  type: ITransactionType;
  securityType: ISecurityType;
  symbol: string;
  quantity: number;
  price: number;
  date: Date;
  // orderType: string
}
