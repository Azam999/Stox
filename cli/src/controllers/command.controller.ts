import ora from 'ora';
import StockData from '../stockData';
import FinanceUtility from '../financeUtility';
import Table from 'cli-table3';
import chalk from 'chalk';
import inquirer from 'inquirer';
import InvestmentAccount from '../investmentAccount';
import IStock from '../ts/interfaces/stock';
import Configstore from 'configstore';
import { TransactionType } from '../ts/enums/investmentAccount';
import config from '../config/config';

class CommandController {
  static async stockQuotes(tickers: string) {
    const stockLabels = [
      'Ticker',
      'Price',
      'Chng',
      'Chng %',
      'Bid',
      'Ask',
      'Open',
      'Low',
      'High',
      'Vol',
      'Mkt Cap',
      '52w High',
      '52w Low',
      'P/E',
      'P/B',
      'Yield',
      'Pre %',
      'After %',
    ];

    const spinner = ora('Fetching stock data...').start();
    let stockQuotes = await StockData.getStockQuote(tickers.split(','));
    spinner.stop();

    stockQuotes = stockQuotes.filter(
      (stock: any) => stock.quoteType === 'EQUITY' || stock.quoteType === 'ETF'
    );

    const table = new Table({
      style: {
        head: ['cyan'],
      },
      head: stockLabels,
      colWidths: [10, 10],
    });

    table.push(
      ...stockQuotes.map((stock: IStock) => [
        chalk.yellow(stock.symbol),
        chalk.white(`$${stock.regularMarketPrice}`),
        FinanceUtility.greenOrRed(
          parseFloat(stock.regularMarketChange.toFixed(2)),
          '$',
          true
        ),
        FinanceUtility.greenOrRed(
          parseFloat(stock.regularMarketChangePercent.toFixed(2)),
          '%',
          false
        ),
        chalk.white(`$${stock.bid}`),
        chalk.white(`$${stock.ask}`),
        chalk.white(`$${stock.regularMarketOpen}`),
        chalk.white(`$${stock.regularMarketDayLow}`),
        chalk.white(`$${stock.regularMarketDayHigh}`),
        chalk.white(
          StockData.largeNumberFormat(
            stock.regularMarketVolume
          ).toLocaleString()
        ),
        chalk.white(
          stock.marketCap
            ? `$${StockData.largeNumberFormat(
                stock.marketCap
              ).toLocaleString()}`
            : 'N/A'
        ),
        chalk.white(`$${stock.fiftyTwoWeekHigh}`),
        chalk.white(`$${stock.fiftyTwoWeekLow}`),
        chalk.white(stock.trailingPE ? stock.trailingPE.toFixed(2) : 'N/A'),
        chalk.white(stock.priceToBook ? stock.priceToBook.toFixed(2) : 'N/A'),
        chalk.white(
          stock.trailingAnnualDividendYield
            ? (stock.trailingAnnualDividendYield * 100).toFixed(2)
            : 'N/A'
        ),
        stock.preMarketChangePercent
          ? FinanceUtility.greenOrRed(
              parseFloat(stock.preMarketChangePercent.toFixed(2)),
              '%',
              false
            )
          : chalk.white('N/A'),
        stock.postMarketChangePercent
          ? FinanceUtility.greenOrRed(
              parseFloat(stock.postMarketChangePercent.toFixed(2)),
              '%',
              false
            )
          : chalk.white('N/A'),
      ])
    );

    console.log(table.toString());
  }

  static async balanceSheets(period: string, ticker: string) {
    if (period === 'quarterly') {
      const spinner = ora('Fetching balance sheet...').start();
      const balanceSheets = await StockData.balanceSheetHistoryQuarterly(
        ticker
      );
      spinner.stop();

      FinanceUtility.printFinancialStatements(balanceSheets);
    } else if (period === 'annual') {
      const spinner = ora('Fetching balance sheet...').start();
      const balanceSheets = await StockData.balanceSheetHistory(ticker);
      spinner.stop();

      FinanceUtility.printFinancialStatements(balanceSheets);
    }
  }

  static async incomeStatements(period: string, ticker: string) {
    if (period === 'quarterly') {
      const spinner = ora('Fetching income statement...').start();
      const incomeStatements = await StockData.incomeStatementHistoryQuarterly(
        ticker
      );
      spinner.stop();

      FinanceUtility.removeEmptyIncomeStatementValues(incomeStatements);
      FinanceUtility.printFinancialStatements(incomeStatements);
    } else if (period === 'annual') {
      const spinner = ora('Fetching income statement...').start();
      const incomeStatements = await StockData.incomeStatementHistory(ticker);
      spinner.stop();

      FinanceUtility.removeEmptyIncomeStatementValues(incomeStatements);
      FinanceUtility.printFinancialStatements(incomeStatements);
    }
  }

  static async cashflowStatements(period: string, ticker: string) {
    if (period === 'quarterly') {
      const spinner = ora('Fetching cash flow statement...').start();
      const cashflowStatements =
        await StockData.cashflowStatementHistoryQuarterly(ticker);
      spinner.stop();

      FinanceUtility.printFinancialStatements(cashflowStatements);
    } else if (period === 'annual') {
      const spinner = ora('Fetching cash flow statement...').start();
      const cashflowStatements = await StockData.cashflowStatementHistory(
        ticker
      );
      spinner.stop();

      FinanceUtility.printFinancialStatements(cashflowStatements);
    }
  }

  static async indices() {
    const spinner = ora('Fetching indices...').start();
    const indices = await StockData.getIndices();
    spinner.stop();

    const indexLabels: string[] = ['Index', 'Price', 'Chng', 'Chng %'];

    const table = new Table({
      style: {
        head: ['cyan'],
      },
      head: indexLabels,
      colWidths: [10, 10],
    });

    table.push(
      ...indices.map((index: any) => [
        chalk.yellow(index.symbol),
        chalk.white(index.regularMarketPrice),
        FinanceUtility.greenOrRed(index.regularMarketChange, '$', true),
        FinanceUtility.greenOrRed(index.regularMarketChangePercent, '%', false),
      ])
    );

    console.log(table.toString());
  }

  static accountAction(action: string) {
    // Investment Account Name
    // Initial Balance
    // Interest Rate

    if (action == 'create') {
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'accountName',
            message: chalk.blue('Account Name:'),
          },
          {
            type: 'input',
            name: 'initialBalance',
            message: chalk.blue('Initial Balance ($):'),
          },
        ])
        .then((info: any) => {
          if (info.accountName && info.initialBalance) {
            if (
              typeof parseFloat(info.initialBalance) !== 'number' ||
              parseFloat(info.initialBalance) <= 0
            ) {
              console.log(
                `Initial balance must be a ${chalk.yellow(
                  'number'
                )} and ${chalk.yellow('greater than 0')}.`
              );
            } else {
              const account = new InvestmentAccount(
                info.accountName,
                parseFloat(info.initialBalance)
              );

              config.set('accounts', [
                ...config.get('accounts'),
                {
                  name: info.accountName,
                  number: account.accountNumber,
                  balance: parseFloat(info.initialBalance),
                  initialBalance: parseFloat(info.initialBalance),
                },
              ]);

              // Initialize where orders will be placed
              config.set(`orders.${account.accountNumber}`, []);

              console.log(account.details);
            }
          } else {
            console.log(
              `Failed to create an investment account. Please include the ${chalk.yellow(
                'account name'
              )} and ${chalk.yellow('initial balance')}.`
            );
          }
        });
    } else if (action == 'remove') {
      const accounts = config.get('accounts');

      if (accounts.length > 0) {
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'account',
              message: chalk.blue('Select an account to remove:'),
              choices: accounts.map((account: any) => account.name),
            },
          ])
          .then((info: any) => {
            if (info.account) {
              const index = accounts.findIndex(
                (account: any) => account.name === info.account
              );

              if (index > -1) {
                config.set(
                  'accounts',
                  accounts.filter((_: any, i: number) => i !== index)
                );
                // config.delete(`orders.${accountNumber}`)
                console.log(`Account ${info.account} removed.`);
              } else {
                console.log(`Account ${info.account} not found.`);
              }
            }
          });
      } else {
        console.log(`No accounts found.`);
      }
    }
  }

  static async marketOrder(
    accountNumber: number,
    orderType: TransactionType,
    ticker: string,
    quantity: number
  ) {

    // const spinner = ora('Placing market order...').start();

    const accounts = config.get('accounts');
    let account: {
      account: object;
      index: number;
    } = {
      account: {},
      index: -1,
    };
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].number === accountNumber) {
        account.account = accounts[i];
        account.index = i;
        console.log('Account found:', account);
      }
    }

    if (orderType === TransactionType.BUY) {
      const order = await InvestmentAccount.buyOrder(ticker, quantity);
      config.set('orders', {
        ...config.get('orders'),
        [accountNumber]: [...config.get(`orders.${accountNumber}`), order].filter(Boolean)
      });
    } else if (orderType === TransactionType.SELL) {
      const order = await InvestmentAccount.sellOrder(ticker, quantity);
      config.set('orders', {
        ...config.get('orders'),
        [accountNumber]: [...config.get(`orders.${accountNumber}`), order].filter(Boolean)
      });
    }
  }
}

export default CommandController;
