import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    let outcome = 0;
    let income = 0;
    const someElements = (accumulator: number, currentValue: number): number =>
      accumulator + currentValue;

    const outcomeDataFilter = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );
    const incomeDataFilter = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    if (outcomeDataFilter.length >= 1) {
      outcome = outcomeDataFilter
        .map(transaction => transaction.value)
        .reduce(someElements);
    }

    if (incomeDataFilter.length >= 1) {
      income = incomeDataFilter
        .map(transaction => transaction.value)
        .reduce(someElements);
    }

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
