const form = document.getElementById("expense-form");
const nameInput = document.getElementById("expense-name");
const amountInput = document.getElementById("expense-amount");
const dateInput = document.getElementById("expense-date");
const totalDisplay = document.getElementById("total");
const expenseList = document.getElementById("expense-list");
const calendarGrid = document.getElementById("calendar-grid");
const calendarMonth = document.getElementById("calendar-month");
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");
const selectedDateDisplay = document.getElementById("selected-date");
const calendarExpenseList = document.getElementById("calendar-expense-list");

let expenses = JSON.parse(localStorage.getItem("cmostacks-expenses")) || [];
let total = 0;

form.addEventListener("submit", function (event) {
  event.preventDefault( );

  const name = nameInput.value.trim( );
  const amount = Number(amountInput.value);
  const date = dateInput.value;

  if (
    name === "" ||
    !Number.isFinite(amount) ||
    amount <= 0 ||
    date === ""
  ) {
    return;
  }
  const expense = {
    name: name,
    amount: amount,
    date: date
  };
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

function loadExpenses() {
  expenses = JSON.parse(
   localStorage.getItem("cmostacks-expenses") || "[]"
  );

  expenses.forEach(function (expense) {
    const listItem = document.createElement("li");
    listItem.textContent =
      `${expense.name} - $${expense.amount.toFixed(2)}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    listItem.appendChild(deleteButton);
    expenseList.appendChild(listItem);

    total += expense.amount;

    deleteButton.addEventListener("click", function () {
      expenseList.removeChild(listItem);

      expenses = expenses.filter(function (item) {
        return item !== expense;
      });

      localStorage.setItem(
        "cmostacks-expenses",
        JSON.stringify(expenses)
      );

      total -= expense.amount;
      totalDisplay.textContent = total.toFixed(2);
    });
  });

  totalDisplay.textContent = total.toFixed(2);
}

loadExpenses();

let displayedMonth = new Date();
let selectedDate = new Date();

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
  
function renderCalendar() {
  const year = displayedMonth.getFullYear();
  const month = displayedMonth.getMonth();

  calendarMonth.textContent = displayedMonth.toLocaleDateString(
    "en-US",
    {month: "long", year: "numeric" }
  );

  calendarGrid.innerHTML = "";

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  weekdays.forEach(function (day) {
    const heading = document.createElement("div");
    heading.textContent = day;
    heading.classList.add("calendar-weekday");
    calendarGrid.appendChild(heading);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement("div");
    blank.classList.add("calendar-empty");
    calendarGrid.appendChild(blank);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateString = formatDate(date);

    const dayButton = document.createElement("button");
    dayButton.type = "button";
    dayButton.textContent = day;
    dayButton.classList.add("calendar-day");

    if (dateString === formatDate(selectedDate)) {
      dayButton.classList.add("selected");
    }

    const hasExpenses = expenses.some(function (expense) {
      return expense.date === dateString;
    });

    if (hasExpenses) {
      dayButton.classList.add("has-expenses");
    }

    dayButton.addEventListener("click", function () {
      selectedDate = date;
      renderCalendar();
      renderSelectedDate();
    });

    calendarGrid.appendChild(dayButton);
  }

  renderSelectedDate();
}

function renderSelectedDate() {
  const dateString = formatDate(selectedDate);

  selectedDateDisplay.textContent = 
    selectedDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });

  calendarExpenseList.innerHTML = "";

  let dailyTotal = 0;

  const matchingExpenses = expenses.filter(function (expense) {
    return expense.date === dateString;
  });

  matchingExpenses.forEach(function (expense) {
    const item = document.createElement("li"); 

    item.textContent =
      `${expense.name} - $${expense.amount.toFixed(2)}`;

    calendarExpenseList.appendChild(item);
    dailyTotal += expense.amount;
  });

  document.getElementById("daily-total").textContent =
    dailyTotal.toFixed(2);
}

prevMonthButton.addEventListener("click", function () {
  displayedMonth.setMonth(displayedMonth.getMonth() - 1);
  renderCalendar();
});

nextMonthButton.addEventListener("click", function () {
  displayedMonth.setMonth(displayedMonth.getMonth() + 1);
  renderCalendar();
});

renderCalendar();

























































































































































                      
