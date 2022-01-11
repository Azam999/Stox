"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const axios_1 = __importDefault(require("axios"));
// Initialize commander
const program = new commander_1.Command();
program
    .version('0.0.1')
    .description('A CLI to get market data and practice trading/investing')
    .showHelpAfterError(chalk_1.default.red('(use --help for available options)'))
    .showSuggestionAfterError();
function getIndices() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get('http://localhost:8080/indices');
        return response.data;
    });
}
function getQuoteTable(ticker) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(`http://localhost:8080/${ticker}/quote-table`);
        return response.data;
    });
}
// Commands
program
    .command('indices')
    .description('Get Indices: S&P 500, Dow Jones Industrial Average, Nasdaq Composite')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    const indices = yield getIndices();
    console.log(indices);
}));
program
    .command('ticker')
    .argument('<ticker>', 'Ticker symbol')
    .action((ticker) => __awaiter(void 0, void 0, void 0, function* () {
    const quoteTable = yield getQuoteTable(ticker);
    console.log(quoteTable);
}));
program.parse(process.argv);
// const options = program.opts();
