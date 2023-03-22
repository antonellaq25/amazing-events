let categoriesEvent = []


fetch('https://mh.up.railway.app/api/amazing-events')
    .then((response) => response.json())
    .then((json) => {
        json.events.forEach(element => {

            if (!categoriesEvent.includes(element.category)) {
                categoriesEvent.push(element.category);
            }
        })


        let resultOfLargerCap = getEventWithLargerCapacity(json.events)
        let resultsOfHighestAtt = getEventWithHighestAttendance(json.events)
        let resultsOfLowestAtt = getEventWithLowestAttendance(json.events)

        addNumbers(resultsOfHighestAtt, resultsOfLowestAtt, resultOfLargerCap)
        getUpcomingEventsStats(categoriesEvent, json.events, json.currentDate)
        getPastEventsStats(categoriesEvent, json.events, json.currentDate)

    })



function getEventWithLargerCapacity(events) {
    let eventWithLargerCapacity = {}

    events.forEach(event => {

        if (eventWithLargerCapacity.capacity == undefined) {
            eventWithLargerCapacity = event
        } else if (event.capacity > eventWithLargerCapacity.capacity) {
            eventWithLargerCapacity = event
        }

    });
    return eventWithLargerCapacity
}

function getEventWithHighestAttendance(events) {
    let eventWithHighestAttendance = {}

    events.forEach(event => {

        if (eventWithHighestAttendance.assistance == undefined) {
            eventWithHighestAttendance = event
        } else {
            let percentageOfAtt1 = (eventWithHighestAttendance.assistance || eventWithHighestAttendance.estimate) * 100 / eventWithHighestAttendance.capacity
            let percentageOfAtt2 = (event.assistance || event.estimate) * 100 / eventWithHighestAttendance.capacity

            if (percentageOfAtt1 < percentageOfAtt2) {
                eventWithHighestAttendance = event
            }
        }

    });
    return eventWithHighestAttendance
}

function getEventWithLowestAttendance(events) {
    let eventWithLowesttAttendance = {}

    events.forEach(event => {

        if (eventWithLowesttAttendance.assistance == undefined) {
            eventWithLowesttAttendance = event
        } else {
            let percentageOfAtt1 = (eventWithLowesttAttendance.assistance || eventWithLowesttAttendance.estimate) * 100 / eventWithLowesttAttendance.capacity
            let percentageOfAtt2 = (event.assistance || event.estimate) * 100 / eventWithLowesttAttendance.capacity

            if (percentageOfAtt1 > percentageOfAtt2) {
                eventWithLowesttAttendance = event
            }
        }

    });
    return eventWithLowesttAttendance
}

function addNumbers(highest, lowest, larger) {
    const container = document.querySelector("#body-events-stats");
    container.innerHTML +=
        `<td>${highest.name}</td>
                 <td>${lowest.name}</td>
                 <td>${larger.name}</td>`
}

function getUpcomingEventsStats(categories, events, currentDate) {
    let upcomingEventStats = []
    categories.forEach(category => {
        let categoryName = category
        let categoryRevenue = 0
        let categoryPercentage = 0
        let attendance = 0
        let capacity = 0

        events.forEach(event => {
            if (category === event.category && checkDate(event.date, currentDate, 'upcoming')) {
                categoryRevenue += event.price * event.assistance
                attendance += event.assistance || event.estimate
                capacity += event.capacity
            }
        })
        categoryPercentage = attendance * 100 / capacity

        upcomingEventStats.push({ categoryName: categoryName, categoryRevenue: categoryRevenue, categoryPercentage: categoryPercentage })

    }

    )
    addStatsToTable(upcomingEventStats, "#upcoming-events-stats")
}
function checkDate(eventDate, currentDate, type) {

    var g1 = new Date(currentDate);
    var g2 = new Date(eventDate);
    if (type == 'upcoming') {
        return g2 < g1;
    } else { return g1 > g2; }


}
function addStatsToTable(EventStats, tableID) {
    const container = document.querySelector(tableID);
    EventStats.forEach(event => {
        container.innerHTML +=
            ` <tr>
        <td>${event.categoryName}</td>
        <td>${event.categoryRevenue}</td>
        <td>${Math.round(event.categoryPercentage)}</td>
    </tr>`
    })
}
function getPastEventsStats(categories, events, currentDate) {
    let pastEventStats = []
    categories.forEach(category => {
        let categoryName = category
        let categoryRevenue = 0
        let categoryPercentage = 0
        let attendance = 0
        let capacity = 0

        events.forEach(event => {

            if (category === event.category && checkDate(event.date, currentDate, 'past')) {
                categoryRevenue += event.price * event.assistance || event.estimate
                attendance += event.assistance || event.estimate
                capacity += event.capacity
            }
            if (category == 'Food') {
                console.log({ categoryName: categoryName, categoryRevenue: categoryRevenue, capacity: capacity, attendance: attendance, event: event.name })
            }

        })

        categoryPercentage = attendance * 100 / capacity

        pastEventStats.push({ categoryName: categoryName, categoryRevenue: categoryRevenue, categoryPercentage: categoryPercentage })

    }

    )
    console.log(pastEventStats)
    addStatsToTable(pastEventStats, "#past-events-stats")
}