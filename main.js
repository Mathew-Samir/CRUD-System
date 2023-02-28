let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let category =document.getElementById('category');
let number =document.getElementById('number');
let submit =document.getElementById('submit');
let mood ='create';
let tmp;
//console.log(title,price,taxes,ads,discount,total,category,number,submit);

//get totale

function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML= result;
        total.style.background ='green';
    }else{
        total.style.background ='darkcyan';
        total.innerHTML= '---';
    }
}

//create product

let dataProduct;
if(localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product);
}else{
    dataProduct=[];
}

submit.onclick = function(){
    let NewProduct = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        category:category.value.toLowerCase(),
        number:number.value,
    }
    if(title.value != '' && price.value != '' && category.value != '' && NewProduct.number <=100){
    if(mood === 'create'){
        if(NewProduct.number > 1){
            for(let i =0 ; i < NewProduct.number ; i++){
                dataProduct.push(NewProduct);
            }
        }else{
            dataProduct.push(NewProduct);
        }
    }else{
        dataProduct[tmp] = NewProduct;
        submit.innerHTML='create';
        number.style.display='block';
        mood = 'create';
    }
    clearData();
    }  

    localStorage.setItem('product',JSON.stringify(dataProduct));
    //localStorage.removeItem("product");
    console.log(dataProduct);

    showData();
}

//clear inputs

function clearData(){
    title.value ='';
    price.value = '';
    taxes.value ='';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '---';
    category.value = '';
    number.value = '';
}

//read

function showData(){
    let table = '';
    for(let i= 0 ; i < dataProduct.length; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick ="updateData(${i})" id="update">update</button></td>
            <td><button onclick ="delereData(${i})" id="delete">delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataProduct.length >1){
        btnDelete.innerHTML=`
        <button onclick ="deleteAll()">delete all (${dataProduct.length})</button>
        `;
    }else{
        btnDelete.innerHTML='';
    }

    getTotal();    
}

showData();


//DELETE

function delereData(i){
    dataProduct.splice(i,1);
    localStorage.product = JSON.stringify(dataProduct);
    showData();
}


function deleteAll(){
    localStorage.clear();
    dataProduct.splice(0);
    showData();
}

//count
//update


function updateData(i){
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();
    number.style.display='none';
    category.value = dataProduct[i].category;
    submit.innerHTML='update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth'
    });
}


//search

let searchMood = 'title';

function getSearchMood(id){
let search = document.getElementById('search');    
if(id == 'searchTitle'){
    searchMood = 'title';
}else{
    searchMood = 'category';
}
search.placeholder = 'search by '+searchMood;
search.focus();
search.value = '';
showData();
//console.log(id);
}



function searchData(value){
    let table ='';
    for(let i =0 ;i < dataProduct.length ; i++){
        if(searchMood == 'title'){
            if(dataProduct[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick ="updateData(${i})" id="update">update</button></td>
                    <td><button onclick ="delereData(${i})" id="delete">delete</button></td>
                </tr>
                `;
            }
        }else{
            
            if(dataProduct[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick ="updateData(${i})" id="update">update</button></td>
                    <td><button onclick ="delereData(${i})" id="delete">delete</button></td>
                </tr>
                `;
            }
        }
    }
    
    document.getElementById('tbody').innerHTML = table;
}