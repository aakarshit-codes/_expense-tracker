export const validateTransaction = (transaction) => {
  if (!transaction.date || !transaction.description || !transaction.category || isNaN(transaction.amount) || transaction.amount <= 0) {
    return "Please fill in all fields correctly.";
  }
  if (transaction.amount <= 0) {
    return "Amount must be greater than zero.";
  }
  return null;
}