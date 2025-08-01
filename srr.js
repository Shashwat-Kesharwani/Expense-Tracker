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
const cateop = document.querySelector("#cateop")  // start from here


//data
const transactions = [
    { account: "Cash", category: "income", type: "Salary", transaction: 15000, description: "August salary" },
    { account: "Bank", category: "expense", type: "Groceries", transaction: 2200, description: "Grocery shopping" },
    { account: "GPay", category: "expense", type: "Phone Recharge", transaction: 399, description: "Mobile recharge" },
    { account: "Savings Account", category: "income", type: "Freelance Projects", transaction: 5000, description: "Freelance payment" },
    { account: "Crypto Wall", category: "income", type: "Refunds", transaction: 300, description: "Product return refund" },
    { account: "Bank", category: "expense", type: "Transportation", transaction: 250, description: "Cab fare" },
    { account: "Cash", category: "expense", type: "Fast Food", transaction: 450, description: "Dinner out" },
    { account: "Bank", category: "expense", type: "Education", transaction: 1200, description: "Course purchase" },
    { account: "Cash", category: "expense", type: "Rent", transaction: 8500, description: "Monthly rent" },
    { account: "Savings Account", category: "income", type: "Salary", transaction: 14000, description: "Monthly salary" },

    { account: "Cash", category: "expense", type: "Groceries", transaction: 1800, description: "Weekly groceries" },
    { account: "Bank", category: "expense", type: "Phone Recharge", transaction: 250, description: "Data pack" },
    { account: "GPay", category: "expense", type: "Fast Food", transaction: 300, description: "Snacks" },
    { account: "Cash", category: "expense", type: "Transportation", transaction: 100, description: "Bus fare" },
    { account: "Bank", category: "income", type: "Freelance Projects", transaction: 7000, description: "Client work" },
    { account: "Savings Account", category: "expense", type: "Education", transaction: 1600, description: "Book purchase" },
    { account: "Crypto Wall", category: "income", type: "Refunds", transaction: 650, description: "Flight refund" },
    { account: "Bank", category: "income", type: "Salary", transaction: 15500, description: "Company salary" },
    { account: "Cash", category: "expense", type: "Groceries", transaction: 950, description: "Daily needs" },
    { account: "Bank", category: "expense", type: "Rent", transaction: 9000, description: "House rent" },

    { account: "Cash", category: "expense", type: "Fast Food", transaction: 500, description: "Lunch outside" },
    { account: "Bank", category: "expense", type: "Phone Recharge", transaction: 450, description: "Monthly plan" },
    { account: "GPay", category: "expense", type: "Transportation", transaction: 200, description: "Uber ride" },
    { account: "Savings Account", category: "income", type: "Salary", transaction: 16000, description: "August pay" },
    { account: "Crypto Wall", category: "income", type: "Freelance Projects", transaction: 4500, description: "Design work" },
    { account: "Bank", category: "expense", type: "Groceries", transaction: 1300, description: "Market shopping" },
    { account: "Cash", category: "expense", type: "Education", transaction: 1900, description: "Exam fee" },
    { account: "Bank", category: "income", type: "Refunds", transaction: 200, description: "Service refund" },
    { account: "Savings Account", category: "expense", type: "Rent", transaction: 8800, description: "Apartment rent" },
    { account: "GPay", category: "income", type: "Salary", transaction: 12000, description: "Side job income" },

    { account: "Cash", category: "expense", type: "Fast Food", transaction: 400, description: "Pizza night" },
    { account: "Bank", category: "expense", type: "Groceries", transaction: 2100, description: "Vegetables & fruits" },
    { account: "Savings Account", category: "income", type: "Freelance Projects", transaction: 6000, description: "Coding project" },
    { account: "Crypto Wall", category: "expense", type: "Phone Recharge", transaction: 299, description: "Jio recharge" },
    { account: "Cash", category: "expense", type: "Transportation", transaction: 150, description: "Metro ticket" },
    { account: "Bank", category: "income", type: "Salary", transaction: 17000, description: "Job salary" },
    { account: "Cash", category: "expense", type: "Education", transaction: 2200, description: "Online course" },
    { account: "Savings Account", category: "income", type: "Refunds", transaction: 1000, description: "Bank reversal" },
    { account: "Bank", category: "expense", type: "Rent", transaction: 8900, description: "PG rent" },
    { account: "GPay", category: "expense", type: "Groceries", transaction: 1500, description: "Monthly grocery" },

    { account: "Cash", category: "expense", type: "Fast Food", transaction: 350, description: "Burger & fries" },
    { account: "Bank", category: "income", type: "Freelance Projects", transaction: 7500, description: "Graphic design" },
    { account: "Crypto Wall", category: "expense", type: "Education", transaction: 1700, description: "College fee" },
    { account: "Bank", category: "expense", type: "Phone Recharge", transaction: 399, description: "Airtel" },
    { account: "Savings Account", category: "expense", type: "Transportation", transaction: 80, description: "Rickshaw" },
    { account: "Bank", category: "income", type: "Salary", transaction: 16500, description: "Full-time pay" },
    { account: "Cash", category: "expense", type: "Rent", transaction: 9100, description: "Monthly rent" },
    { account: "Crypto Wall", category: "income", type: "Refunds", transaction: 450, description: "Return item refund" },
    { account: "GPay", category: "expense", type: "Fast Food", transaction: 275, description: "Evening snacks" },
    { account: "Cash", category: "expense", type: "Groceries", transaction: 2300, description: "Kirana shopping" }
];
localStorage.setItem("transaction_data", JSON.stringify(transactions));


let transactionJson = JSON.parse(localStorage.getItem("transaction_data"));
console.log(transactionJson);
function createTransactionRow(
    account,
    category,
    type,
    transaction,
    description
) {


    let tabled1 = document.createElement("td");
    tabled1.innerText = account;

    let tabled2 = document.createElement("td");
    tabled2.innerText = category;

    let tabledtype = document.createElement("td");
    tabledtype.innerText = type;

    let tabled3 = document.createElement("td");
    tabled3.innerText = transaction

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
        tabled3.style.color = "green";

    } else if (transactionType === "expense") {
        balance -= amount;
        tabled3.innerText = `-${amount.toFixed(2)}`;
        tabled3.style.color = "red";
    }

    updateBalance();


    // Delete logic
    deleteBtn.addEventListener("click", () => {
        const isIncome = tabled3.style.color === "green";
        if (isIncome) {
            balance -= amount;
        } else {
            balance += amount;
        }
        updateBalance();
        tableRow.remove();
    });

    //editbtn
    let tabled6 = document.createElement("td");
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("dltbtn");
    editBtn.style.backgroundColor = "orange";
    tabled6.appendChild(editBtn);
    editBtn.addEventListener("click", () => {
        // Fill the form with current transaction data
        console.log("working on it");
    })



    tabled5.appendChild(deleteBtn);
    tableRow.append(tabled1, tabled2, tabledtype, tabled3, tabled4, tabled5, tabled6);

    document.getElementById("table-body").appendChild(tableRow);


};





// Data Stores
let acclist = ["Cash", "Bank", `Savings Account`, `GPay`, "Crypto Wall"];
let balance = 0;

acclist.forEach(i => {
    let newli = document.createElement("li");
    newli.innerText = i;
    accountList.appendChild(newli);

    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    transectionAccount.appendChild(option);
})

let categories = ['Salary', 'Freelance Projects', 'Refunds', 'Rent', 'Fast Food', 'Phone Recharge', 'Transportation', ' Groceries', ' Education'];

categories.forEach(i => {

    let newli = document.createElement("li");
    newli.innerText = i;
    categoryList.appendChild(newli)
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    transectionCategory.appendChild(option);
});



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

    let newCategory = cateop.value.trim();
    console.log(newCategory);

    if (newCategory == "income") {
        transactionType = "income";
        incomeBtn.classList.add("active");
        expenseBtn.classList.remove("active");

    }
    else if (newCategory == "expense") {
        transactionType = "expense";
        expenseBtn.classList.add("active");
        incomeBtn.classList.remove("active");
    }
    let inputcat = categoryInput.value.trim();
    console.log(inputcat)
    if (inputcat && !categories.includes(inputcat)) {
        categories.push(inputcat);
        categoryInput.value = "";
        message.innerText = `Category '${inputcat}' added.`;
        clearMessageAfterDelay();

        let newli = document.createElement("li");
        newli.innerText = inputcat;
        categoryList.appendChild(newli)
        let option = document.createElement("option");
        option.value = inputcat;
        option.textContent = inputcat;
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
    let category = cateop.value;
    let account = transectionAccount.value;
    let amount = parseFloat(amountInput.value);
    let description = descInput.value.trim() || "No description";
    let inputcat = transectionCategory.value;
    if (!inputcat || !categories.includes(inputcat)) {
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

    function createtran() {
        let tableRow = document.createElement("tr");


        // Create transaction row
        // let tableRow = document.createElement("tr");

        let tabled1 = document.createElement("td");
        tabled1.innerText = account;

        let tabled2 = document.createElement("td");
        tabled2.innerText = category;

        let tabledtype = document.createElement("td");
        tabledtype.innerText = inputcat;

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
            tabled3.style.color = "green";

        } else if (transactionType === "expense") {
            balance -= amount;
            tabled3.innerText = `-${amount.toFixed(2)}`;
            tabled3.style.color = "red";
        }

        updateBalance();


        // Delete logic
        deleteBtn.addEventListener("click", () => {
            const isIncome = tabled3.style.color === "green";
            if (isIncome) {
                balance -= amount;
            } else {
                balance += amount;
            }
            updateBalance();
            tableRow.remove();
        });

        //editbtn
        let tabled6 = document.createElement("td");
        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("dltbtn");
        editBtn.style.backgroundColor = "orange";
        tabled6.appendChild(editBtn);
        editBtn.addEventListener("click", () => {
            // Fill the form with current transaction data
            console.log("working on it");

        });

        tabled5.appendChild(deleteBtn);
        tableRow.append(tabled1, tabled2, tabledtype, tabled3, tabled4, tabled5, tabled6);

        document.getElementById("table-body").appendChild(tableRow);
    }

    createtran()
    // Reset fields
    // amountInput.value = "";
    // descInput.value = "";
    // transectionCategory.value = "";
    // transectionAccount.value = "";
});
