import { getCategories, getTransactions } from "./storage.js";
import { renderTransactions } from "./ui.js";

const filterSelect = document.getElementById('filter-category');

export const applyFilter = (category) => {
  let transactions = getTransactions();
  if (category !== 'all') {
    transactions = transactions.filter(t => t.category === category);
  }

  renderTransactions(transactions);
  localStorage.setItem('activeFilter', category);
}

export const loadFilterOptions = () => {
  const categories = getCategories();
  const filterOptions = ['All Categories', ...categories];

  filterSelect.innerHTML = `
    <option value="all">All Categories</option>
    ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
  `;

  const savedFilter = localStorage.getItem('activeFilter') || 'all';
  filterSelect.value = savedFilter;
  applyFilter(savedFilter);
};

filterSelect.addEventListener('change', (e) => {
  applyFilter(e.target.value);
});

document.addEventListener('DOMContentLoaded', loadFilterOptions);