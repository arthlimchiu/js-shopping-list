const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const filter = document.querySelector('#filter');
const itemList = document.querySelector("#item-list");
const clearBtn = document.querySelector('#clear');
const formBtn = itemForm.querySelector('button');
let isEditMode = false

function getItemsFromStorage() {
    if (localStorage.getItem('items') === null) {
        return [];
    } else {
        return JSON.parse(localStorage.getItem('items'));
    }
}

function onSubmit(e) {
    e.preventDefault();

    if (itemAlreadyExists() && !isEditMode) {
        alert('Item already exists!');
        return;
    }

    if (isInputValid()) {
        addItemFromInputToList();
        clearInput();
        checkForItems();
    } else {
        alert('Please add an item');   
    }
}

function isInputValid() {
    return itemInput.value !== '';
}

function itemAlreadyExists() {
    const items = getItemsFromStorage();
    if (items.includes(itemInput.value)) {
        return true;
    } else {
        return false;
    }
}

function addItemFromInputToList() {
    const itemName = itemInput.value;
    if (isEditMode) {
        removeItemThatIsInEditMode();
    }
    addItemToList(itemName);
    addItemFromInputToStorage();
}

function removeItemThatIsInEditMode() {
    const item = itemList.querySelector('.edit-mode');
    removeItemFromStorage(item.textContent);
    item.remove();
    turnOffEditMode();
}

function turnOffEditMode() {
    isEditMode = false;
    const icon = formBtn.querySelector('i');
    const text = formBtn.querySelector('span');
    formBtn.style.backgroundColor = '#333';
    icon.className = 'fa-solid fa-plus';
    text.innerText = 'Add Item'
}

function addItemToList(itemName) {
    const item = createItem(itemName);
    itemList.appendChild(item);
}

function addItemFromInputToStorage() {
    const items = getItemsFromStorage();
    items.push(itemInput.value);
    saveItemsToStorage(items)
}

function createItem(itemName) {
    const item = createListItemFromText(itemName);
    const button = createBtnWithIcon();

    item.appendChild(button);

    return item;
}

function createListItemFromText(itemName) {
    const li = document.createElement('li');
    const itemText = document.createTextNode(itemName);
    
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

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        deleteItem(e.target);
    } else {
        editItem(e.target);
    }
}

function deleteItem(item) {
    if (confirm('Are you sure?')) {
        const itemToDelete = item.parentElement.parentElement;
        removeItemFromStorage(itemToDelete.textContent);
        itemToDelete.remove();
    }
}

function removeItemFromStorage(itemName) {
    const items = getItemsFromStorage();
    const index = items.indexOf(itemName);
    items.splice(index, 1);
    saveItemsToStorage(items);
}

function saveItemsToStorage(items) {
    localStorage.setItem('items', JSON.stringify(items));
}

function editItem(item) {
    isEditMode = true;
    removeEditModeForAllItems();
    setItemToEditMode(item);
    turnOnEditMode();
    placeItemInInputField(item);
}

function removeEditModeForAllItems() {
    itemList
        .querySelectorAll('li')
        .forEach(item => {
            item.classList.remove('edit-mode');
        });
}

function setItemToEditMode(item) {
    item.classList.add('edit-mode');
}

function turnOnEditMode() {
    const icon = formBtn.querySelector('i');
    const text = formBtn.querySelector('span');
    formBtn.style.backgroundColor = '#228B22';
    icon.className = 'fa-solid fa-pen';
    text.innerText = 'Update Item'
}

function placeItemInInputField(item) {
    itemInput.value = item.textContent;
}

function onClearAll(e) {
    while(itemList.firstElementChild) {
        itemList.firstElementChild.remove();
    }
    removeItemsFromStorage();
    checkForItems();
}

function removeItemsFromStorage() {
    localStorage.removeItem('items');
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

function getItems() {
    return itemList.querySelectorAll('li');
}

function loadUI() {
    showItems();
    checkForItems();
}

function showItems() {
    const items = getItemsFromStorage();
    items.forEach((itemName) => {
        addItemToList(itemName);
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

// Event listeners
itemForm.addEventListener('submit', onSubmit);
filter.addEventListener('input', onFilter);
itemList.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', onClearAll);
document.addEventListener('DOMContentLoaded', loadUI);