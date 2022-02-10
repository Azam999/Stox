#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import CommandController from './controllers/command.controller';
import StockData from './stockData';
import { TransactionType } from './ts/enums/investmentAccount';
import ValidationController from './controllers/validation.controller';

// Initialize commander
const program = new Command();

program
  .name('stox')
  .version('0.0.1')
  .description('A CLI to get market data and practice trading/investing')
  .showHelpAfterError(chalk.red('(use --help for available options)'))
  .showSuggestionAfterError();

// Commands
program
  .command('indices')
  .description(
    'Get Major Indices: S&P 500, Dow Jones Industrial Average, Nasdaq Composite'
  )
  .action(() => {
    CommandController.indices();
  });

program
  .command('tickers')
  .description(
    'Get the data for a ticker or list of tickers separated by commas'
  )
  .argument('<tickers>', 'Ticker symbol')
  .action(async (tickers: string) => {
    const stockData = await StockData.getStockQuote([tickers]);

    if (tickers.split(',').length != stockData.length) {
      console.log(
        chalk.red(
          `Some tickers could not be found. Please check the ticker symbols and try again.`
        )
      );
    }

    CommandController.stockQuotes(tickers);
  });

program
  .command('statement')
  .description(
    'Get the financial statements for a ticker (quarterly or annual)'
  )
  .argument('<statementName>')
  .argument('<period>')
  .argument('<ticker>')
  .action(async (statementName: string, period: string, ticker: string) => {
    const stockData = await StockData.getStockQuote([ticker]);
    if (stockData.length <= 0) {
      return console.log(
        chalk.red(
          `Ticker ${chalk.yellow(
            ticker
          )} could not be found. Please check the ticker symbol and try again.`
        )
      );
    }

    if (period != 'annual' && period != 'quarterly') {
      return console.log(
        chalk.red(
          `Invalid period. Please use either ${chalk.yellow(
            'annual'
          )} or ${chalk.yellow('quarterly')} as the second argument`
        )
      );
    }

    switch (statementName) {
      case 'balancesheet':
        CommandController.balanceSheets(period, ticker);
        break;
      case 'income':
        CommandController.incomeStatements(period, ticker);
        break;
      case 'cashflow':
        CommandController.cashflowStatements(period, ticker);
        break;
      default:
        console.log(
          chalk.red(
            `${statementName} is not a valid statement name. Please use one of the following: ${chalk.yellow(
              '\nbalancesheet \nincome \ncashflow'
            )}`
          )
        );
    }
  });

program
  .command('account')
  .description(
    'Perform actions on an investment account (create, delete, reset, list)'
  )
  .argument('<action>')
  .action((action: string) => {
    CommandController.accountAction(action);
  });

program
  .command('order')
  .description('Place an order on an investment account (buy, sell)')
  .argument('<accountNumber')
  .argument('<orderType>')
  .argument('<ticker>')
  .argument('<quantity>')
  .action(
    async (
      accountNumber: number,
      orderType: string,
      ticker: string,
      quantity: string
    ) => {
      const accountExists = ValidationController.accountExists(accountNumber);

      if (!accountExists) {
        return;
      }

      const stockData = await StockData.getStockQuote([ticker]);
      if (stockData.length <= 0) {
        return console.log(
          chalk.red(
            `Ticker ${chalk.yellow(
              ticker
            )} could not be found. Please check the ticker symbol and try again.`
          )
        );
      }

      if (orderType.toUpperCase() == TransactionType.BUY) {
        CommandController.marketOrder(
          accountNumber,
          TransactionType.BUY,
          ticker,
          quantity
        );
      } else if (orderType.toUpperCase() == TransactionType.SELL) {
        CommandController.marketOrder(
          accountNumber,
          TransactionType.SELL,
          ticker,
          quantity
        );
      } else {
        console.log(
          chalk.red(
            `${orderType} is not a valid order type. Please use one of the following: buy, sell`
          )
        );
      }
    }
  );

program
  .command('stats')
  .description('Get account statistics')
  .argument('<accountNumber>')
  .argument('<action>')
  .action((accountNumber: number, action: string) => {
    const accountExists = ValidationController.accountExists(accountNumber);

    if (!accountExists) {
      return;
    }

    if (action.toUpperCase() == 'RETURNS') {
      CommandController.tickersReturn(accountNumber);
    } else {
      console.log(
        chalk.red(
          `${action} is not a valid action. Please use one of the following: ${chalk.yellow(
            '\nreturns'
          )}`
        )
      );
    }
  });

program
  .command('transactions')
  .description('Get account transactions')
  .argument('<accountNumber>')
  .argument('<action>')
  .action((accountNumber: number, action: string) => {
    const accountExists = ValidationController.accountExists(accountNumber);

    if (!accountExists) {
      return;
    }

    if (action != TransactionType.BUY && action != TransactionType.SELL) {
      return console.log(
        chalk.red(
          `${action} is not a valid action. Please use one of the following: ${chalk.yellow(
            '\nbuy \nsell'
          )}`
        )
      );
    }

    CommandController.transactions(accountNumber, action);
  });

program
  .command('holdings')
  .description('Get account holdings')
  .argument('<accountNumber>')
  .action((accountNumber: number) => {
    const accountExists = ValidationController.accountExists(accountNumber);

    if (!accountExists) {
      return;
    }

    CommandController.holdings(accountNumber);
  });

program.parse(process.argv);

// const options = program.opts();
