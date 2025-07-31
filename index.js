const main = document.querySelector(".main");
const createcard = document.querySelector("#createcard");
let totalIncome = 0;
let totalexp = 0;
let bal = 0;

createcard.addEventListener("click", createCard);

function createCard() {
    let container = document.createElement("div");
    container.classList.add("container");
    let head = document.createElement("h1");
    head.innerHTML = "Undefined";
    head.addEventListener("click", changeHead);

    function changeHead() {
        let input = document.createElement("input")
        input.classList.add("headingInput")
        input.value = head.textContent;
        input.type = "text";

        head.parentNode.insertBefore(input, head);
        head.style.display = "none"
        input.focus()

        input.addEventListener("blur", finishedit);

        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                finishedit();
                // console.log("kam ho gya");

            }
        });

        function finishedit() {
            let newText = input.value.trim();
            if (newText) {
                head.textContent = newText;
            }
            head.style.display = ""
            if (input && input.parentNode) {
                input.remove();
            }
        }
    }

    let closebtn = document.createElement("button")
    closebtn.classList.add("closebtn");
    closebtn.innerText = "close";

    closebtn.addEventListener("click", () =>{
        container.remove();
    })

    let balanceBtnSpace = document.createElement("div");
    balanceBtnSpace.classList.add("balance-btn-space");

    let cardbalance = document.createElement("div");
    cardbalance.classList.add("balance");
    cardbalance.innerText = "Balance:";
    let balancepara = document.createElement("p");
    balancepara.innerText = "0";
    cardbalance.appendChild(balancepara);
    balanceBtnSpace.appendChild(cardbalance);

    let box = document.createElement("div");
    box.classList.add("box");
    let boxIncome = document.createElement("div");
    boxIncome.classList.add("income");
    boxIncome.innerText = "Income";
    let boxIncomeBtn = document.createElement("button");
    boxIncomeBtn.innerText = "+";

    let boxIncomeUl = document.createElement("ul");
    boxIncomeUl.classList.add("insideincome");
    let totalIcome = document.createElement("div");
    totalIcome.classList.add("insum", "total");
    totalIcome.innerText = "Total = 0";

    boxIncome.append(boxIncomeBtn, boxIncomeUl, totalIcome);

    let boxExpend = document.createElement("div");
    boxExpend.classList.add("expend");
    boxExpend.innerText = "Expense";

    let boxExpendBtn = document.createElement("button");
    boxExpendBtn.innerText = "-";

    let boxExpendUl = document.createElement("ul");
    boxExpendUl.classList.add("insideexpend");

    let totalExpend = document.createElement("div");
    totalExpend.classList.add("exsum", "total");
    totalExpend.innerText = "Total = 0";

    boxExpend.append(boxExpendBtn, boxExpendUl, totalExpend);
    box.append(boxIncome, boxExpend);

    let cardhistory = document.createElement("div");
    cardhistory.classList.add("history");

    let historypara = document.createElement("p");
    historypara.innerText = "Transaction";

    let Search = document.createElement("input");
    Search.type = "search";
    Search.placeholder = "Search";

    cardhistory.append(historypara, Search);

    let historyList = document.createElement("ul");
    historyList.classList.add("ulhistory");

    container.append(head, balanceBtnSpace, box, cardhistory, historyList, closebtn);
    main.appendChild(container);

    boxIncomeBtn.addEventListener("click", () =>
        addincomeFun(balancepara, boxIncomeUl, totalIcome, historyList)
    );
    boxExpendBtn.addEventListener("click", () =>
        lessExpendfun(balancepara, boxExpendUl, totalExpend, historyList)
    );
}

function addincomeFun(balancePTAg, insideincome, insum, ulhistory) {
    let box = document.createElement("div");
    box.style.marginBottom = "5px";

    let input = document.createElement("input");
    input.type = "number";
    input.placeholder = "Enter amount";

    let decp = document.createElement("input");
    decp.type = "text";
    decp.placeholder = "Enter description";

    box.append(input, decp);
    insideincome.appendChild(box);
    input.focus();

    function handelIncome(e) {
        if (e.key === "Enter") {
            let amount = input.value.trim();
            let description = decp.value.trim();

            if (amount) {
                let amt = parseFloat(amount);

                let newLi = document.createElement("li");
                newLi.classList.add("in");
                newLi.innerText = `₹${amount} - ${description}`;
                insideincome.appendChild(newLi);

                let historyLi = document.createElement("li");
                historyLi.innerText = `₹${amount} - ${description}`;

                let editbtn = document.createElement("button");
                editbtn.innerText = "✏️";
                editbtn.classList.add("editbtn");
                editbtn.addEventListener("click", () => {
                    let editinput = document.createElement("input");
                    editinput.classList.add("headinginput");
                    editinput.type = "text";
                    editinput.value = historyLi.firstChild.textContent;
                    historyLi.replaceChild(editinput, historyLi.firstChild);
                    editinput.focus();

                    editinput.addEventListener("keypress", (e) => {
                        if (e.key === "Enter") {
                            let newValue = editinput.value.trim();
                            if (newValue) {
                                let newAmount = parseFloat(newValue.split("₹")[1]);
                                if (!isNaN(newAmount)) {
                                    totalIncome = totalIncome - amt + newAmount;
                                    bal = bal - amt + newAmount;

                                    balancePTAg.innerText = bal;
                                    insum.innerText = `Total ₹${totalIncome}`;
                                    amt = newAmount;

                                    let updatedText = document.createElement("span");
                                    updatedText.innerText = newValue;
                                    historyLi.replaceChild(updatedText, editinput);
                                    // newLi.innerText = newValue;
                                }
                            }
                        }
                    });

                    editinput.addEventListener("blur", () => {
                        historyLi.replaceChild(document.createTextNode(editinput.value.trim()), editinput);
                    });
                });

                let dltbtn = document.createElement("button");
                dltbtn.innerText = "🗑️";
                dltbtn.classList.add("dltbtn");
                dltbtn.addEventListener("click", () => {
                    newLi.remove();
                    historyLi.remove();
                    totalIncome -= amt;
                    bal -= amt;
                    balancePTAg.innerText = bal;
                    insum.innerText = `Total ₹${totalIncome}`;
                });

                let btnContainer = document.createElement("span");
                btnContainer.classList.add("btn-container");
                btnContainer.append(editbtn, dltbtn);
                historyLi.appendChild(btnContainer);

                ulhistory.appendChild(historyLi);
                box.remove();

                totalIncome += amt;
                bal += amt;
                balancePTAg.innerText = bal;
                insum.innerText = `Total ₹${totalIncome}`;
            }
        }
    }

    input.addEventListener("keypress", handelIncome);
    decp.addEventListener("keypress", handelIncome);
}

function lessExpendfun(balancePTAg, insideexpend, exsum, ulhistory) {
    let box = document.createElement("div");
    box.style.marginBottom = "10px";

    let input = document.createElement("input");
    input.type = "number";
    input.placeholder = "Enter amount";

    let decp = document.createElement("input");
    decp.placeholder = "Enter description";

    box.append(input, decp);
    insideexpend.appendChild(box);
    input.focus();

    function HandelExp(e) {
        if (e.key === "Enter") {
            let amount = input.value.trim();
            let description = decp.value.trim();

            if (amount) {
                let amt = parseFloat(amount);

                let newLi = document.createElement("li");
                newLi.classList.add("exp");
                newLi.innerText = `₹${amount} - ${description}`;
                insideexpend.appendChild(newLi);

                let historyLi = document.createElement("li");
                historyLi.innerText = `₹${amount} - ${description}`;

                let editbtn = document.createElement("button");
                editbtn.innerText = "✏️";
                editbtn.classList.add("editbtn");
                editbtn.addEventListener("click", () => {
                    let editinput = document.createElement("input");
                    editinput.classList.add("headinginput");
                    editinput.type = "text";
                    editinput.value = historyLi.firstChild.textContent;
                    historyLi.replaceChild(editinput, historyLi.firstChild);
                    editinput.focus();

                    editinput.addEventListener("keypress", (e) => {
                        if (e.key === "Enter") {
                            let newValue = editinput.value.trim();
                            if (newValue) {
                                let newAmount = parseFloat(newValue.split("₹")[1]);
                                if (!isNaN(newAmount)) {
                                    totalexp = totalexp - amt + newAmount;
                                    bal = bal + amt - newAmount;

                                    balancePTAg.innerText = bal;
                                    exsum.innerText = `Total ₹${totalexp}`;
                                    amt = newAmount;

                                    let updatedText = document.createElement("span");
                                    updatedText.innerText = newValue;
                                    historyLi.replaceChild(updatedText, editinput);
                                }
                            }
                        }
                    });

                    editinput.addEventListener("blur", () => {
                        historyLi.replaceChild(document.createTextNode(editinput.value.trim()), editinput);
                    });
                });

                let dltbtn = document.createElement("button");
                dltbtn.innerText = "🗑️";
                dltbtn.classList.add("dltbtn");
                dltbtn.addEventListener("click", () => {
                    newLi.remove();
                    historyLi.remove();
                    totalexp -= amt;
                    bal += amt;
                    balancePTAg.innerText = bal;
                    exsum.innerText = `Total ₹${totalexp}`;
                });

                let btnContainer = document.createElement("span");
                btnContainer.classList.add("btn-container");
                btnContainer.append(editbtn, dltbtn);
                historyLi.appendChild(btnContainer);

                ulhistory.appendChild(historyLi);
                box.remove();

                totalexp += amt;
                bal -= amt;
                balancePTAg.innerText = bal;
                exsum.innerText = `Total ₹${totalexp}`;
            }
        }
    }

    input.addEventListener("keypress", HandelExp);
    decp.addEventListener("keypress", HandelExp);
}
