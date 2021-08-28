document.getElementById("error-msg").style.display="none";
const searchFood = async () => {
    const searchInput = document.getElementById("search-input");
    const searchInputValue = searchInput.value;
    if(searchInputValue!=""){
        /* const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.value}`;
        const res = await fetch(url);
        const data = await res.json();
        searchResult(data.meals) */
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.value}`).then(res => res.json()).then(data => searchResult(data.meals))
        .catch(error => errorMsg(error))
        searchInput.value = '';
        const mealDetailsId = document.getElementById("meal-details");
        mealDetailsId.textContent="";
        document.getElementById("error-msg").style.display="none";
    }else if(searchInputValue==''){
        const error = document.getElementById("error-msg")
        error.innerText="No result found";
        error.style.display="block";
        const searchResultId = document.getElementById("search-result");
        searchResultId.innerHTML="";

    }
}
const errorMsg = error => {
    document.getElementById("error-msg").style.display="block";
}
const searchResult = meals => {
        console.log(meals)
        // console.log(meals.length)
    const searchResultId = document.getElementById("search-result");
    searchResultId.textContent="";
    // if(meals.length == 0){
    //     searchResultId.innerHTML=`<p>no result can found</p>`
    // }
    meals.forEach(meal => {
        const colDiv = document.createElement('div');
        colDiv.classList.add("col");
        colDiv.innerHTML = `
        <div class="card h-100 rounded-3 p-3 shadow-sm" onclick="mealDetails(${meal.idMeal})" >
        <img src="${meal.strMealThumb}" class="card-img-top rounded-3 shadow" alt="...">
            <div class="card-body">
                <h3 class="card-title text-center text-warning">${meal.strMeal}</h3>
                <p class="card-text">${meal.strInstructions.slice(0,100)}...</p>
            </div>
        </div>
        `;
        searchResultId.appendChild(colDiv)
    });
}
const mealDetails = (mealId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url).then(res => res.json()).then(data => displayMealDetail(data.meals[0]))
}

const displayMealDetail = (mealDetail) => {
    const mealDetailsId = document.getElementById("meal-details");
    mealDetailsId.textContent="";
    const cardDiv = document.createElement('div');
    cardDiv.classList.add("card");
    cardDiv.innerHTML = `
        <div class="row g-0 shadow-sm">
    <div class="col-md-4 p-3">
       <img src="${mealDetail.strMealThumb}" class="rounded-start shadow" alt="food" width="100%" height="100%">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h3 class="card-title text-warning">${mealDetail.strMeal}</h3>
        <p class="card-text">${mealDetail.strInstructions}</p>
        <a href="${mealDetail.strYoutube}" class="btn btn-warning text-white" target="_blank">Go to Youtube</a>
      </div>
    </div>
  </div>
        `;
    mealDetailsId.appendChild(cardDiv);
}