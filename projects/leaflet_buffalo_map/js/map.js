// import { createReadStream } from '../node_modules/fs';
// import { parse } from '../node_modules/papaparse';

// const file = createReadStream('data/modified_buffalo_assessment_2020-2021.csv');
// var count = 0; // cache the running count
// parse(file, {
//     worker: true, // Don't bog down the main thread if its a big file
//     step: function(result) {
//         // do stuff with result
//     },
//     complete: function(results, file) {
//         console.log('parsing complete read', count, 'records.'); 
//     }
// });

var map = L.map('map', {
    preferCanvas: true,
    zoomSnap: 0.5
}).setView([42.9016, -78.8448], 12.5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// var radius = 20;
// L.circleMarker(e.latlng, radius)
//   .addTo(map).bindPopup("You are within " + radius + " meters from this point").openPopup();;

// var Circle = L.circle(array[0][1], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 1.0,
//     radius: 5
// }).addTo(map)

// Circle.bindPopup('A pretty CSS3 popup.<br> Easily customizable.');




function getColor(d) {
    
    const colors = ['#762a83','#9970ab','#c2a5cf','#e7d4e8','#d9f0d3','#a6dba0','#5aae61','#1b7837'];
    return d > 200000   ? colors[7] :
           d > 176666   ? colors[6] :
           d > 143333   ? colors[5] :
           d > 110000   ? colors[4] :
           d > 76666    ? colors[3] :
           d > 43333    ? colors[2] :
           d > 10000    ? colors[1] :
                          colors[0];
} 


for(i = 0; i < array.length; i++) {
    var Circle = L.circle(array[i][1], {
        color: getColor(array[i][2]),
        // fillColor: '#f03',
        fillOpacity: .75,
        radius: 4
    }).addTo(map)


    // Create our number formatter.
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    
        // These options are needed to round to whole numbers if that's what you want.
        minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
  

    Circle.bindPopup('<b>'+array[i][0]+'</b> ('+array[i][3]+')<br>'+'Sold for: <b>'+formatter.format(array[i][2])+'</b> in <b>'+array[i][4]+'</b><br>');

}


