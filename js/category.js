let categoriesEvent = [];
let events =[];

fetch('../data.json')
    .then((response) => response.json())
    .then((json) => {
        events = json.events;
        json.events.forEach(element => {
            if (!categoriesEvent.includes(element.category)) {
                categoriesEvent.push(element.category);
            }
        });
        for (i = 0; i < categoriesEvent.length; i++) {
            addCategories(categoriesEvent[i]);
        }
        categoriesEvent.forEach(addEventListenerToCheckBox) 
    }

    );

function addCategories(category) {
   let categoryId = category.replace(' ', '_')
    const container = document.querySelector("#category-row");
    container.innerHTML +=
        `  <div class="p-2 form-check form-check-inline">
                          <input class="form-check-input" type="checkbox" id=${categoryId} value="option1">
                          <label class="form-check-label" for="inlineCheckbox1">${category}</label>
                      </div>`
}
function addEventListenerToCheckBox(category){
    let categoryId = category.replace(' ', '_')
    let checkBoxFilter = document.querySelector(`input[id=${categoryId}]`)
    checkBoxFilter.addEventListener('change', eventFilter);

}


function eventFilter(){
  let checkedCategories =  categoriesEvent.filter(getFilteredCategories)
  let filteredEvents =  events.filter(event=> checkedCategories.includes(event.category));  
  console.log(filteredEvents)
  const cardSection = document.querySelector("#home-events");
  cardSection.innerHTML =' ';
  filteredEvents.forEach(addEvents);
}
function getFilteredCategories(category){
    let categoryId = category.replace(' ', '_')
   if (document.querySelector(`input[id=${categoryId}]`).checked){
    console.log(category)
    return category;
   }
}

function addEvents(event){
    const cardSection = document.querySelector("#home-events");
      cardSection.innerHTML += 
      ` <div class="col-sm-3 mb-3 mb-sm-0">
      <div class="card text-center">
              <img src=${event.image} class="card-img-top " alt="...">
              <div class="card-body">
                      <h5 class="card-title">${event.name}</h5>
                      <p class="card-text">${event.description}</p>
                      <div class="d-flex justify-content-between ">
                              <div>
                                      Price ${event.price}
                              </div>
                              <a href="details.html?id=${event.id}" class="btn btn-primary">Ver mas...</a>
                      </div>
              </div>
      </div>
 </div>`	
 }