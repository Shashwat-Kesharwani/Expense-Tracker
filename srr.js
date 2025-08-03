import { transactions } from './src/js/data.js';
import {
    addTransactionBtn,
    message,
    accInput,
    addAcc,
    accountList,
    transectionAccount,
    addCategory,
    expenseCategoryList,
    incomeCategoryList,
    transectionCategory,
    amountInput,
    descInput,
    incomeBtn,
    expenseBtn,
    incomeCategory,
    expenseCategory,
    acclist
} from '../src/js/dom.js';
import { updateBalance, clearMessageAfterDelay, createtran } from '../src/js/function.js';

let tableRow = document.createElement("tr");
window.balance = 0;
let transactionType = "income";

// Add Data in Local Storage
if (!localStorage.getItem("transaction_data")) {
    localStorage.setItem("transaction_data", JSON.stringify(transactions));
}
let transactionJson = JSON.parse(localStorage.getItem("transaction_data"));

// Show Data Of Local Storage
for (let i = 0; i < transactionJson.length; i++) {
    const element = transactionJson[i];
    createtran(
        element.account,
        element.category,
        element.type,
        element.transaction,
        element.description
    );
}

// Add Account List
acclist.forEach(i => {
    let newli = document.createElement("li");
    newli.innerText = i;
    accountList.appendChild(newli);

    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    transectionAccount.appendChild(option);
});

// Add Income Category
incomeCategory.forEach(i => {
    let newli = document.createElement("li");
    newli.innerText = i;
    incomeCategoryList.appendChild(newli);
});

// Add Expence Category
expenseCategory.forEach(i => {
    let newli = document.createElement("li");
    newli.innerText = i;
    expenseCategoryList.appendChild(newli);
});

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
    let categorieform = document.createElement("div");
    categorieform.classList.add("categoryform");

    let heading = document.createElement("h1");
    heading.innerText = "Create Category";

    let closebtn = document.createElement("button");
    closebtn.classList.add("addbtn");
    closebtn.style.backgroundColor = "red";
    closebtn.innerText = "Close";
    closebtn.style.marginTop = "1rem";

    let inputIncomeradio = document.createElement("input");
    inputIncomeradio.classList.add("rdobtn");
    inputIncomeradio.type = "radio";
    inputIncomeradio.name = "category";
    inputIncomeradio.value = "income";
    inputIncomeradio.id = "incomeRadio";
    inputIncomeradio.checked = true;

    let labelIncome = document.createElement("label");
    labelIncome.setAttribute("for", "incomeRadio");
    labelIncome.innerText = " Income";

    let inputExpradio = document.createElement("input");
    inputExpradio.classList.add("rdobtn");
    inputExpradio.type = "radio";
    inputExpradio.name = "category";
    inputExpradio.value = "expense";
    inputExpradio.id = "expenseRadio";

    let labelExpense = document.createElement("label");
    labelExpense.setAttribute("for", "expenseRadio");
    labelExpense.innerText = " Expense";

    let inputcat = document.createElement("input");
    inputcat.classList.add("inputcat");
    inputcat.placeholder = "Enter Your Category";
    inputcat.required = true;

    let NewFormBtn = document.createElement("button");
    NewFormBtn.innerText = "Add Category";
    NewFormBtn.classList.add("addbtn");

    NewFormBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const selectedType = categorieform.querySelector('input[name="category"]:checked').value;
        const newCategory = inputcat.value.trim();

        if (!newCategory) return;

        if (selectedType === "income") {
            incomeCategory.push(newCategory);
            let newli = document.createElement("li");
            newli.innerText = newCategory;
            incomeCategoryList.appendChild(newli);
            let option = document.createElement("option");
            option.value = newCategory;
            option.textContent = newCategory;
            transectionCategory.appendChild(option);
        } else {
            expenseCategory.push(newCategory);
            let newli = document.createElement("li");
            newli.innerText = newCategory;
            expenseCategoryList.appendChild(newli);
            let option = document.createElement("option");
            option.value = newCategory;
            option.textContent = newCategory;
            transectionCategory.appendChild(option);
        }

        categorieform.remove();
    });

    closebtn.addEventListener("click", () => {
        categorieform.remove();
    });

    categorieform.append(
        heading,
        inputIncomeradio, labelIncome,
        inputExpradio, labelExpense,
        inputcat,
        NewFormBtn,
        closebtn
    );

    document.body.appendChild(categorieform);
});

// Add Income Button
incomeBtn.addEventListener("click", () => {
    transactionType = "income";
    incomeBtn.classList.add("active");
    expenseBtn.classList.remove("active");
    transectionCategory.innerText = "";
    incomeCategory.forEach(i => {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        transectionCategory.appendChild(option);
    });
});

// Add Expense Button
expenseBtn.addEventListener("click", () => {
    transactionType = "expense";
    expenseBtn.classList.add("active");
    incomeBtn.classList.remove("active");
    transectionCategory.innerText = "";
    expenseCategory.forEach(i => {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        transectionCategory.appendChild(option);
    });
});

// Add Transaction
addTransactionBtn.addEventListener("click", () => {
    let category = transactionType;
    let account = transectionAccount.value;
    let amount = parseFloat(amountInput.value);
    let description = descInput.value.trim() || "No description";
    let inputcat = transectionCategory.value;

    if (category == "income") {
        if (!inputcat || !incomeCategory.includes(inputcat)) {
            message.innerText = "Please select a valid category.";
            clearMessageAfterDelay();
            return;
        }
    }

    if (category == "expense") {
        if (!inputcat || !expenseCategory.includes(inputcat)) {
            message.innerText = "Please select a valid category.";
            clearMessageAfterDelay();
            return;
        }
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

    createtran(account, category, inputcat, amount, description);

    transactions.push({
        account,
        category: transactionType,
        type: inputcat,
        transaction: amount,
        description
    });

    localStorage.setItem("transaction_data", JSON.stringify(transactions));
});
