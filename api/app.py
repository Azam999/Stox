from flask import Flask
from flask import request
from stock_data import StockData

app = Flask(__name__)

sd = StockData()

@app.route('/')
def index():
  return '<h3>Connected to the API</h3>'


@app.route('/<ticker>/quote-table')
def quote_table(ticker):
  quote_table = sd.get_quote_table(ticker)
  return quote_table

@app.route('/indices')
def indices():
  indexes = sd.get_indices()
  return indexes