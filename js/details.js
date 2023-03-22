fetch("https://mh.up.railway.app/api/amazing-events")
    .then((response) => response.json())
    .then((json) => { 
        const params = new URLSearchParams(window.location.search);
       let id =  params.get('id');
        const result = json.events.filter(event=> event.id == id);
        for (i = 0; i < result.length; i++) {
            console.log(result[i].name);
			addEvents(result[i]);
        }
      }
    );
function addEvents(event){
   const cardSection = document.querySelector("#details-row");
	 cardSection.innerHTML += 
	 `  <div class="col-md-6">
     <img src=${event.image} class="p-2 w-100 img-fluid " alt="...">
 </div>
 <div class="col-md-6">
     <div class="card-body">
         <h5 class="card-title">${event.name}</h5>
         <p class="card-text">Date:${event.date}</p>
         <p class="card-text">Description:${event.description}</p>
         <p class="card-text">Category:${event.category}</p>
         <p class="card-text">Place:${event.place}</p>
         <p class="card-text">Capacity:${event.capacity}</p>
         <p class="card-text">Assistance:${event.assistance}</p>
         <p class="card-text">Price:${event.price}</p>
     </div>
 </div>`	
}

