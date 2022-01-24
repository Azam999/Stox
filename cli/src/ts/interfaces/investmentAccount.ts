import { TransactionType, SecurityType } from '../enums/investmentAccount';
interface ITransaction {
  type: TransactionType;
  ticker: string;
  price: number;
  quantity: number;
  totalPrice: number;
  date: Date;
  // orderType: string
}

interface IAccount {
  name: string;
  number: number;
  balance: number;
  initialBalance: number;
}

interface IAccountInfo {
  accountName: string;
  initialBalance: string;
}

export { ITransaction, IAccount, IAccountInfo };