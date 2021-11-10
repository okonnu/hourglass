document.addEventListener('contextmenu', event => event.preventDefault());

left_l = 'l6'
right_l = 'l5'
queue1 = []
queue2 = []
target = 300

var myChart1 = new Chart(document.getElementById('mychart1'), {
    type: 'doughnut',
    data: {
        labels: ["Efficiency", ""],
        datasets: [{
            label: 'Efficiency',
            data: ["20", "80"],
            backgroundColor: [
                "#a2d6c4",
                "transparent"
            ]
        }]
    },
    options: {
        responsive: true,
        legend: false,
        animation: {
            duration: 500
        }
    }
});



initcolo = perc2color(10)
var myChart2 = new Chart(document.getElementById('mychart2'), {
    type: 'doughnut',
    data: {
        labels: ["Efficiency", ""],
        datasets: [{
            label: 'Visitor',
            data: ["50", "50"],
            backgroundColor: [
                initcolo,
                "transparent"
            ]
        }]
    },
    options: {
        responsive: true,
        legend: false,
        animation: {
            duration: 500
        }
    }
});


function addData1(data) {
    data = Math.round(data)
    colo = perc2color(data)
    alt = 100 - data
    if (alt < 1) { alt = 0 }
    myChart1.data.datasets.forEach((dataset) => {
        dataset.data[0] = data;
        dataset.data[1] = alt;
        dataset.backgroundColor[0] = colo
    });
    document.getElementById('efficiency1').innerHTML = data + '%'
    myChart1.update(0);
}

function addData2(data) {
    data = Math.round(data)
    colo = perc2color(data)
    alt = 100 - data
    if (alt < 1) { alt = 0 }
    myChart2.data.datasets.forEach((dataset) => {
        dataset.data[0] = data;
        dataset.data[1] = alt;
        dataset.backgroundColor[0] = colo
    });
    document.getElementById('efficiency2').innerHTML = data + '%'
    myChart2.update(0);
}

function openmodal() {
    $('#passwordmodal').modal('show')
}

//get hourly cases


// setInterval(function() {
//     // // get hourly cases
//     // $.get("hourly", function(data, status) {
//     //     alert("Data: " + data + "\nStatus: " + status);
//     // });

//     //get target

// }, 1000 * 60 * 15);

// setInterval(function() {
//     var data1 = (Math.floor((Math.random() * 100) + 1));
//     var data2 = (Math.floor((Math.random() * 100) + 1));
//     addData1(data1)
//     addData2(data2)

// }, 500);

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('actv').click()
});

function updatetarget() {
    const tgt = document.getElementById('ftarget').value
    document.getElementById('rangee').innerHTML = tgt
}

$('#submit').click(function() {

    const fclient_id = document.getElementById("fclient_id").value;
    const fteam = document.getElementById("fteam").value;
    const fcanspercase = document.getElementById("fcanspercase").value;
    const ftarget = document.getElementById("ftarget").value;

    eel.set_pyconfigs(fclient_id, fteam, fcanspercase, ftarget)
        // alert('settings saved successfully')
    document.getElementById('actv').click()
});

function perc2color(perc) {
    perc = perc / 1.5
    var r, g, b = 0;
    if (perc < 50) {
        r = 255;
        g = Math.round(5.1 * perc);
    } else {
        g = 255;
        r = Math.round(510 - 5.10 * perc);
    }
    var h = r * 0x10000 + g * 0x100 + b * 0x1;
    return '#' + ('000000' + h.toString(16)).slice(-6);
}

function arr_avg(arr) {
    const total = arr.reduce((acc, c) => acc + parseInt(c), 0)
    return total / arr.length
}

function jsqueue(num, arr) {
    if (arr.length > 2) {
        arr.shift()
        arr.push(num)
    } else {
        arr.push(num)
    }
    const avg = arr_avg(arr)
    return avg
}

// retrieve settings from python, and save on js
eel.expose(set_jsconfigs);

function set_jsconfigs(client_id, team, canspercase, target, shift) {
    // client title
    document.getElementById('client_id').innerHTML = client_id.replace(/^\D+/g, '');
    //team
    document.getElementById("team").innerHTML = team
        //shift
    document.getElementById("shift").innerHTML = shift

}


eel.expose(set_metrics);

function set_metrics(pload) {
    str = pload.substring(2);
    str = str.slice(0, -1);
    payload = JSON.parse(str)

    //  {"clientID":"L1","cans":"0","packs":"0","lcases":"0","cases":"0","lspeed":"0","tstamp":"13917942","targetcases":"240","canspercase":"24","unitspercase":"1","hr_output":"0,0,0,0,0,0,0,0,0"}
    if (payload.clientID == left_l) {
        // cans
        document.getElementById("cans1").innerHTML = payload.cans
            // speed
        document.getElementById("speed1").innerHTML = payload.lspeed
            // efficiency
        eff = (jsqueue(payload.lspeed, queue1) * 60 / target) * 100
        addData1(eff)



    }
    if (payload.clientID == right_l) {
        document.getElementById("cans2").innerHTML = payload.cans
            // speed
        document.getElementById("speed2").innerHTML = payload.lspeed
            // efficiency
        eff = (jsqueue(payload.lspeed, queue2) * 60 / target) * 100
        addData2(eff)

    }
    //seamed cans
    // document.getElementById("s_cans").innerHTML = s_cans

    // //seamed cases 
    // document.getElementById("s_cases").innerHTML = s_cases

    // //damaged cans
    // document.getElementById("damages").innerHTML = damages

    // //downtime
    // document.getElementById("downtime").innerHTML = downtime

}