const form = document.getElementById("expense-form");
const nameInput = document.getElementById("expense-name");
const amountInput = document.getElementById("expense-amount");
const totalDisplay = document.getElementById("total");
const expenseList = document.getElementById("expense-list");

let total = 0;

form.addEventListener("submit", function (event) {
  event.preventDefault( );

  const name = nameInput.value.trim( );
  const amount = Number(amountInput.value);

  if (name === "" || !Number.isFinite(amount) || amount <= 0) {
    return;
  }

  const listItem = document.createdElement("li");
  listItem.textContent = `${name} - $${amount.toFixed(2)}`;
  expenseList.appendChild(listItem);

  total += amount;
  totalDisplay.textContent = total.toFixed(2);

  form.reset( );
});
  
                                    






























































































































































                      
