

const searchBtn = document.getElementById('search-btn');


searchBtn.addEventListener('click', ()=>{
    const mealName = document.getElementById('input-box').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMeal(data.meals))
})


const displayMeal = meals =>{
    console.log({meals});
    const mealInfo = meals.map(meal =>{
        console.log({meal})
        const {strMeal, strMealThumb, idMeal} = meal;
        console.log( strMealThumb, idMeal, strMeal);
        const mealDiv = document.createElement('div');
        mealDiv.className = 'single-meal'
        const mealContent = `
        <img src="${strMealThumb}">
        <h2>${strMeal}</h2>
        `;
        mealDiv.innerHTML = mealContent;
        document.getElementById('meal-section').appendChild(mealDiv);
        mealDiv.addEventListener('click', ()=>{
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
            .then(res => res.json())
            .then(data => {
                mealDetail(data.meals);
            })
        })
    })
}


const mealDetail = detail =>{
    console.log('details', detail[0]);
    const preview = document.getElementById('preview-section');
    const {strMeal,strMealThumb,strMeasure1,strMeasure2,strMeasure3,strMeasure4,strMeasure5,strMeasure6,strIngredient1,strIngredient2,strIngredient3,strIngredient4,strIngredient5,strIngredient6} = detail[0];
    preview.innerHTML = `
    <img src=${strMealThumb}>
    <h2>${strMeal}</h2>
    <h4>Ingredient</h4>
    <ul>
    <li> <i class="fa fa-check-square" aria-hidden="true"></i>  ${strIngredient1} ${strMeasure1}</li>
    <li> <i class="fa fa-check-square" aria-hidden="true"></i>   ${strIngredient2} ${strMeasure2}</li>
    <li> <i class="fa fa-check-square" aria-hidden="true"></i>   ${strIngredient3} ${strMeasure3}</li>
    <li> <i class="fa fa-check-square" aria-hidden="true"></i>   ${strIngredient4} ${strMeasure4}</li>
    <li> <i class="fa fa-check-square" aria-hidden="true"></i>   ${strIngredient5} ${strMeasure5}</li>
    <li> <i class="fa fa-check-square" aria-hidden="true"></i>   ${strIngredient6} ${strMeasure6}</li>
    </ul>
    `;


    
}