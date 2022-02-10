import chalk from "chalk";
import config from "../config/config";

class ValidationController {
  static accountExists(accountNumber: number): boolean {
    let accountMatched = false;
    const accounts = config.get('accounts')

    accountMatched = accounts.some((account: any) => account.number == accountNumber);

    if (!accountMatched) {
      console.log(
        chalk.red(
          `Account number ${chalk.yellow(
            accountNumber
          )} could not be found. Please check the account number and try again.`
        )
      );
    }

    return accountMatched;
  }
}

export default ValidationController;