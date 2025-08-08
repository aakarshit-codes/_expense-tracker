import { getCategories, saveCategories, getTransactions } from './storage.js';
import { deleteTransaction } from './transactions.js';
import { calculateTools } from './calculations.js';

// DOM Elements
const categorySelect = document.getElementById('category');
const transactionList = document.getElementById('transaction-list');
const totalIncomeEl = document.getElementById('total-income');
const totalExpensesEl = document.getElementById('total-expenses');
const netBalanceEl = document.getElementById('net-balance');

// Initialize default categories if not present
const defaultCategories = ["Food", "Transport", "Entertainment", "Bills", "Other"];
if (getCategories().length === 0) {
  saveCategories(defaultCategories);
}

// Populate category dropdown
const loadCategories = () => {
  const categories = getCategories();
  categorySelect.innerHTML = categories
    .map(cat => `<option value="${cat}">${cat}</option>`)
    .join('');
};

export const renderTransactions = (transactions) => {
  if (!transactions) {
    transactionList.innerHTML = `<p class="text-gray-500">No transactions yet.</p>`;
    return;
  }

  transactionList.innerHTML = transactions.map(t => `
    <div class="flex justify-between items-center border-b pb-2">
      <div>
        <p class="font-semibold">${t.description} - <span class="text-sm text-gray-500">${t.category}</span></p>
        <p class="text-sm text-gray-400">${t.date}</p>
      </div>
      <div class="flex items-center gap-4">
        <p class="${t.type === 'income' ? 'text-green-600' : 'text-red-600'} font-bold">
          ${t.type === 'income' ? '+' : '-'}₹${t.amount}
        </p>
        <button class="text-red-500 hover:underline" data-id="${t.id}">Delete</button>
      </div>
    </div>
  `).join('');  

  // Attach delete handlers
  document.querySelectorAll('[data-id]').forEach(btn => {
    btn.addEventListener('click', () => deleteTransaction(btn.dataset.id));
  });

  const { income, expenses, net } = calculateTools(transactions);
  totalIncomeEl.textContent = `₹${income}`;
  totalExpensesEl.textContent = `₹${expenses}`;
  netBalanceEl.textContent = `₹${net}`;
};

document.addEventListener('DOMContentLoaded', () => {
  loadCategories();
  renderTransactions(getTransactions());
});