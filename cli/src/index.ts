import { Command } from 'commander';
import chalk from 'chalk';
import axios from 'axios';
import Table from 'cli-table3';
import IStock from './ts/interfaces/stock';
import ora from 'ora';
import StockData from './stockData';

// Initialize commander
const program = new Command();
const stockData = new StockData();

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
    const spinner = ora('Fetching indices...').start();
    const indices = await stockData.getIndices();
    spinner.stop();
    console.log(indices);
  });

program
  .command('tickers')
  .argument('<tickers>', 'Ticker symbol')
  .action(async (tickers: string) => {
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
    let stockQuotes = await stockData.getStockQuote(tickers.split(','));
    spinner.stop();

    stockQuotes = stockQuotes.filter(
      (stock: any) => stock.quoteType === 'EQUITY' || stock.quoteType === 'ETF'
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
        stock.bid ? `$${stock.bid}` : 'N/A',
        stock.ask ? `$${stock.ask}` : 'N/A',
        `$${stock.regularMarketOpen}`,
        `$${stock.regularMarketDayLow}`,
        `$${stock.regularMarketDayHigh}`,
        stockData.largeNumberFormat(stock.regularMarketVolume).toLocaleString(),
        stock.marketCap
          ? `$${stockData.largeNumberFormat(stock.marketCap).toLocaleString()}`
          : 'N/A',
        `$${stock.fiftyTwoWeekHigh}`,
        `$${stock.fiftyTwoWeekLow}`,
        stock.trailingPE ? stock.trailingPE.toFixed(2) : 'N/A',
        stock.priceToBook ? stock.priceToBook.toFixed(2) : 'N/A',
        stock.trailingAnnualDividendYield
          ? (stock.trailingAnnualDividendYield * 100).toFixed(2)
          : 'N/A',
        stock.preMarketChangePercent
          ? stock.preMarketChangePercent.toFixed(2)
          : 'N/A',
        stock.postMarketChangePercent
          ? stock.postMarketChangePercent.toFixed(2)
          : 'N/A',
      ])
    );

    console.log(table.toString());
  });

function printBalanceSheet(balanceSheets: any) {
  for (let i = 0; i < balanceSheets.length; i++) {
    const table = new Table({
      head: ['Name', 'Value']
    })

    console.log(`\n\nDate: ${balanceSheets[i].endDate.fmt}`);

    delete balanceSheets[i].maxAge;
    delete balanceSheets[i].endDate;

    for (let key in balanceSheets[i]) {
      const value = key.replace(/([A-Z]+)*([A-Z])/g, "$1 $2");
      const startCaseKey = value.charAt(0).toUpperCase() + value.slice(1);
      table.push({ [startCaseKey]: balanceSheets[i][key].longFmt })
    }

    console.log(table.toString())
  }
}

program
  .command('balancesheet')
  .argument('<period>')
  .argument('<ticker>')
  .action(async (period: string, ticker: string) => {
    if (period === 'quarterly') {
      const spinner = ora('Fetching balance sheet...').start();
      const balanceSheets = await stockData.balanceSheetHistoryQuarterly(ticker);
      spinner.stop();
      
      printBalanceSheet(balanceSheets);
    } else if (period === 'annual') {
      const spinner = ora('Fetching balance sheet...').start();
      const balanceSheets = await stockData.balanceSheetHistory(ticker);
      spinner.stop();

      printBalanceSheet(balanceSheets);
    }
  });

program.parse(process.argv);

// const options = program.opts();
