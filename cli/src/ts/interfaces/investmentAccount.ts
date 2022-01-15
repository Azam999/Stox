import { ITransactionType, ISecurityType } from '../enums/investmentAccount';
interface ITransaction {
  type: ITransactionType;
  securityType: ISecurityType;
  symbol: string;
  quantity: number;
  price: number;
  date: Date;
  // orderType: string
}

export default ITransaction;