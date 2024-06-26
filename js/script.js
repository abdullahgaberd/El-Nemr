let title = document.getElementById('title');
let quantity = document.getElementById('quantity');
let price = document.getElementById('price');
let profit = document.getElementById('profit');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let category = document.getElementById('category');
let count = document.getElementById('count');
let dateM = document.getElementById('dateM');
let inside = document.getElementById('inside');
let outside = document.getElementById('outside');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;

//get total
function gTotal(){
    if(price.value != '') {
        let result = (+price.value + +profit.value + (+inside.value)) - +outside.value - +discount.value; 
        total.innerHTML = result;
        total.style.background = '#040';
        total.style.border = '1px solid gray'
    }else{
        total.innerHTML = '';
        total.style.background = '#a00d02'
    }
}


//create prouduct
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
}
//save localstoarge
submit.onclick = function(){
    let newPro = {
        title:title.value,
        quantity:quantity.value,
        price:price.value,
        profit:profit.value,
        inside:inside.value,
        outside:outside.value,
        discount:discount.value,
        total:total.innerHTML,
        category:category.value,
        count:count.value,
        dateM:dateM.value,
    }
    if(title.value != ''
        &&quantity.value != ''
        &&price.value != ''
        &&profit.value != ''
        &&inside.value != ''
        &&outside.value != ''
        &&category.value != '') {
        if(mood === 'create') {
            if(newPro.count > 1) {
                for(let i = 0; i < newPro.count;i++) {
                    dataPro.push(newPro)
                }
            }else {
                dataPro.push(newPro)
            }
        }else {
            dataPro[ tmp ] = newPro;
            mood = 'create';
            submit.innerHTML = 'اضافة المنتج';
            count.style.display = 'block';
        }
        clearData();
    }    
    localStorage.setItem('product',    JSON.stringify(dataPro)   );
    
    showData()
}
//clear inputs
function clearData(){
    title.value = '';
    quantity.value = '';
    price.value = '';
    profit.value = '';
    inside.value = '';
    outside.value = '';
    discount.value = '';
    total.innerHTML = '';
    category.value = '';
    count.value = '';
    dateM.value = '';
}
//read
function showData(){
    gTotal();
    let table = '';
    for(let i = 0; i < dataPro.length;i++){
        table += `
            <tr>
                <th scope="row">${i+1}</th>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].quantity}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].profit}</td>
                <td>${dataPro[i].inside}</td>
                <td>${dataPro[i].outside}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td>${dataPro[i].dateM}</td>
                <td><button onclick="updateData(${i})" id="update">التعديل</button></td>
                <td><button onclick="deleteData(${i})" id="delete">الحذف</button></td>
            </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    let btn = document.getElementById('deleteAll');
    if(dataPro.length > 0) {
        btn.innerHTML = `
        <button onclick="deleteAll()">حذف الجميع (${dataPro.length})</button>
        `
    }else {
        btn.innerHTML = '';
    }
}
showData()
//delete
function deleteData(i) {
    dataPro.splice(i,1)
    localStorage.product = JSON.stringify(dataPro);
    showData()
}

function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData()
}
//count

//update
function updateData(i) {
    title.value = dataPro[i].title;
    quantity.value = dataPro[i].quantity;
    price.value = dataPro[i].price;
    profit.value = dataPro[i].profit;
    inside.value = dataPro[i].inside;
    outside.value = dataPro[i].outside;
    discount.value = dataPro[i].discount;
    gTotal()
    category.value= dataPro[i].category;
    count.style.display = 'none';
    dateM.value = dataPro[i].dateM;
    submit.innerHTML = 'تعديل';
    mood = 'تعديل';
    tmp = i;
    scroll({
        top: 0,
        behavior:'smooth',

    })
}

//search
let searchMood = 'title';

function getsearchMood(id) {

    let search = document.getElementById('search');
    if(id == 'searchTitle') {
        searchMood = 'بالاسم';
        search.style.background = '#131921'
    }else {
        searchMood = 'بالفئة';
        search.style.background = 'rgba(128, 128, 128, 0.548)'
    }
    search.placeholder = 'البحث '+ searchMood;
    search.focus();
    search.value = '';
    showData()
}

function searchData(value) {
    let table = ''
    if(searchMood == 'title') 
    {
        for(let i = 0; i < dataPro.length;i++)
        {
            if(dataPro[i].title.includes(value))
            {
                table += `
                <tr>
                    <th scope="row">${i}</th>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].quantity}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].profit}</td>
                    <td>${dataPro[i].inside}</td>
                    <td>${dataPro[i].outside}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td>${dataPro[i].dateM}</td>
                    <td><button onclick="updateData(${i})" id="update">التعديل</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">الحذف</button></td>
                </tr>
            `
            }
        }
    }
    else {
        for(let i = 0; i < dataPro.length;i++)
        {
            if(dataPro[i].category.includes(value))
            {
                table += `
                <tr>
                    <th scope="row">${i}</th>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].quantity}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].profit}</td>
                    <td>${dataPro[i].inside}</td>
                    <td>${dataPro[i].outside}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td>${dataPro[i].dateM}</td>
                    <td><button onclick="updateData(${i})" id="update">التعديل</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">الحذف</button></td>
                </tr>
            `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

//clean data


