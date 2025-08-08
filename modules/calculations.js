export const calculateTools = (transactions) => {
  let income = 0;
  let expenses = 0; 

  transactions.forEach(t => {
    if (t.type === 'income') {
      income += t.amount;
    } else if (t.type === 'expense') {
      expenses += t.amount;
    }
  });

  const net = income - expenses;
  return {
    income,
    expenses,
    net
  };
};