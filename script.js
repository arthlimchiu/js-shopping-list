const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const filter = document.querySelector('#filter');
const itemList = document.querySelector("#item-list");
const clearBtn = document.querySelector('#clear');

function onSubmit(e) {
    e.preventDefault();

    if (isInputValid()) {
        addItemToList();
    } else {
        alert('Please add an item');
    }
}

function isInputValid() {
    return itemInput.value !== '';
}

function addItemToList() {
    const item = createItem();

    itemList.appendChild(item);

    clearInput();
    checkForItems();
}

function createItem() {
    const item = createListItemWithInputAsText();
    const button = createBtnWithIcon();

    item.appendChild(button);

    return item;
}

function createListItemWithInputAsText() {
    const li = document.createElement('li');
    const itemText = document.createTextNode(itemInput.value);
    
    li.appendChild(itemText);

    return li;
}

function createBtnWithIcon() {
    const button = createBtn();
    const icon = createIcon();

    button.appendChild(icon);

    return button;
}

function createBtn() {
    const button = document.createElement('button');
    button.className = 'remove-item btn-link text-red';

    return button;
}

function createIcon() {
    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-xmark';

    return icon;
}

function clearInput() {
    itemInput.value = '';
}

function onDelete(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            checkForItems();
        }
    }
}

function onClearAll(e) {
    while(itemList.firstElementChild) {
        itemList.firstElementChild.remove();
    }
    checkForItems();
}

function onFilter(e) {
    const text = e.target.value.toLowerCase();
    const items = getItems();

    items.forEach((item) => {
        if (item.textContent.toLowerCase().includes(text)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function checkForItems() {
    const items = getItems();

    if (items.length  === 0) {
        clearBtn.style.display = 'none';
        filter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        filter.style.display = 'block';
    }
}

function getItems() {
    return itemList.querySelectorAll('li');
}

// Event listeners
itemForm.addEventListener('submit', onSubmit);
filter.addEventListener('input', onFilter);
itemList.addEventListener('click', onDelete);
clearBtn.addEventListener('click', onClearAll);

checkForItems();