let categoriesEvent = [];
let events =[];
let currentDate = '';


function searchCategory(){
	input = document.getElementById('searchBar');
	filter = input.value.toUpperCase();

	let filteredCategories =  categoriesEvent.filter(category => category.toUpperCase() == filter)
	let filteredEvents =  events.filter(event=> filteredCategories.includes(event.category)); 
	const cardSection = document.querySelector("#upcoming-events-row");
	cardSection.innerHTML =' ';
	filteredEvents.forEach(addEvents);
	if( filteredEvents.length == 0){
	  showError()
	}
	
  }
  function showError(){
	const cardSection = document.querySelector("#upcoming-events-row");
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


fetch('https://mh.up.railway.app/api/amazing-events')
    .then((response) => response.json())
    .then((json) => {
		currentDate =json.currentDate;
        const result = json.events.filter(event=> checkDate(event.date, json.currentDate));
        for (i = 0; i < result.length; i++) {
            console.log(result[i].name);
			addEvents(result[i]);
        }
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


	function addEvents(event){
		const cardSection = document.querySelector("#upcoming-events-row");
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
	 
	 function checkDate(eventDate, currentDate){
		 var g1 = new Date(currentDate);
		 var g2 = new Date(eventDate);
		 return g2 > g1;
	 }
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
		filteredEvents = filteredEvents.filter(event => checkDate(event.date, currentDate))
		console.log(filteredEvents)
		const cardSection = document.querySelector("#upcoming-events-row");
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



