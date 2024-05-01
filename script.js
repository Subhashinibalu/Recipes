//getting html elements
const userInput = document.getElementsByClassName("searchbar")[0];
const searchButton = document.getElementsByClassName("searchbutton")[0];
const dish = document.getElementsByClassName("dish")[0];
const ingredient = document.getElementsByClassName("ingredient")[0];
const recipe = document.getElementsByClassName("recipe")[0];

//what need to be done when the button is clicked is wrriten as code
searchButton.addEventListener("click", () => {
  const food = userInput.value; //input value is stored in variable food
  if (food === null || food === "") // checking whether value is entered or not
   {
    alert("enter dish name");
  } else {
    let dishapi = fetch(
      `https://api.spoonacular.com/recipes/search?apiKey=978a432f2dfa4ebc8060ea03d124f933&number=1&query=${food}`
    ); // fetching api data
    dishapi
      .then((result) => result.json())
      .then((data) => {
        if (data.results.length === 0) //if there is no result for the search alert will appear
        {
          alert("No such dish found");
        }
        dish.innerHTML = "";
        //displaying image, dish name , cooking time are displayed in the dish div
        dish.innerHTML = `
        <div class="card text-bg-dark ">
  <img src="${
    data.baseUri + data.results[0].image
  }" class="card-img-top ms-auto me-auto mt-2  " style="width:95%; height:100%;" alt="${
          data.results[0].title
        }">
  <div class="card-body  ">
  
 <h3 class="fw-bolder">${data.results[0].title}</h3>
  <p><b>Serving:</b> ${data.results[0].servings} people</p>
  <p><b>Ready in:</b> ${data.results[0].readyInMinutes} minutes</p>
  
  <p class="card-text ms-5"><small >"Learn! Cook! Eat! Happy Cooking🍜"</small></p>

  </div>
</div>
        `;
        //  this new api is fetched using the id value from foodapi data
        let newapi = fetch(
          `https://api.spoonacular.com/recipes/${data.results[0].id}/information?apiKey=978a432f2dfa4ebc8060ea03d124f933&number=1&query=${food}`
        );

        newapi
          .then((result1) => result1.json())
          .then((data1) => {
            

            //displaying the ingredient list
            ingredient.innerHTML = "";
            for (let i = 0; i < data1.extendedIngredients.length; i++) {
              ingredient.innerHTML += `
                <ul class="ms-5 fw-bolder ">
                <li>${data1.extendedIngredients[i].original}</li>
                </ul>`;
            }
            //displaying the cooking instruction
            recipe.innerHTML = "";
            recipe.innerHTML = `<h6 class="fw-bolder mt-3 ms-5">${data1.instructions}</h6>`;
          });
      }).catch((error)=>{
        alert(`${error}`);
      });
  }
});
