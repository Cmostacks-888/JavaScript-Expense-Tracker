const form = document.getElementById("expense-form");
const nameInput = document.getElementById("expense-name");
const amountInput = document.getElementById("expense-amount");
const totalDisplay = document.getElementById("total");
const expenseList = document.getElementById("expense-list");

let expenses = JSON.parse(localStorage.getItem("cmostacks-expenses")) || [];
let total = 0;

form.addEventListener("submit", function (event) {
  event.preventDefault( );

  const name = nameInput.value.trim( );
  const amount = Number(amountInput.value);

  if (name === "" || !Number.isFinite(amount) || amount <= 0) {
    return;
  }
  const expense = { name: name, amount: amount };
  expenses.push(expense);
  localStorage.setItem("cmostacks-expenses", JSON.stringify(expenses));
  const listItem = document.createElement("li");
  listItem.textContent = `${name} - $${amount.toFixed(2)}`;
  expenseList.appendChild(listItem);
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  listItem.appendChild(deleteButton);
  deleteButton.addEventListener("click", function () {
    expenseList.removeChild(listItem);

    expenses = expenses.filter(function (item) {
      return item.name !== name || item.amount !== amount;
    });

    localStorage.setItem("cmostacks-expenses", JSON.stringify(expenses));
    
    total -= amount;
    totalDisplay.textContent = total.toFixed(2);
  });

  total += amount;
  totalDisplay.textContent = total.toFixed(2);

  form.reset( );
});
  
                                    






























































































































































                      
