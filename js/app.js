const searchBtn = document.getElementById('search-btn');
const preview = document.getElementById('preview-section');

//search event handler
searchBtn.addEventListener('click', () => {
    const mealName = document.getElementById('input-box').value;
    document.getElementById('meal-section').innerHTML = '';
    preview.innerHTML = '';
    document.getElementById('not-found').innerHTML = '';
    if (mealName) {
        document.getElementById('preview-section').innerHTML = '';
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayMeal(data, mealName))
    }
    else {
        const notFound = document.getElementById('not-found');
        preview.innerHTML = '';
        notFound.innerHTML = `<h2>You have entered empty search </h2> `;
        
    }

})


//display meal info
const displayMeal = (data, mealName) => {
    const meals = data.meals;
    if (meals) {
        const mealInfo = meals.map(meal => {
            const { strMeal, strMealThumb, idMeal } = meal;
            console.log(strMealThumb, idMeal, strMeal);
            const mealDiv = document.createElement('div');
            mealDiv.className = 'single-meal'
            const mealContent = `
            <img src="${strMealThumb}">
            <h2>${strMeal}</h2>`;
            mealDiv.innerHTML = mealContent;
            document.getElementById('meal-section').appendChild(mealDiv);
            
            mealDiv.addEventListener('click', () => {
                fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
                    .then(res => res.json())
                    .then(data => {
                        mealDetail(data, mealName);
                    })
            })
        })
    }

    else {
        const notFound = document.getElementById('not-found');
        preview.innerHTML = '';
        notFound.innerHTML = `<h2>Your entire meal name <span id="miss-match">${mealName}</span> not found! Please try another meal.</h2> `;
        
    }
    document.getElementById('input-box').value = '';
}


//meal preview
const mealDetail = (detail) => {
    const meal = detail.meals[0];
    // const preview = document.getElementById('preview-section');
    preview.style.display = 'block';
    const { strMeal, strMealThumb } = meal;
    preview.innerHTML = `
    <img src=${strMealThumb}>
    <h2>${strMeal}</h2>
    <h4>Ingredient</h4>`;

    for (let i = 1; meal[`strIngredient${i}`]; i++) {
        const ingredient = ` <i class="fa fa-check-square" aria-hidden="true"></i> ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}`;
        const ul = document.createElement('ul');
        ul.innerHTML = `<li>${ingredient}</li>`;
        preview.appendChild(ul);
    }
}