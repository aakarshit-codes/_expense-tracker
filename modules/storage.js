export const getTransactions = () => {
  return JSON.parse(localStorage.getItem('transactions')) || [];
};

export const saveTransactions = (transactions) => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

export const getCategories = () => {
  return JSON.parse(localStorage.getItem('categories')) || [];
};

export const saveCategories = (categories) => {
  localStorage.setItem('categories', JSON.stringify(categories));
};