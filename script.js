const availableFounds = document.querySelector('.available-founds');
const incomeArea = document.querySelector('.income-area');
const expensesArea = document.querySelector('.expenses-area');
const addTransactionBtn = document.querySelector('.add-transaction');
const deleteAllBtn = document.querySelector('.delete-all');
const lightModeBtn = document.querySelector('.light');
const darkModeBtn = document.querySelector('.dark');
const transactions = document.getElementsByClassName('transaction');

const addForm = document.querySelector('.add-form');
const transactionName = addForm.querySelector('#name');
const transactionAmount = addForm.querySelector('#amount');
const transactionCategory = addForm.querySelector('.category');
const saveBtn = addForm.querySelector('.save');
const cancelBtn = addForm.querySelector('.cancel');
const error = addForm.querySelector('.error');

const root = document.querySelector(':root');

let transactionId = 0;
let balance = 0;

const cleanForm = () => {
    addForm.style.display = 'none';
    transactionName.value = '';
    transactionAmount.value = '';
    transactionCategory.selectedIndex = 0;
};

const checkForm = () => {
    if (transactionName.value === '') {
        error.textContent = 'Enter name';
        return false;
    }
    if (transactionAmount.value === '' || transactionAmount.value === '0') {
        error.textContent = 'Enter amount';
        return false;
    }
    if (transactionCategory.value === '0') {
        error.textContent = 'Choose category';
        return false;
    }
    if (
        transactionCategory.value === '1' &&
        Number(transactionAmount.value) < 0
    ) {
        error.textContent = 'Choose category with minus [-]';
        return false;
    }
    if (
        Number(transactionCategory.value) > 1 &&
        Number(transactionAmount.value) > 0
    ) {
        error.textContent = 'Choose category with plus [+]';
        return false;
    }
    return true;
};

const addTransaction = () => {
    if (checkForm()) {
        transactionId += 1;

        const transaction = document.createElement('div');
        transaction.classList.add('transaction');
        transaction.id = transactionId;
        let transactionIcon;

        // which icon next to transaction
        switch (transactionCategory.value) {
            case '1':
                transactionIcon = `<i class="fas fa-money-bill-wave"></i>`;
                break;

            case '2':
                transactionIcon = `<i class="fas fa-cart-arrow-down"></i>`;
                break;

            case '3':
                transactionIcon = `<i class="fas fa-hamburger"></i>`;
                break;

            case '4':
                transactionIcon = `<i class="fas fa-film"></i>`;
                break;

            default:
                break;
        }

        transaction.innerHTML = `<p class="transaction-name">
        ${transactionIcon} ${transactionName.value}
        </p>

        <p class="transaction-amount">
            <span>${transactionAmount.value}</span>zł
            <button class="delete">
              <i class="fas fa-times"></i>
            </button>
        </p>`;

        // income or spending?
        if (Number(transactionAmount.value) > 0) {
            incomeArea.append(transaction);
        } else if (Number(transactionAmount.value) < 0) {
            expensesArea.append(transaction);
        }

        balance += Number(transactionAmount.value);
        availableFounds.textContent = `${balance}zł`;

        // listener to deleting single transaction
        transaction
            .querySelector('.delete')
            .addEventListener('click', function () {
                balance -= Number(this.previousElementSibling.textContent);
                availableFounds.textContent = `${balance}zł`;
                this.closest('div').remove();
            });

        cleanForm();
    }
};

const lightMode = () => {
    root.style.setProperty('--first-color', '#14161f');
    root.style.setProperty('--second-color', '#f9f9f9');
};
const darkMode = () => {
    root.style.setProperty('--first-color', '#f9f9f9');
    root.style.setProperty('--second-color', '#14161f');
};

addTransactionBtn.addEventListener('click', () => {
    addForm.style.display = 'flex';
});

cancelBtn.addEventListener('click', () => {
    cleanForm();
});

deleteAllBtn.addEventListener('click', () => {
    [...transactions].forEach((el) => el.remove());
    transactionId = 0;
    balance = 0;
    availableFounds.textContent = '0zł';
});

saveBtn.addEventListener('click', addTransaction);

darkModeBtn.addEventListener('click', darkMode);

lightModeBtn.addEventListener('click', lightMode);
