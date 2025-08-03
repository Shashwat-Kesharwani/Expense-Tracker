import { balanceDisplay, transactionType, message } from './dom.js'

let id = 1000;

// Utility Functions
function updateBalance() {
    // balanceDisplay.textContent = `Balance: ₹${balance.toFixed(2)}`;
    balanceDisplay.innerText = `Balance: ₹${Number(window.balance).toFixed(2)}`;

}

function clearMessageAfterDelay() {
    message.style.opacity = 1;
    setTimeout(() => {
        message.style.opacity = 0;
    }, 3000);
}

function createtran(account, category, inputcat, amount, description) {
    id += 1
    const now = new Date();

    // Create transaction row
    let tableRow = document.createElement("tr");

    let tableID = document.createElement("td")
    tableID.innerText = id;

    let taccount = document.createElement("td");
    taccount.innerText = account;

    let tcategory = document.createElement("td");
    tcategory.innerText = category;

    let tabledtype = document.createElement("td");
    tabledtype.innerText = inputcat;

    let tTransactionType = document.createElement("td");

    let tdescription = document.createElement("td");
    tdescription.innerText = description;

    let tableDate = document.createElement("td")
    tableDate.innerText = now.toISOString().split('T')[0];

    let tdeleteBtn = document.createElement("td");
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("addbtn");
    deleteBtn.style.backgroundColor = "red";

    // Add or subtract based on income/expense
    if (transactionType === "income") {
        window.balance += amount;
        tTransactionType.innerText = `+${amount.toFixed(2)}`;
        tTransactionType.style.color = "green";
        
    } else if (transactionType === "expense") {
        window.balance -= amount;
        tTransactionType.innerText = `-${amount.toFixed(2)}`;
        tTransactionType.style.color = "red";
    }

    updateBalance();

    // Delete logic
    deleteBtn.addEventListener("click", () => {
        const isIncome = tdeleteBtn.style.color === "green";
        if (isIncome) {
            balance -= amount;
        } else {
            balance += amount;
        }
        updateBalance();
        tableRow.remove();
    });

    //editbtn
    let teditBtn = document.createElement("td");
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("dltbtn");
    editBtn.style.backgroundColor = "orange";
    teditBtn.appendChild(editBtn);
    editBtn.addEventListener("click", () => {
        // Fill the form with current transaction data
        console.log("working on it");

    });

    tdeleteBtn.appendChild(deleteBtn);
    tableRow.append(tableID, taccount, tcategory, tabledtype, tTransactionType, tdescription,tableDate, tdeleteBtn, teditBtn);

    document.getElementById("table-body").appendChild(tableRow);
}

export { updateBalance, clearMessageAfterDelay, createtran };
