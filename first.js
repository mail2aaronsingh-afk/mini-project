
// Load saved data
let employees = JSON.parse(
    localStorage.getItem("employees")) || [];

let products = JSON.parse(
    localStorage.getItem("products")) || [];

let sales = JSON.parse(
    localStorage.getItem("sales")) || [];

let purchases = JSON.parse(
    localStorage.getItem("purchases")) || [];


// Save data
function saveData() {
    localStorage.setItem("employees",
        JSON.stringify(employees));

    localStorage.setItem("products",
        JSON.stringify(products));

    localStorage.setItem("sales",
        JSON.stringify(sales));

    localStorage.setItem("purchases",
        JSON.stringify(purchases));

    updateDashboard();
}


// Navigation
function showSection(id) {
    document.querySelectorAll(".section")
        .forEach(section => {
            section.classList.add("hidden");
        });

    document.getElementById(id)
        .classList.remove("hidden");
}


// Add Employee
function addEmployee() {
    let name = document.getElementById("empName").value.trim();
    let role = document.getElementById("empRole").value.trim();

    if (name === "" || role === "") {
        alert("Please enter employee details");
        return;
    }

    employees.push({
        name: name,
        role: role
    });

    document.getElementById("empName").value = "";
    document.getElementById("empRole").value = "";

    saveData();
    renderEmployees();
}


// Display Employees
function renderEmployees() {
    let list = document.getElementById("employeeList");
    let search = document.getElementById("empSearch")
        .value.toLowerCase();

    list.innerHTML = "";

    employees.forEach((emp, index) => {
        if (
            emp.name.toLowerCase().includes(search) ||
            emp.role.toLowerCase().includes(search)
        ) {
            list.innerHTML += `
                <tr>
                    <td>${escapeHTML(emp.name)}</td>
                    <td>${escapeHTML(emp.role)}</td>
                    <td>
                        <button onclick="deleteEmployee(${index})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        }
    });
}


// Delete Employee
function deleteEmployee(index) {
    employees.splice(index, 1);
    saveData();
    renderEmployees();
}


// Add Product
function addProduct() {
    let name = document.getElementById("productName").value.trim();
    let qty = Number(document.getElementById("productQty").value);

    if (name === "" || !Number.isInteger(qty) || qty <= 0) {
        alert("Enter a valid product and quantity");
        return;
    }

    products.push({
        name: name,
        qty: qty
    });

    document.getElementById("productName").value = "";
    document.getElementById("productQty").value = "";

    saveData();
    renderProducts();
}


// Display Products
function renderProducts() {
    let list = document.getElementById("productList");
    let search = document.getElementById("productSearch")
        .value.toLowerCase();

    list.innerHTML = "";

    products.forEach((product, index) => {
        if (product.name.toLowerCase().includes(search)) {
            list.innerHTML += `
                <tr>
                    <td>${escapeHTML(product.name)}</td>
                    <td>${product.qty}</td>
                    <td>
                        <button onclick="deleteProduct(${index})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        }
    });
}


// Delete Product
function deleteProduct(index) {
    products.splice(index, 1);
    saveData();
    renderProducts();
}


// Add Sale
function addSale() {
    let amount = Number(
        document.getElementById("saleAmount").value
    );

    if (!Number.isFinite(amount) || amount <= 0) {
        alert("Enter a valid sales amount");
        return;
    }

    sales.push(amount);

    document.getElementById("saleAmount").value = "";

    saveData();
    updateSales();
}


// Update Sales
function updateSales() {
    let total = sales.reduce((sum, amount) => sum + amount, 0);

    document.getElementById("salesTotal").innerText =
        total.toLocaleString("en-IN");

    document.getElementById("salesCount").innerText =
        "₹" + total.toLocaleString("en-IN");
}


// Add Purchase
function addPurchase() {
    let name = document.getElementById("purchaseName").value.trim();
    let qty = Number(document.getElementById("purchaseQty").value);

    if (name === "" || !Number.isInteger(qty) || qty <= 0) {
        alert("Enter valid purchase details");
        return;
    }

    purchases.push({
        name: name,
        qty: qty
    });

    document.getElementById("purchaseName").value = "";
    document.getElementById("purchaseQty").value = "";

    saveData();
    renderPurchases();
}


// Display Purchases
function renderPurchases() {
    let list = document.getElementById("purchaseList");
    list.innerHTML = "";

    purchases.forEach((item, index) => {
        list.innerHTML += `
            <li>
                ${escapeHTML(item.name)} -
                Quantity: ${item.qty}
                <button onclick="deletePurchase(${index})">
                    Delete
                </button>
            </li>
        `;
    });
}


// Delete Purchase
function deletePurchase(index) {
    purchases.splice(index, 1);
    saveData();
    renderPurchases();
}


// Prevent HTML injection in user-entered text
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}


// Dashboard Statistics
function updateDashboard() {
    document.getElementById("employeeCount").innerText =
        employees.length;

    document.getElementById("productCount").innerText =
        products.length;

    document.getElementById("purchaseCount").innerText =
        purchases.length;

    updateSales();
}


// Initial Loading
renderEmployees();
renderProducts();
renderPurchases();
updateDashboard();
