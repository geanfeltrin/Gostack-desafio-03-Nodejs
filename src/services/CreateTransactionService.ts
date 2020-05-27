import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  type: 'income' | 'outcome';
  title: string;
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ type, value, title }: Request): Transaction {
    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      if (balance.total <= 0 || balance.total <= value) {
        throw Error(
          'You can not able to create "outcome", because your balance is negative or value is than your total',
        );
      }
    }
    const transaction = this.transactionsRepository.create({
      type,
      value,
      title,
    });

    return transaction;
  }
}

export default CreateTransactionService;
