import { Command } from 'commander';
import chalk from 'chalk';
import axios from 'axios';
import Table from 'cli-table3';
import IStock from './ts/interfaces/stock';
import ora from 'ora';
import StockData from './stockData';
import FinanceUtility from './FinanceUtility';

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
    const spinner = ora('Fetching indices...').start();
    const indices = await StockData.getIndices();
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
        FinanceUtility.greenOrRed(parseFloat(stock.regularMarketChange.toFixed(2)), '$', true),
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
          StockData
            .largeNumberFormat(stock.regularMarketVolume)
            .toLocaleString()
        ),
        chalk.white(
          stock.marketCap
            ? `$${StockData
                .largeNumberFormat(stock.marketCap)
                .toLocaleString()}`
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
  });

program
  .command('balancesheet')
  .argument('<period>')
  .argument('<ticker>')
  .action(async (period: string, ticker: string) => {
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
  });

program
  .command('incomestatement')
  .argument('<period>')
  .argument('<ticker>')
  .action(async (period: string, ticker: string) => {
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
  });

program.parse(process.argv);

// const options = program.opts();
