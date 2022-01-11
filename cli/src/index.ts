import { Command } from 'commander';
import chalk from 'chalk';
import axios from 'axios';
import Table from 'cli-table3';
import IStock from './ts/interfaces/stock';

// Initialize commander
const program = new Command();

program
  .version('0.0.1')
  .description('A CLI to get market data and practice trading/investing')
  .showHelpAfterError(chalk.red('(use --help for available options)'))
  .showSuggestionAfterError();

async function getIndices() {
  const response = await axios.get('http://localhost:8080/indices');
  return response.data;
}

async function getStockQuote(tickers: string[]) {
  const tickers_array = tickers.join(',');
  const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${tickers_array}&range=1d&interval=5m&indicators=close&includeTimestamps=false&includePrePost=false&corsDomain=finance.yahoo.com&.tsrc=finance`;

  const response = await axios.get(url);
  return response.data.quoteResponse.result;
}

// Commands
program
  .command('indices')
  .description(
    'Get Major Indices: S&P 500, Dow Jones Industrial Average, Nasdaq Composite'
  )
  .action(async () => {
    const indices = await getIndices();
    console.log(indices);
  });

function largeNumberFormat(amount: number) {
  const value =
    amount >= 1.0e12
      ? (amount / 1.0e12).toFixed(2) + 'T' // Trillion
      : amount >= 1.0e9
      ? (amount / 1.0e9).toFixed(2) + 'B' // Billion
      : amount >= 1.0e6
      ? (amount / 1.0e6).toFixed(2) + 'M' // Million
      : amount >= 1.0e3
      ? (amount / 1.0e3).toFixed(2) + 'K' // Thousand
      : amount.toFixed(2);
  return value;
}

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
  'Yield',
  'Post Mkt Chng %',
];
program
  .command('ticker')
  .argument('<ticker>', 'Ticker symbol')
  .action(async (tickers: string) => {
    let stockQuotes = await getStockQuote(tickers.split(','));

    stockQuotes = stockQuotes.filter(
      (stock: any) => stock.quoteType === 'EQUITY'
    );

    const table = new Table({
      head: stockLabels,
      colWidths: [10, 10],
    });

    table.push(
      ...stockQuotes.map((stock: IStock) => [
        stock.symbol,
        `$${stock.regularMarketPrice}`,
        `$${stock.regularMarketChange.toFixed(2)}`,
        `${stock.regularMarketChangePercent.toFixed(2)}%`,
        stock.bid ? `$${stock.bid}`: 'N/A',
        stock.ask ? `$${stock.ask}`: 'N/A',
        `$${stock.regularMarketOpen}`,
        `$${stock.regularMarketDayLow}`,
        `$${stock.regularMarketDayHigh}`,
        largeNumberFormat(stock.regularMarketVolume).toLocaleString(),
        `$${largeNumberFormat(stock.marketCap).toLocaleString()}`,
        `$${stock.fiftyTwoWeekHigh}`,
        `$${stock.fiftyTwoWeekLow}`,
        stock.forwardPE.toFixed(2),
        stock.trailingAnnualDividendYield
          ? (stock.trailingAnnualDividendYield * 100).toFixed(2)
          : 'N/A',
        stock.postMarketChangePercent.toFixed(2),
      ])
    );

    console.log(table.toString());
  });

program.parse(process.argv);

// const options = program.opts();
