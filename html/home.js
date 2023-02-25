
fetch('../data.json')
    .then((response) => response.json())
    .then((json) => {
        for (i = 0; i < json.events.length; i++) {
            console.log(json.events[i].name);
						addEvents(json.events[i]);
        }
      }
    );


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
