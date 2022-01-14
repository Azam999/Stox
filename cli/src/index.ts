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
  .description('Get the data for a ticker or list of tickers separated by commas')
  .argument('<tickers>', 'Ticker symbol')
  .action((tickers: string) => {
    CommandController.stockQuotes(tickers);
  });

program
  .command('balancesheet')
  .description('Get the balance sheets for a ticker (quarterly or annual)')
  .argument('<period>')
  .argument('<ticker>')
  .action((period: string, ticker: string) => {
    CommandController.balanceSheets(period, ticker);
  });

program
  .command('incomestatement')
  .description('Get the income statements for a ticker (quarterly or annual)')
  .argument('<period>')
  .argument('<ticker>')
  .action((period: string, ticker: string) => {
    CommandController.incomeStatements(period, ticker);
  });

program
  .command('cashflowstatement')
  .description('Get the cash flow statements for a ticker (quarterly or annual)')
  .argument('<period>')
  .argument('<ticker>')
  .action((period: string, ticker: string) => {
    CommandController.cashflowStatements(period, ticker);
  });

program.parse(process.argv);

// const options = program.opts();
