import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const someElements = (accumulator: number, currentValue: number): number =>
      accumulator + currentValue;

    const outcomeDataFilter = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );
    const incomeDataFilter = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const outcome = outcomeDataFilter
      .map(transaction => transaction.value)
      .reduce(someElements);

    const income = incomeDataFilter
      .map(transaction => transaction.value)
      .reduce(someElements);

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create(): Transaction {
    // TODO
  }
}

export default TransactionsRepository;
