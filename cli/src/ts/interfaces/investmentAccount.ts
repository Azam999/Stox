import { TransactionType, SecurityType } from '../enums/investmentAccount';
interface ITransaction {
  type: TransactionType;
  securityType: SecurityType;
  symbol: string;
  quantity: number;
  price: number;
  date: Date;
  // orderType: string
}

export default ITransaction;