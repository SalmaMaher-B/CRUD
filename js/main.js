var nameInput = document.getElementById('f-name');
var priceInput = document.getElementById('f-price');
var typeInput = document.getElementById('f-type');
var descInput = document.getElementById('f-desc');
var addBtn = document.getElementById('btn-submit');
var updateBtn = document.getElementById('updateBtn');
var cancelBtn = document.getElementById('btn-cancel');
var elementsContainer = document.getElementById('card-grid');
var counter = document.getElementById('count-chip-counter');
var searchInput = document.getElementById('search');
var nameAlert  = document.getElementById('name-alert');
var priceAlert = document.getElementById('price-alert');
var typeAlert  = document.getElementById('type-alert');
var descAlert  = document.getElementById('desc-alert');
var nameRegex=/^[A-Za-z0-9 ]+$/;
var typeRegex=/^(Tablet|Watch|Screen|Mobile)+$/;
var priceRegex=/^([1-9][0-9]{3}|10000)$/;
var descRegex=/^(?!\s*$).{3,500}$/;
var currentIndex = null; 
var productList = [];
if (localStorage.getItem("products")) {
    productList = JSON.parse(localStorage.getItem("products"));
}
display();
function addItem(){
    if (validate(nameInput, nameRegex, nameAlert) && 
         validate(priceInput, priceRegex, priceAlert) && 
         validate(typeInput, typeRegex, typeAlert) && 
         validate(descInput, descRegex, descAlert)) {
            Swal.fire({
                title: "Are you sure?",
                text: "You want to add!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, add it!"
        }).then((result) => {
              if (result.isConfirmed) {
                var product={
                name : nameInput.value,
                price : priceInput.value,
                type : typeInput.value,
                desc : descInput.value,
            };
            productList.push(product);
            nameInput.classList.add('is-valid');
            priceInput.classList.add('is-valid');
            typeInput.classList.add('is-valid');
            descInput.classList.add('is-valid');
            nameInput.classList.remove('is-invalid');
            priceInput.classList.remove('is-invalid');
            typeInput.classList.remove('is-invalid');
            descInput.classList.remove('is-invalid');
            display();
            localStorage.setItem("products", JSON.stringify(productList));

            clearForm();
            Swal.fire({
                 title: "Added Successfully!",
                 text: "Your product is now in the list.",
                 icon: "success",
                 confirmButtonColor: "#6f42c1"
            });
        }});
    }else{
        // nameInput.classList.remove('is-valid');
        // priceInput.classList.remove('is-valid');
        // typeInput.classList.remove('is-valid');
        // descInput.classList.remove('is-valid');
        // nameInput.classList.add('is-invalid');
        // priceInput.classList.add('is-invalid');
        // typeInput.classList.add('is-invalid');
        // descInput.classList.add('is-invalid');
    }

}
function display(){
    var box="";
    for(var i=0;i<productList.length;i++){
        box+= `
             <div class="item-card">
             <div class="card-name d-flex gap-2"><span class="fw-bold">Name:</span> ${productList[i].name}</div>
               <span class="card-type d-flex gap-"><span class="fw-bold">Type:</span> ${productList[i].type}</span>
               <div class="card-price d-flex gap-2"><span class="fw-bold">Price:</span> $${productList[i].price}</div>
               <div class="card-desc d-flex gap-2"><span class="fw-bold">Description:</span> ${productList[i].desc}</div>
               <div class="card-actions">
                 <button class="act-btn act-edit" onclick="startEdit(${i})">Edit</button>
                 <button class="act-btn act-del" onclick="startDelete(${i})">Delete</button>
              </div>
            </div>`
            ;
    };
    if(productList.length>0){
     counter.innerHTML = productList.length;
    }else{
        counter.innerHTML= "0";
    }
    elementsContainer.innerHTML = box;
}
function startEdit(index){
    currentIndex=index;
    updateBtn.classList.remove('d-none');
    addBtn.classList.add('d-none');
    nameInput.value = productList[currentIndex].name;
    priceInput.value = productList[currentIndex].price;
    typeInput.value =productList[currentIndex].type ;
    descInput.value = productList[currentIndex].desc;    
}
function cancelation(){
    nameInput.value = "";
    priceInput.value = "";
    typeInput.value = "";
    descInput.value = "";
    addBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');
    nameInput.classList.remove('is-invalid');
    priceInput.classList.remove('is-invalid');
    typeInput.classList.remove('is-invalid');
    descInput.classList.remove('is-invalid');
}
function clearForm() {
  nameInput.value = "";
  priceInput.value = "";
  typeInput.value = "";
  descInput.value = "";
}
function update(){
     Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to update this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!"
    }).then((result) => {
        if (result.isConfirmed) {
            productList[currentIndex].type = typeInput.value;
            productList[currentIndex].name  = nameInput.value;
            productList[currentIndex].price = priceInput.value;
            productList[currentIndex].desc = descInput.value;
            console.log('hiiiiiiii');
            localStorage.setItem("products", JSON.stringify(productList));
            display();
            clearForm();
            addBtn.classList.remove('d-none');
            updateBtn.classList.add('d-none');
            Swal.fire({
                title: "updated!",
                text: "Your item has been updated.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
        }});

}
function startDelete(index){
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            currentIndex=index;
            productList.splice(index,1);
            display();
            localStorage.setItem("products", JSON.stringify(productList));
            Swal.fire({
                title: "Deleted!",
                text: "Your item has been deleted.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
        }});
    };

function searchFn(){
    var box="";
    console.log(searchInput.value);
    for(var i = 0 ;i<productList.length;i++){
        var txti=productList[i].name;
        var desci=productList[i].desc;
        var pricei=productList[i].price;
        var typei=productList[i].type;
        if(txti.toLowerCase().includes(searchInput.value.toLowerCase())||typei.toLowerCase().includes(searchInput.value.toLowerCase())||pricei.toString().includes(searchInput.value.toLowerCase())||desci.toLowerCase().includes(searchInput.value.toLowerCase())){
            box+= `
             <div class="item-card">
             <div class="card-name d-flex gap-2"><span class="fw-bold">Name:</span> ${productList[i].name}</div>
               <span class="card-type d-flex gap-"><span class="fw-bold">Type:</span> ${productList[i].type}</span>
               <div class="card-price d-flex gap-2"><span class="fw-bold">Price:</span> $${productList[i].price}</div>
               <div class="card-desc d-flex gap-2"><span class="fw-bold">Description:</span> ${productList[i].desc}</div>
               <div class="card-actions">
                 <button class="act-btn act-edit" onclick="startEdit(${i})">Edit</button>
                 <button class="act-btn act-del" onclick="startDelete(${i})">Delete</button>
              </div>
            </div>`
        }
    }
    elementsContainer.innerHTML = box;
}
function validate(element, regex, alertDiv) {
    if (regex.test(element.value)) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        alertDiv.classList.add('d-none');
        return true;
    } else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        alertDiv.classList.remove('d-none');
        return false;
    }
}