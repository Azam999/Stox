import ora from 'ora';
import StockData from '../stockData';
import FinanceUtility from '../FinanceUtility';
import Table from 'cli-table3';
import IStock from '../ts/interfaces/stock';
import chalk from 'chalk';

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
      ]));

    console.log(table.toString());
  }
}

export default CommandController;