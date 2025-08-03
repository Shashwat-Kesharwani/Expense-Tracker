import { balanceDisplay, transactionType, message } from './dom.js'
import { transactions } from './data.js';

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
        const isIncome = tTransactionType.style.color === "green";
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

        const div = document.createElement("div")
        div.classList.add("editTable")

        let editaccount = document.createElement("input");
        editaccount.classList.add("inputcat");
        editaccount.value = account;

        let editCategory = document.createElement("select");
        editCategory.name = "type"
        editCategory.classList.add("inputcat");

        const incomeOption = document.createElement("option");
        incomeOption.value = "income";
        incomeOption.textContent = "Income";

        const expenseOption = document.createElement("option");
        expenseOption.value = "expense";
        expenseOption.textContent = "Expense";

        editCategory.append(incomeOption, expenseOption);

        let editType = document.createElement("input");
        editType.classList.add("inputcat");
        editType.value = inputcat

        let editTransactionType = document.createElement("input");
        editTransactionType.classList.add("inputcat");
        editTransactionType.value = amount

        let editdescription = document.createElement("input");
        editdescription.classList.add("inputcat");
        editdescription.value = description

        let NewEditBtn = document.createElement("button");
        NewEditBtn.innerText = "Done";
        NewEditBtn.classList.add("addbtn");
        NewEditBtn.style.width = "130px";
        NewEditBtn.addEventListener("click", () => {
            div.remove()
            console.log(editaccount.value);
            console.log(editCategory.value);
            console.log(editType.value);
            console.log(editTransactionType.value);
            console.log(editdescription.value);

            taccount.innerText = editaccount.value;
            tcategory.innerText = editCategory.value;
            tabledtype.innerText = editType.value
            tTransactionType.innerText = editTransactionType.value
            tdescription.innerText = editdescription.value

            transactions.push({
                account: editaccount.value,
                category: editCategory.value,
                type: editType.value,
                transaction: parseFloat(editTransactionType.value),
                description: editdescription.value
            });
            localStorage.setItem("transaction_data", JSON.stringify(transactions))
        })

        let closebtn = document.createElement("button");
        closebtn.classList.add("addbtn");
        closebtn.style.backgroundColor = "red";
        closebtn.innerText = "Close";
        closebtn.style.marginTop = "1rem";
        closebtn.style.marginLeft = "1rem";
        closebtn.style.width = "70px";
        closebtn.addEventListener("click", () => {
            div.remove();
        })

        div.append(editaccount, editCategory, editType, editTransactionType, editdescription, NewEditBtn, closebtn)

        document.querySelector("table").appendChild(div);

        console.log("working on it");

    });

    tdeleteBtn.appendChild(deleteBtn);
    tableRow.append(tableID, taccount, tcategory, tabledtype, tTransactionType, tdescription, tableDate, tdeleteBtn, teditBtn);

    document.getElementById("table-body").appendChild(tableRow);
}

export { updateBalance, clearMessageAfterDelay, createtran };
