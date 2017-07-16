function showUsers() {
    var container = document.getElementById('showUsers');
    container.innerHTML = '';
    hiddenChild('userShowContainer', 'formView', 'formEdit', 'formCreateUser');

    for (var i = 0; i < users.length; i++) {
        showTableInfo(container, users[i], i);
    }
}

function showTableInfo(parent, itemInfo, i) {
    var tableInfo = document.createElement('tr');

    for (var key in itemInfo) {
        if (key == 'id' || key == 'userLogin' || key == 'firstName' || key == 'birthday') {
            var tableInfoTd = document.createElement('td');
            tableInfoTd.innerHTML = itemInfo[key];

            if (key == 'userLogin' && itemInfo.id !== 'id'){
                tableInfoTd.setAttribute('data-user', itemInfo.id)
                tableInfoTd.onclick = viewUser;
            }

            tableInfo.appendChild(tableInfoTd);
        }
    }

    if (itemInfo.id !== 'id') {
        btnItem(tableInfo, 'Edit', 'btn-success', i, editUser);
        btnItem(tableInfo, 'Delete', 'btn-danger', i, deleteUser);
    }

    parent.appendChild(tableInfo);
}

//view user info
function viewUser(event) {
    var logItem = event.target;
    var loginUserItem = logItem.getAttribute('data-user');

    hiddenChild('formView', 'userShowContainer', 'formEdit', 'formCreateUser');

    var form = document.getElementById('formView');
    form.innerHTML = '';

    var formGroup = document.createElement('div');
    formGroup.classList.add('form-group');

    var formLabel = document.createElement('p');
    formLabel.classList.add('formLabel');
    formLabel.innerHTML = '<em>User: </em><strong>' + users[loginUserItem-1].userLogin + '</strong>';
    form.appendChild(formLabel);

    for (var i = 0; i < users.length; i++) {
        if (i==loginUserItem-1) {
            var counter = i;
            var userLanguageSkills = users[i];
            var usersItemLanguage = userLanguageSkills.language;

            var usersItemLSkills = userLanguageSkills.skills;

            //логин
            labelFormItem(formGroup, 'Login');
            formItem (formGroup, users[i].userLogin);

            //имя пользователя
            labelFormItem(formGroup, 'Name');
            formItem (formGroup, users[i].firstName);

            //фамилия
            labelFormItem(formGroup, 'Last name');
            formItem (formGroup, users[i].lastName);

            //дата рождения
            labelFormItem(formGroup, 'Birthday');
            formItem (formGroup, users[i].birthday);

            //страна проживания пользователя
            labelFormItem(formGroup, 'Country');
            formItem (formGroup, users[i].country);

            //языки которыми владет пользователь
            labelFormItem(formGroup, 'Language');
            var strLanguage = '';
            for (var j = 0; j < usersItemLanguage.length; j++) {
                strLanguage += usersItemLanguage[j] + ' ';
            }
            formItem (formGroup, strLanguage);

            //навыки пользователя
            labelFormItem(formGroup, 'Skills');
            var strSkills = '';
            for (var j = 0; j < usersItemLSkills.length; j++) {
                strSkills += usersItemLSkills[j] + ' ';
            }
            formItem (formGroup, strSkills);

            //имейл адресс
            labelFormItem(formGroup, 'E-mail');
            formItem (formGroup, users[i].email);

            form.appendChild(formGroup);

            //кнопки
            btnItem (form, 'Back', 'btn-default', counter, showUsers);
            btnItem (form, 'Edit', 'btn-success', counter, editUser);
            btnItem (form, 'Delete', 'btn-danger', counter, deleteUser);

            document.getElementById('container').appendChild(form);
        }
    }
}

function hiddenChild(show, hiddenFirst, hiddenSecond, hiddenThird) {
    document.getElementById(hiddenFirst).style.display = 'none';
    document.getElementById(hiddenSecond).style.display = 'none';
    document.getElementById(hiddenThird).style.display = 'none';
    document.getElementById(show).style.display = 'block';
}

//заголовки для i-го элемента формы
function labelFormItem (wrapper, item) {
    var label = document.createElement('label');
    label.classList.add('col-sm-2', 'control-label');
    label.innerHTML = item;
    wrapper.appendChild(label);
}

//елементы вывода информации в форму (в режиме просмотра)
function formItem (wrapper, item) {
    var loginItemValue = document.createElement('div');
    loginItemValue.classList.add('col-md-10');

    var pLogin = document.createElement('p');
    pLogin.classList.add('form-control-static');
    pLogin.innerHTML = item;
    wrapper.appendChild(pLogin);
}

//функция добавления кнопок
function btnItem (wrapper, item, classBtn, counter, click) {
    var btnClick = document.createElement('div');
    btnClick.classList.add('btn', classBtn);
    btnClick.setAttribute('data-user', counter);
    btnClick.addEventListener('click', click);
    btnClick.innerHTML = item;

    wrapper.appendChild(btnClick);
}

//функция вывода и редактирования информациии о пользователе
function editUser(event) {
    hiddenChild('formEdit', 'formView', 'userShowContainer', 'formCreateUser');

    var target = event.target;
    var userEdit = target.getAttribute('data-user');

    var form = document.getElementById('formEdit');
    form.innerHTML = '';

    var labelForm = document.createElement('p');
    labelForm.classList.add('form-control-static', 'text-center');
    labelForm.innerHTML = 'User: ' + '<strong><em>' + users[userEdit].userLogin + '</em></strong>';
    form.appendChild(labelForm);

    //перебор значений ключей для редактирования
    for (var key in users[userEdit]){
        if (key == 'id'){continue}
        formItemEditText(form, key, users[userEdit][key]);
    }

    //кнопки
    btnItem (form, 'Back', 'btn-default', userEdit, viewUser);
    btnItem (form, 'Save', 'btn-success', userEdit, saveUser);
}

//элементы формы при редактировании
function formItemEditText (wrapper, labelName, itemValue) {
    var formGroup = document.createElement('div');
    formGroup.classList.add('form-group');
    formGroup.setAttribute('name', 'formGroup');

    var label = document.createElement('label');
    label.setAttribute('for', labelName);
    label.classList.add('col-sm-2', 'control-label');
    label.innerHTML = labelName;

    formGroup.appendChild(label);


    var divText = document.createElement('div');
    divText.classList.add('col-sm-10');

    var edit = document.createElement('input');
    edit.classList.add('form-control');
    edit.setAttribute('type', 'text');
    edit.setAttribute('name', labelName);
    edit.setAttribute('id', labelName);
    edit.setAttribute('value', itemValue);

    divText.appendChild(edit);

    formGroup.appendChild(divText);
    wrapper.appendChild(formGroup);
}

//сохранение результата редактирования
function saveUser(event) {
    var target = event.target;
    var saveUser = target.getAttribute('data-user');
    var itemUserSave = users[saveUser];

    for (var key in itemUserSave){
        if (key == 'id') {continue}

        var inputValue = document.getElementById(key);
        itemUserSave[key] = inputValue.value;

        console.log(inputValue);
    }
    showUsers();
}

//создание нового польззователя
function createUser() {
    hiddenChild('formCreateUser', 'userShowContainer', 'formView', 'formEdit');
    var form = document.getElementById('formCreateUser');
    form.setAttribute('name', 'formCreateUser');
    form.innerHTML = '';

    var labelForm = document.createElement('p');
    labelForm.classList.add('form-control-static', 'text-center');
    labelForm.innerHTML = '<strong><em>Create new user</em></strong>';
    form.appendChild(labelForm);

    for (var key in users[1]){
        createUserItemInfo(form, key);
    }

    //кнопки
    btnItem (form, 'Back', 'btn-default', 0, showUsers);
    btnItem (form, 'Save', 'btn-success', 0, validationForm);
}

//элементы формы при создании пользователя
function createUserItemInfo (wrapper, labelName) {
    var formGroup = document.createElement('div');
    formGroup.classList.add('form-group');
    formGroup.setAttribute('name', labelName);

    var label = document.createElement('label');
    label.setAttribute('for', labelName);
    label.classList.add('col-sm-2', 'control-label');
    label.innerHTML = labelName;

    formGroup.appendChild(label);

    var divText = document.createElement('div');
    divText.classList.add('col-sm-10');

    var edit = document.createElement('input');
    edit.classList.add('form-control');

    typeInputForm(edit, labelName);

    edit.setAttribute('name', labelName);
    edit.setAttribute('id', labelName);

    divText.appendChild(edit);

    formGroup.appendChild(divText);
    wrapper.appendChild(formGroup);
}

function typeInputForm(itemInput, labelName) {
    if (labelName == 'birthday'){
        itemInput.setAttribute('type', 'date');
        itemInput.setAttribute('value', '1900-01-01');
    } else if (labelName == 'email'){
        itemInput.setAttribute('type', 'email');
    } else {
        itemInput.setAttribute('type', 'text');
    }
    return itemInput;
}

function addNewUser(result) {
    if (result==true){
        var itemUserSave = users[1];
        var newUser2 = {};

        for (var key in itemUserSave){
            var inputValue = document.getElementById(key);
            newUser2[key] = inputValue.value;
        }
        users[users.length] = newUser2;

        showUsers();
    } else {validationForm()}
}

function deleteUser() {
    var target = event.target;
    var deleteItemUser = target.getAttribute('data-user');

    users.splice(deleteItemUser, 1);

    showUsers();
}

function validationForm() {
    var parent = document.forms.formCreateUser.elements;

    //проверка ид пользователя
    var reId = /-?\d/;
    removeErrorMassage(parent.id.parentNode);

    if (reId.test(parent.id.value) == false){
        showError(parent.id.parentNode, 'Please enter id again');
    }

    //проверка логина
    var reLog = /\w/;
    removeErrorMassage(parent.userLogin.parentNode);

    if (reLog.test(parent.userLogin.value)==false){
        showError(parent.userLogin.parentNode, 'Please enter login again');
    }

    //проверка текстовых полей
    var reName = /[a-z,A-Z]/;

    removeErrorMassage(parent.firstName.parentNode);

    if (reName.test(parent.firstName.value)==false){
        showError(parent.firstName.parentNode, 'Please enter first name again');
    }

    removeErrorMassage(parent.lastName.parentNode);
    if (reName.test(parent.lastName.value)==false){
        showError(parent.lastName.parentNode, 'Please enter last name again');
    }

    removeErrorMassage(parent.country.parentNode);
    if (reName.test(parent.country.value)==false){
        showError(parent.country.parentNode, 'Please enter country again');
    }

    removeErrorMassage(parent.gender.parentNode);
    if (reName.test(parent.gender.value)==false){
        showError(parent.gender.parentNode, 'Please enter sex again');
    }

    removeErrorMassage(parent.language.parentNode);
    if (reName.test(parent.language.value)==false){
        showError(parent.language.parentNode, 'Please enter language again');
    }

    removeErrorMassage(parent.skills.parentNode);
    if (reName.test(parent.skills.value)==false){
        showError(parent.skills.parentNode, 'Please enter skills again');
    }

    var reId = /[a-zA-Z\w]@[a-zA-Z]*\.[a-zA-Z]{1,}/;
    removeErrorMassage(parent.email.parentNode);

    if (reId.test(parent.email.value) == false){
        showError(parent.email.parentNode, 'Please enter your mail address, again');
    }

    if (document.querySelectorAll.length('error') == 0){
        addNewUser(true);
    }
}

function removeErrorMassage(container){
    if (container.lastChild.className == 'error'){
        container.removeChild(container.lastChild);
    }
}

function showError(container, message) {
    var showMessage = document.createElement('em');
    showMessage.classList.add('error');
    showMessage.innerHTML = message;

    container.appendChild(showMessage);
}

