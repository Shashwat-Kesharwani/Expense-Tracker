// DOM Elements
const addTransactionBtn = document.querySelector("#addTransaction");
const balanceDisplay = document.querySelector("#balance");
const message = document.querySelector(".message");

// Account Elements
const accInput = document.querySelector("#accountinput");
const addAcc = document.querySelector("#addAcct");
const accountList = document.querySelector("#accountList");
const transectionAccount = document.querySelector("#transectionAccount");

// Category Elements
const categoryInput = document.querySelector("#cateInput");
const addCategory = document.querySelector("#addCategory");
const categoryList = document.querySelector("#categoryList");
const transectionCategory = document.querySelector("#transectionCategory");

// Transaction Inputs
const amountInput = document.querySelector("#amountInput");
const descInput = document.querySelector("#descInput");

// Income - Expense Buttons
let transactionType = "income";
const incomeBtn = document.querySelector("#incomeBtn");
const expenseBtn = document.querySelector("#expenseBtn");

// Data Stores
let categories = [];
let acclist = [];
let balance = 0;

// Utility Functions
function updateBalance() {
    balanceDisplay.textContent = `Balance: ₹${balance.toFixed(2)}`;
}

function clearMessageAfterDelay() {
    message.style.opacity = 1;
    setTimeout(() => {
        message.style.opacity = 0;
    }, 3000);
}

// Add Account
addAcc.addEventListener("click", () => {
    let newacc = accInput.value.trim();
    if (newacc && !acclist.includes(newacc)) {
        acclist.push(newacc);
        accInput.value = "";
        message.innerText = `Account '${newacc}' added.`;
        clearMessageAfterDelay();

        let newli = document.createElement("li");
        newli.innerText = newacc;
        accountList.appendChild(newli);

        let option = document.createElement("option");
        option.value = newacc;
        option.textContent = newacc;
        transectionAccount.appendChild(option);
    } else {
        message.innerText = "Account already exists or invalid input.";
        clearMessageAfterDelay();
    }
});

// Add Category
addCategory.addEventListener("click", () => {
    let newCategory = categoryInput.value.trim();
    if (newCategory && !categories.includes(newCategory)) {
        categories.push(newCategory);
        categoryInput.value = "";
        message.innerText = `Category '${newCategory}' added.`;
        clearMessageAfterDelay();

        let newli = document.createElement("li");
        newli.innerText = newCategory;
        categoryList.appendChild(newli);

        let option = document.createElement("option");
        option.value = newCategory;
        option.textContent = newCategory;
        transectionCategory.appendChild(option);
    } else {
        message.innerText = "Category already exists or invalid input.";
        clearMessageAfterDelay();
    }
});

incomeBtn.addEventListener("click", () => {
    transactionType = "income";
    incomeBtn.classList.add("active");
    expenseBtn.classList.remove("active");
});

expenseBtn.addEventListener("click", () => {
    transactionType = "expense";
    expenseBtn.classList.add("active");
    incomeBtn.classList.remove("active");
});


// Add Transaction (Single Setup)
addTransactionBtn.addEventListener("click", () => {
    let category = transectionCategory.value;
    let account = transectionAccount.value;
    let amount = parseFloat(amountInput.value);
    let description = descInput.value.trim() || "No description";

    if (!category || !categories.includes(category)) {
        message.innerText = "Please select a valid category.";
        clearMessageAfterDelay();
        return;
    }

    if (!account || !acclist.includes(account)) {
        message.innerText = "Please select a valid account.";
        clearMessageAfterDelay();
        return;
    }

    if (isNaN(amount)) {
        message.innerText = "Invalid amount.";
        clearMessageAfterDelay();
        return;
    }
    let tableRow = document.createElement("tr");


    // Create transaction row
    // let tableRow = document.createElement("tr");

    let tabled1 = document.createElement("td");
    tabled1.innerText = account;

    let tabled2 = document.createElement("td");
    tabled2.innerText = category;

    let tabled3 = document.createElement("td");

    let tabled4 = document.createElement("td");
    tabled4.innerText = description;

    let tabled5 = document.createElement("td");
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("addbtn");
    deleteBtn.style.backgroundColor = "red";

    // Add or subtract based on income/expense
    if (transactionType === "income") {
        balance += amount;
        tabled3.innerText = `+${amount.toFixed(2)}`;
        tableRow.style.color = "green";

    } else if (transactionType === "expense") {
        balance -= amount;
        tabled3.innerText = `-${amount.toFixed(2)}`;
        tableRow.style.color = "red";
    }

    updateBalance();


    // Delete logic
    deleteBtn.addEventListener("click", () => {
        if (incomeBtn.checked) {
            balance -= amount;
        } else {
            balance += amount;
        }
        updateBalance();
        tableRow.remove();
    });

    tabled5.appendChild(deleteBtn);
    tableRow.append(tabled1, tabled2, tabled3, tabled4, tabled5);

    document.getElementById("table-body").appendChild(tableRow);

    // Reset fields
    amountInput.value = "";
    descInput.value = "";
    transectionCategory.value = "";
    transectionAccount.value = "";
});
