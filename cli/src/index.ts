import { Command } from 'commander';
import chalk from 'chalk';
import CommandController from './controllers/command.controller';
import { TransactionType } from './ts/enums/investmentAccount';

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
  .action(async () => {
    CommandController.indices();
  });

program
  .command('tickers')
  .description(
    'Get the data for a ticker or list of tickers separated by commas'
  )
  .argument('<tickers>', 'Ticker symbol')
  .action((tickers: string) => {
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
  .action((statementName: string, period: string, ticker: string) => {
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
            `${statementName} is not a valid statement name. Please use one of the following: balancesheet, income, cashflow`
          )
        );
    }
  });

program
  .command('account')
  .argument('<action>')
  .action((action: string) => {
    CommandController.accountAction(action);
  });

program
  .command('order')
  .argument('<accountNumber')
  .argument('<orderType>')
  .argument('<ticker>')
  .argument('<quantity>')
  .action(
    (
      accountNumber: number,
      orderType: string,
      ticker: string,
      quantity: string
    ) => {
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
  .argument('<accountNumber>')
  .action((accountNumber: number) => {
    const stats = CommandController.accountStats(accountNumber);
    console.log(stats);
  });

program.parse(process.argv);

// const options = program.opts();
