import chalk from 'chalk';
import config from './config/config';
import StockData from './stockData';
import { TransactionType } from './ts/enums/investmentAccount';
import { ITransaction } from './ts/interfaces/investmentAccount';
import IStock from './ts/interfaces/stock';

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

  static getAllOrders(accountNumber: number): [ITransaction[], ITransaction[]] {
    const orders = config.get(`orders.${accountNumber}`);
    const buyOrders: ITransaction[] = [];
    const sellOrders: ITransaction[] = [];

    // fill arrays with buy and sell orders
    orders.forEach((order: ITransaction) => {
      if (order.type.toUpperCase() === TransactionType.BUY) {
        buyOrders.push(order);
      } else if (order.type.toUpperCase() === TransactionType.SELL) {
        sellOrders.push(order);
      }
    });

    return [buyOrders, sellOrders];
  }

  static async buyOrder(ticker: string, quantity: string) {
    const stock: IStock[] = await StockData.getStockQuote([ticker]);
    const stockPrice = stock[0].regularMarketPrice;
    const totalPrice = stockPrice * parseInt(quantity);
    const date = Date.now();
    return {
      type: 'buy',
      ticker,
      stockPrice,
      quantity: parseInt(quantity),
      totalPrice,
      date,
    };
  }

  static async sellOrder(ticker: string, quantity: string, accountNumber: number) {
    const stock: IStock[] = await StockData.getStockQuote([ticker]);
    const stockPrice = stock[0].regularMarketPrice;
    const totalPrice = stockPrice * parseInt(quantity);
    const date = Date.now();

    const allOrders = this.getAllOrders(accountNumber);
    const buyOrders = allOrders[0];
    const sellOrders = allOrders[1];

    // determine if there is enough stock to sell
    

    return {
      type: 'sell',
      ticker,
      price: stockPrice,
      quantity: parseInt(quantity),
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
