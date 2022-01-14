import { Command } from 'commander';
import chalk from 'chalk';
import CommandController from './controllers/command.controller';

// Initialize commander
const program = new Command();

program
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
  .command('create account')
  .action(() => {
    CommandController.createAccount();
  });

program.parse(process.argv);

// const options = program.opts();
