import StockData from "./stockData";
import ITransaction from "./ts/interfaces/investmentAccount";
import IStock from "./ts/interfaces/stock";

class InvestmentAccount {
  _accountName: string;
  _initialBalance: number;
  _balance: number;
  _accountNumber: number;
  _transactionHistory: ITransaction[];
  _holdings: string[];

  constructor(accountName: string, initialBalance: number) {
    this._accountName = accountName;
    this._initialBalance = initialBalance;
    this._balance = initialBalance;
    this._accountNumber = Math.floor(Math.random() * 1e9); // Generate a random 9-digit account number
    this._transactionHistory = [];
    this._holdings = [];
  }

  get initialBalance(): number {
    return this._initialBalance;
  }

  get accountName(): string {
    return this._accountName;
  }

  get accountNumber(): number {
    return this._accountNumber;
  }

  get balance(): number {
    return this._balance;
  }

  set balance(balance: number) {
    this._balance = balance;
  }

  get details(): string {
    return `Account Name: ${this._accountName}\nAccount Number: ${this._accountNumber}\nBalance: $${this._balance}`;
  }

  static async buyOrder(ticker: string, quantity: number) {
    const stock: IStock[] = await StockData.getStockQuote([ticker]);
    const stockPrice = stock[0].regularMarketPrice;
    const totalPrice = stockPrice * quantity;
    const date = Date.now();
    return {
      type: 'buy',
      ticker,
      stockPrice,
      quantity,
      totalPrice,
      date,
    };
  }

  static async sellOrder(ticker: string, quantity: number) {
    const stock: IStock[] = await StockData.getStockQuote([ticker]);
    const stockPrice = stock[0].regularMarketPrice;
    const totalPrice = stockPrice * quantity;
    const date = Date.now();
    return {
      type: 'sell',
      ticker,
      price: stockPrice,
      quantity,
      totalPrice,
      date,
    };
  }

  get holdings(): string[] {
    return this._holdings;
  }

  grossProfit(): number {
    return 0;
  }

  get transactionHistory(): ITransaction[] {
    return this._transactionHistory;
  }
}

export default InvestmentAccount;
