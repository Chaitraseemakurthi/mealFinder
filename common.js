let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let searchResults = document.getElementById("searchResults");

async function searchMeals() {
    let searchValue = searchInput.value.trim();
    document.getElementById("searchMeal").style.display = "block";

    if (searchValue === "") {
        searchResults.innerHTML = "<p>Please enter a meal name.</p>";
     
    }

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchValue)}`);

    let data = await response.json();

    if (!data.meals) {
        searchResults.innerHTML = "<p>No meals found!</p>";
        
    }

    let result = data.meals.map(item => {
        return `
            
            <div class="search-card"
                 onclick="showMealDetails('${item.idMeal}')">
                <img src="${item.strMealThumb}" alt="${item.strMeal}" width="200px" height="150px">
                <p>${item.strCountry}</p>
                <h4>${item.strMeal}</h4>
            </div>
        `;
    }).join("");

    searchResults.innerHTML = result;
}

searchBtn.addEventListener("click", searchMeals);

searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchMeals();
    }
});

function showMealDetails(id) {
    window.location.href = `mealdetails.html?id=${encodeURIComponent(id)}`;
}
// function showMenu(){
//        document.getElementById("menuDetails").innerHTML =`<p>chaitra</p>`
// }

  let menu = document.getElementById("menu");
let close = document.getElementById("close");
let categoryMenu = document.getElementById("categoryMenu");
let categoryList = document.getElementById("categoryList");

menu.addEventListener("click", async function () {
    categoryMenu.style.display = "block";
    menu.style.visibility = "hidden";

    if (categoryList.innerHTML === "") {
        let response = await fetch(
            "https://www.themealdb.com/api/json/v1/1/categories.php"
        );

        let data = await response.json();

        categoryList.innerHTML = data.categories.map(item => {
            return `<p onclick="showMeals('${item.strCategory}')">
                        ${item.strCategory}
                    </p>`;
        }).join("");
    }
});

close.addEventListener("click", function () {
    categoryMenu.style.display = "none";
    menu.style.visibility = "visible";
});

function showMeals(category) {
    window.location.href =
        `meals.html?category=${encodeURIComponent(category)}`;
}
