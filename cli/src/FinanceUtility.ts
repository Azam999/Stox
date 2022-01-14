import chalk from 'chalk';
import Table from 'cli-table3';

class FinanceUtility {
  static printFinancialStatements(balanceSheets: any) {
    for (let i = 0; i < balanceSheets.length; i++) {
      const table = new Table({
        head: ['Name', 'Value'],
      });
  
      console.log(`\n\nDate: ${balanceSheets[i].endDate.fmt}`);
  
      delete balanceSheets[i].maxAge;
      delete balanceSheets[i].endDate;
  
      for (let key in balanceSheets[i]) {
        const value = key.replace(/([A-Z]+)*([A-Z])/g, '$1 $2');
        const startCaseKey = value.charAt(0).toUpperCase() + value.slice(1);
        table.push({ [startCaseKey]: balanceSheets[i][key].longFmt });
      }
  
      console.log(table.toString());
    }
  }

  static removeEmptyIncomeStatementValues(incomeStatements: any) {
    for (let statement of incomeStatements) {
      let keys = Object.keys(statement);
      let entries: any = Object.entries(statement);
  
      for (let i = 0; i < entries.length; i++) {
        if (Object.keys(entries[i][1]).length == 0) {
          delete statement[keys[i]];
        }
      }
    }
  }

  static greenOrRed(value: number, symbol: string, atStart: boolean) {
    if (atStart) {
      return value > 0 ? chalk.green(symbol + value) : chalk.red(symbol + value);
    } else {
      return value > 0 ? chalk.green(value + symbol) : chalk.red(value + symbol);
    }
  }
}

export default FinanceUtility;