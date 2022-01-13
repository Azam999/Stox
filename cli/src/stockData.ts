import axios from 'axios';
import FinanceModules from './ts/enums/financeModules';

class StockData {
  yf_base_url: string = 'https://query2.finance.yahoo.com/v10/finance/quoteSummary/';

  async getIndices() {
    const response = await axios.get('http://localhost:8080/indices');
    return response.data;
  }

  async getStockQuote(tickers: string[]) {
    const tickers_array = tickers.join(',');
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${tickers_array}&range=1d&interval=5m&indicators=close&includeTimestamps=false&includePrePost=false&corsDomain=finance.yahoo.com&.tsrc=finance`;
  
    const response = await axios.get(url);
    return response.data.quoteResponse.result;
  }

  async assetProfile(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.ASSET_PROFILE}`;
    const response = await axios.get(url);
    return response.data;
  }

  async balanceSheetHistory(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.BALANCE_SHEET_HISTORY}`;
    const response = await axios.get(url);
    return response.data.quoteSummary.result[0].balanceSheetHistory.balanceSheetStatements;
  }

  async balanceSheetHistoryQuarterly(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.BALANCE_SHEET_HISTORY_QUARTERLY}`;
    const response = await axios.get(url);
    return response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements;
  }

  async calendarEvents(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.CALENDAR_EVENTS}`;
    const response = await axios.get(url);
    return response.data;
  }

  async cashflowStatementHistory(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.CASHFLOW_STATEMENT_HISTORY}`;
    const response = await axios.get(url);
    return response.data;
  }

  async cashflowStatementHistoryQuarterly(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.CASHFLOW_STATEMENT_HISTORY_QUARTERLY}`;
    const response = await axios.get(url);
    return response.data;
  }

  async defaultKeyStatistics(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.DEFAULT_KEY_STATISTICS}`;
    const response = await axios.get(url);
    return response.data;
  }

  async earnings(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.EARNINGS}`;
    const response = await axios.get(url);
    return response.data;
  }

  async earningsHistory(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.EARNINGS_HISTORY}`;
    const response = await axios.get(url);
    return response.data;
  }

  async earningsTrend(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.EARNINGS_TREND}`;
    const response = await axios.get(url);
    return response.data;
  }

  async esgScores(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.ESG_SCORES}`;
    const response = await axios.get(url);
    return response.data;
  }

  async financialData(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.FINANCIAL_DATA}`;
    const response = await axios.get(url);
    return response.data;
  }

  async fundOwnership(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.FUND_OWNERSHIP}`;
    const response = await axios.get(url);
    return response.data;
  }

  async fundPerformance(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.FUND_PERFORMANCE}`;
    const response = await axios.get(url);
    return response.data;
  }

  async fundProfile(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.FUND_PROFILE}`;
    const response = await axios.get(url);
    return response.data;
  }

  async incomeStatementHistory(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.INCOME_STATEMENT_HISTORY}`;
    const response = await axios.get(url);
    return response.data;
  }

  async incomeStatementHistoryQuarterly(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.INCOME_STATEMENT_HISTORY_QUARTERLY}`;
    const response = await axios.get(url);
    return response.data;
  }

  async indexTrend(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.INDEX_TREND}`;
    const response = await axios.get(url);
    return response.data;
  }

  async industryTrend(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.INDUSTRY_TREND}`;
    const response = await axios.get(url);
    return response.data;
  }

  async insiderHolders(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.INSIDER_HOLDERS}`;
    const response = await axios.get(url);
    return response.data;
  }

  async insiderTransactions(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.INSIDER_TRANSACTIONS}`;
    const response = await axios.get(url);
    return response.data;
  }

  async institutionOwnership(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.INSTITUTION_OWNERSHIP}`;
    const response = await axios.get(url);
    return response.data;
  }

  async majorDirectHolders(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.MAJOR_DIRECT_HOLDERS}`;
    const response = await axios.get(url);
    return response.data;
  }

  async majorHoldersBreakdown(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.MAJOR_HOLDERS_BREAKDOWN}`;
    const response = await axios.get(url);
    return response.data;
  }

  async netSharePurchaseActivity(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.NET_SHARE_PURCHASE_ACTIVITY}`;
    const response = await axios.get(url);
    return response.data;
  }

  async price(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.PRICE}`;
    const response = await axios.get(url);
    return response.data;
  }

  async quoteType(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.QUOTE_TYPE}`;
    const response = await axios.get(url);
    return response.data;
  }

  async recommendationTrend(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.RECOMMENDATION_TREND}`;
    const response = await axios.get(url);
    return response.data;
  }

  async secFilings(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.SEC_FILINGS}`;
    const response = await axios.get(url);
    return response.data;
  }

  async sectorTrend(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.SECTOR_TREND}`;
    const response = await axios.get(url);
    return response.data;
  }

  async summaryDetail(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.SUMMARY_DETAIL}`;
    const response = await axios.get(url);
    return response.data;
  }

  async summaryProfile(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.SUMMARY_PROFILE}`;
    const response = await axios.get(url);
    return response.data;
  }

  async symbol(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.SYMBOL}`;
    const response = await axios.get(url);
    return response.data;
  }

  async topHoldings(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.TOP_HOLDINGS}`;
    const response = await axios.get(url);
    return response.data;
  }

  async upgradeDowngradeHistory(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.UPGRADE_DOWNGRADE_HISTORY}`;
    const response = await axios.get(url);
    return response.data;
  }

  async pageViews(ticker: string) {
    const url = `${this.yf_base_url}${ticker}?modules=${FinanceModules.PAGE_VIEWS}`;
    const response = await axios.get(url);
    return response.data;
  }

  // ============= HELPER FUNCTIONS =============
  largeNumberFormat(amount: number) {
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