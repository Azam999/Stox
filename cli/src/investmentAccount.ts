import chalk from 'chalk';

class InvestmentAccount {
  _accountName: string;
  _initialBalance: number;
  _balance: number;
  _accountNumber: number;
  _transactionHistory: ITransaction[];

  constructor(accountName: string, initialBalance: number) {
    this._accountName = accountName;
    this._initialBalance = initialBalance;
    this._balance = initialBalance;
    this._accountNumber = Math.floor(Math.random() * 1e9); // Generate a random 9-digit account number
    this._transactionHistory = [];
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

  deposit(amount: number): void {
    this._balance += amount;
  }

  withdraw(amount: number): void {
    this._balance -= amount;
  }

  get details(): string {
    return `Account Name: ${this._accountName}\nAccount Number: ${this._accountNumber}\nBalance: $${this._balance}`;
  }
}

export default InvestmentAccount;
