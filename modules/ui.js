import { getCategories, saveCategories } from './storage.js';

// DOM Elements
const categorySelect = document.getElementById('category');

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

document.addEventListener('DOMContentLoaded', loadCategories);