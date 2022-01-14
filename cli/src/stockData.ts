import axios from 'axios';
import FinanceModules from './ts/enums/financeModules';

class StockData {
  // Access Yahoo Finance API
  // All methods are static because they do not rely on any instance variables
  static yf_base_url: string = 'https://query2.finance.yahoo.com/v10/finance/quoteSummary/';
  static yf_quote_url: string = 'https://query1.finance.yahoo.com/v7/finance/quote?symbols=';
  static yf_quote_ending_url: string = '&range=1d&interval=5m&indicators=close&includeTimestamps=false&includePrePost=false&corsDomain=finance.yahoo.com&.tsrc=finance';

  static async getIndices() {
    // ^GSPC = S&P 500
    // ^DJI = Dow Jones Industrial Average
    // ^IXIC = NASDAQ Composite
    const indices = ['^GSPC', '^DJI', '^IXIC']
    const responses = [];

    for (let index of indices) {
      const url = `${this.yf_quote_url}${index}${this.yf_quote_ending_url}`;
      const response = await axios.get(url);
      responses.push(response.data.quoteResponse.result[0]);
    }

    return responses
  }

  static async getStockQuote(tickers: string[]) {
    const tickers_array = tickers.join(',');
    const url = `${this.yf_quote_url}${tickers_array}${this.yf_quote_ending_url}`;
  
    const response = await axios.get(url);
    return response.data.quoteResponse.result;
  }

  static async assetProfile(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.ASSET_PROFILE}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async balanceSheetHistory(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.BALANCE_SHEET_HISTORY}`;
    const response = await axios.get(url);
    return response.data.quoteSummary.result[0].balanceSheetHistory.balanceSheetStatements;
  }

  static async balanceSheetHistoryQuarterly(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.BALANCE_SHEET_HISTORY_QUARTERLY}`;
    const response = await axios.get(url);
    return response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements;
  }

  static async calendarEvents(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.CALENDAR_EVENTS}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async cashflowStatementHistory(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.CASHFLOW_STATEMENT_HISTORY}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async cashflowStatementHistoryQuarterly(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.CASHFLOW_STATEMENT_HISTORY_QUARTERLY}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async defaultKeyStatistics(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.DEFAULT_KEY_STATISTICS}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async earnings(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.EARNINGS}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async earningsHistory(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.EARNINGS_HISTORY}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async earningsTrend(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.EARNINGS_TREND}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async esgScores(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.ESG_SCORES}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async financialData(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.FINANCIAL_DATA}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async fundOwnership(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.FUND_OWNERSHIP}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async fundPerformance(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.FUND_PERFORMANCE}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async fundProfile(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.FUND_PROFILE}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async incomeStatementHistory(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.INCOME_STATEMENT_HISTORY}`;
    const response = await axios.get(url);
    return response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory;
  }

  static async incomeStatementHistoryQuarterly(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.INCOME_STATEMENT_HISTORY_QUARTERLY}`;
    const response = await axios.get(url);
    return response.data.quoteSummary.result[0].incomeStatementHistoryQuarterly.incomeStatementHistory;
  }

  static async indexTrend(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.INDEX_TREND}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async industryTrend(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.INDUSTRY_TREND}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async insiderHolders(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.INSIDER_HOLDERS}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async insiderTransactions(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.INSIDER_TRANSACTIONS}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async institutionOwnership(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.INSTITUTION_OWNERSHIP}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async majorDirectHolders(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.MAJOR_DIRECT_HOLDERS}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async majorHoldersBreakdown(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.MAJOR_HOLDERS_BREAKDOWN}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async netSharePurchaseActivity(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.NET_SHARE_PURCHASE_ACTIVITY}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async price(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.PRICE}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async quoteType(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.QUOTE_TYPE}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async recommendationTrend(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.RECOMMENDATION_TREND}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async secFilings(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.SEC_FILINGS}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async sectorTrend(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.SECTOR_TREND}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async summaryDetail(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.SUMMARY_DETAIL}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async summaryProfile(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.SUMMARY_PROFILE}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async symbol(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.SYMBOL}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async topHoldings(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.TOP_HOLDINGS}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async upgradeDowngradeHistory(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.UPGRADE_DOWNGRADE_HISTORY}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async pageViews(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.PAGE_VIEWS}`;
    const response = await axios.get(url);
    return response.data;
  }

  // ============= HELPER FUNCTIONS =============
  static largeNumberFormat(amount: number) {
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
}

export default StockData;