import { getTransactions, saveTransactions } from "./storage.js";
// import { renderTransactions } from "./ui.js";
import { validateTransaction } from "./validation.js";
import { applyFilter } from "./filters.js";

const form = document.getElementById('transaction-form');
const errorMessage = document.getElementById('error-message');

export const addTransaction = (transaction) => {
  const transactions = getTransactions();
  transactions.push(transaction);
  saveTransactions(transactions);
  // renderTransactions(transactions);
  applyFilter(localStorage.getItem('activeFilter') || 'all');
}

export const deleteTransaction = (id) => {
  const transactions = getTransactions().filter(t => t.id !== id);
  saveTransactions(transactions);
  // renderTransactions(transactions);
  applyFilter(localStorage.getItem('activeFilter') || 'all');
}

// Form Submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const date = document.getElementById('date').value;
  const description = document.getElementById('description').value.trim();
  const category = document.getElementById('category').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;

  const newTransactions = {
    id: Date.now().toString(),
    date,
    description,
    category,
    amount,
    type
  }

  const validationError = validateTransaction(newTransactions);
  if (validationError) {
    errorMessage.textContent = validationError;
    errorMessage.classList.remove('hidden');
    return;
  }

  errorMessage.classList.add('hidden');
  addTransaction(newTransactions);
  form.reset();
});