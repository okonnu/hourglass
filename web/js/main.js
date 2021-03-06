document.addEventListener('contextmenu', event => event.preventDefault());

const validate = (max, el) => {

    if (el.value > max) {
        el.value = max;
    }
}
breakinterval = 0
let msg = 'no message'
    // text to speech
    eel.expose(texttospeech);
function texttospeech (sentence) {
    console.log('speaking...')
    let speech = new SpeechSynthesisUtterance();
    let voices = speechSynthesis.getVoices();
    speech.voice = voices.find(({ lang }) => lang == "en-US");;
    speech.text = sentence == null ? document.getElementById("heading").value : sentence
    speechSynthesis.speak(speech);
    const found = voices.find(({ lang }) => lang == "en-US");

    console.log(found)
}


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

initcolo = perc2color(10)
const myChart1 = new Chart(document.getElementById('mychart1'), {
    type: 'doughnut',
    data: {
        labels: ["", ""],
        datasets: [{
            label: '',
            data: ["1", "99"],
            backgroundColor: [
                initcolo,
                "transparent"
            ]
        }]
    },
    options: {
        responsive: false,
        plugins: {
            legend: {
                display: false,
            }
        },
        tooltips: {
            enabled: false
        },
        animation: {
            duration: 500
        }
    }
});


function addData1(data) {
    console.log(data)
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
    myChart1.update(0);
}


const countdown = (secs) => {
    if (isNaN(secs) || secs < 1) return
    let interval = Math.round(secs / 3)
    const initTime = secs
    let incr = 0

    var x = setInterval(function() {
        // Time calculations for days, hours, minutes and seconds
        let hours = Math.floor(secs / 3600)
        let minutes = Math.floor(secs % 3600 / 60)
        let seconds = Math.floor(secs % 60)

        // collect time
        hourrs.value = hours
        minns.value = minutes
        seccs.value = seconds
        addData1((secs / initTime) * 100)



        // If the count down is over, write some text 
        if (secs < 1) {
            eel.txttospeech("Time has expired.");
            location.reload();
        }
     

        // If the count down is over, write some text 
        if (incr == interval) {
            incr = 0
            msg = "You have"
            if (hours > 0) msg = msg + hours + ' hours, '
            if (minutes > 0) msg = msg + minutes + ' minutes, '
            msg = msg + secs + ' seconds remaining to complete' + document.getElementById("heading").value
            eel.txttospeech(msg)
        }


        secs = secs - 1
        incr = incr + 1

    }, 1000);
}



const startcount = () => {
    const hours = isNaN(hourrs.value) ? 0 : hourrs.value
    const mins = isNaN(minns.value) ? 0 : minns.value
    const sekunde = isNaN(seccs.value) ? 0 : seccs.value
    tymeInSec = hours * 3600 + mins * 60 + sekunde
    if (tymeInSec > 0) {
        stopp.style.display = 'block';
        start.style.display = 'none';
        countdown(tymeInSec)
    } else{
        eel.txttospeech("specify duration in seconds, minutes and hours, then click begin")
    }
    
}

const stopcount = () => {
    stopp.style.display = 'none';
    start.style.display = 'block';
    eel.txttospeech("Congratulations on finishing " + document.getElementById("heading").value);
    location.reload();
}


document.addEventListener("DOMContentLoaded", function() {});