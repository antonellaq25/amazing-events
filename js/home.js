let categoriesEvent = [];
let events =[];



function searchCategory(){
  input = document.getElementById('searchBar');
  filter = input.value.toUpperCase();

  let filteredCategories =  categoriesEvent.filter(category => category.toUpperCase() == filter)
  console.log(filteredCategories)
  let filteredEvents =  events.filter(event=> filteredCategories.includes(event.category)); 
  debugger 
  console.log(filteredEvents)
  const cardSection = document.querySelector("#home-events");
  cardSection.innerHTML =' ';
  filteredEvents.forEach(addEvents);
  if( filteredEvents.length == 0){
    showError()
  }
  
}
function showError(){
  const cardSection = document.querySelector("#home-events");
    cardSection.innerHTML += 
    ` <div class="col-sm-3 mb-3 mb-sm-0">
    <div class="card text-center">
            <img src="/img/not-found.avif" class="card-img-top " alt="...">
            <div class="card-body">
                    <h5 class="card-title">Category not found</h5>
                    <p class="card-text">Please try again</p>
            </div>
    </div>
</div>`	
}

fetch('../data.json')
    .then((response) => response.json())
    .then((json) => { 
     
        for (i = 0; i < json.events.length; i++) {
            
				addEvents(json.events[i]);
        }
		//this filters categories to later add the checkboxs
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
        document.getElementById("btn-search").addEventListener('click', searchCategory)
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

 