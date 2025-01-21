const endpoint = "https://dummyjson.com/products "
const linkContainer = document.querySelector("#links")
const cardsContainer = document.querySelector("#cardsContainer")
const toggleIcon = document.querySelector("#mode-toggle-icon");
const body = document.body;

const links = [
    { id: 0, title: "Home" },
    { id: 1, title: "Contact" },
    { id: 2, title: "About" },
    { id: 3, title: "Services" },
]
links.forEach((link) => {
    linkContainer.innerHTML += `<a href = "#">${link.title}</a>`
})

const xhr = new XMLHttpRequest()
xhr.open("GET", endpoint)
xhr.send()

xhr.onreadystatechange = (e) => {
    if (xhr.readyState === 4) {
        const data = JSON.parse(xhr.response)
        data.products.forEach((product) => {
            cardsContainer.innerHTML += `
                <div class="card">
                <img src="${product.thumbnail}"/>
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <p>Price: $${product.price}</p>
                </div>
            `;
        });
    }
}
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    toggleIcon.textContent = "🌙";
}


toggleIcon.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
        toggleIcon.textContent = "🌙";
        localStorage.setItem("theme", "dark");
    } else {
        toggleIcon.textContent = "🌞";
        localStorage.setItem("theme", "light");
    }
});