import axios, {Axios} from 'axios';

const BACKEND_URL = 'https://myapplication-bab3c.firebaseio.com';

export async function storeExpense(expenseData) {
  const response = await axios.post(BACKEND_URL + '/expense.json', expenseData);
  const id = response.data.name;
  return id;
}

export async function fetchExpense() {
  const response = await axios.get(BACKEND_URL + '/expense.json');
  const expense = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expense.push(expenseObj);
  }
  return expense;
}

export async function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expense/${id}.json`, expenseData);
}

export async function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expense/${id}.json`);
}
