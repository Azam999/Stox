import yahoo_fin.stock_info as si
import json

class StockData:
  def __init__(self):
    pass
  
  def get_historical_data(self, ticker, start_date, end_date):
    """Price over a time period"""
    stock_data = si.get_data(ticker, start_date=start_date, end_date=end_date)
    stock_data = stock_data.drop('ticker', axis=1)
    stock_data = stock_data.to_json()
  
    return stock_data

  def get_quote_table(self, ticker):
    stock_quote_table = si.get_quote_table(ticker)
    return stock_quote_table
  
  def get_indices(self):
    sp500 = si.get_live_price('^GSPC')
    dow = si.get_live_price('^DJI')
    nasdaq_composite = si.get_live_price('^IXIC')
    indices_dict = {
      'S&P 500': sp500,
      'Dow Jones Industrial Average': dow,
      'NASDAQ Composite': nasdaq_composite
    }
    
    return json.dumps(indices_dict)
  