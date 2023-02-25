fetch('../data.json')
    .then((response) => response.json())
    .then((json) => {
        const result = json.events.filter(event=> checkDate(event.date, json.currentDate));
        for (i = 0; i < result.length; i++) {
            console.log(result[i].name);
			addEvents(result[i]);
        }
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