import { Command } from 'commander';
import chalk from 'chalk';
import axios from 'axios';

// Initialize commander
const program = new Command();

program
  .version('0.0.1')
  .description(
    'A CLI to get market data and practice trading/investing'
  )
  .showHelpAfterError(chalk.red('(use --help for available options)'))
  .showSuggestionAfterError();

async function getIndices() {
  const response = await axios.get('http://localhost:8080/indices');
  return response.data;
}

async function getQuoteTable(ticker: string) {
  const response = await axios.get(
    `http://localhost:8080/${ticker}/quote-table`
  );
  return response.data;
}

// Commands
program
  .command('indices')
  .description(
    'Get Indices: S&P 500, Dow Jones Industrial Average, Nasdaq Composite'
  )
  .action(async () => {
    const indices = await getIndices()
    console.log(indices)
  });

program
  .command('ticker')
  .argument('<ticker>', 'Ticker symbol')
  .action(async (ticker: string) => {
    const quoteTable = await getQuoteTable(ticker)
    console.log(quoteTable)
  });

program.parse(process.argv);


// const options = program.opts();
