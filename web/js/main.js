document.addEventListener('contextmenu', event => event.preventDefault());

const left_l = 'L4'
const right_l = 'L3'
let queue1 = []
let queue2 = []
const target_l = 400
const target_r = 400
let hourly_l = ''
let hourly_r = ''
initcolo = perc2color(10)
var myChart1 = new Chart(document.getElementById('mychart1'), {
    type: 'doughnut',
    data: {
        labels: ["Efficiency", ""],
        datasets: [{
            label: 'Efficiency',
            data: ["1", "99"],
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

var myChart2 = new Chart(document.getElementById('mychart2'), {
    type: 'doughnut',
    data: {
        labels: ["Efficiency", ""],
        datasets: [{
            label: 'Visitor',
            data: ["1", "99"],
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

function toObject(map) {
    let obj = Object.create(null);
    for (let [key, value] of map.entries()) {
        obj[key] = value;
    }
    return obj;
}

function addData1(data) {
    data = Math.round(data)
    data > 100 ? data : 100
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
    data > 100 ? data : 100
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

eel.expose(hcases_left);

function hcases_left(data) {
    if (JSON.parse(data)) {
        data = JSON.parse(data)
        data = data.data
        data = (data.reduce((data, b) => data.set(b.hr, (data.get(b.hr) || 0) + Number(b.cases)), new Map))
        data = Array.from(data, ([name, value]) => ({ name, value }));
        const sumcases = sumarray(data)
        assigndata(data, 'l')
        document.getElementById("cases1").innerHTML = sumcases
    } else {
        return 0;
    }
}

eel.expose(hcases_right);

function hcases_right(data) {
    if (JSON.parse(data)) {
        data = JSON.parse(data)
        data = data.data
        data = (data.reduce((data, b) => data.set(b.hr, (data.get(b.hr) || 0) + Number(b.cases)), new Map))
        data = Array.from(data, ([name, value]) => ({ name, value }));
        const sumcases = sumarray(data)
        assigndata(data, 'r')
        document.getElementById("cases2").innerHTML = sumcases
    } else {
        return 0;
    }
}
//launch hourly cases
eel.get_hcases(left_l, right_l)

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
    target = document.getElementById("ftarget").value;
    // eel.set_pyconfigs(fclient_id, fteam, fcanspercase, ftarget)
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
    if (arr.length > 5) {
        arr.shift()
        arr.push(num)
    } else {
        arr.push(num)
    }
    const avg = arr_avg(arr)
    return avg
}

function summap(ob) {
    let sum = 0;
    for (let key in ob) {
        sum += ob[key];
    }
    return sum
}

function sumarray(object) {
    total = 0
    for (const items of object) {
        total += items.value
    }
    return total
}

function assigndata(object, pos) {
    for (const [index, item] of object.entries()) {
        console.log(index)
        let x = 0
        if (pos === 'r') {
            x = 21 + index
        } else {
            x = 11 + index
        }
        x = 'hour' + x
        console.log(x)
        document.getElementById(x).innerHTML = item.value
    }
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

        //client id
        document.getElementById("client_left").innerHTML = payload.clientID
            // cans
        document.getElementById("cans1").innerHTML = payload.cans
            // speed
        document.getElementById("speed1").innerHTML = payload.lspeed
            // efficiency
        speed = jsqueue(payload.lspeed, queue1)
        eff = (speed / target_l) * 100
        addData1(eff)
        document.getElementById("target2").innerHTML = target_l

    }
    if (payload.clientID == right_l) {

        const speed = jsqueue(payload.lspeed, queue2)
        eff = (speed / target_r) * 100
        addData2(eff)
        document.getElementById("cans2").innerHTML = payload.cans
            // speed
        document.getElementById("speed2").innerHTML = speed
        document.getElementById("target2").innerHTML = target_r
            //client id
        document.getElementById("client_right").innerHTML = payload.clientID

    }

}