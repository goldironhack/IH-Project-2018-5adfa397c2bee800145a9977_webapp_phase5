const API_KEY = "AIzaSyAmsoNWToucbKC9uArndPzSpqS15bITqTM";
const DISTRICTS_URL = "https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson";
const CENTER_URL = "https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD";
const HOUSING_URL = "https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD";
const CRIMES_URL = "https://data.cityofnewyork.us/resource/9s4h-37hy.json?$where=cmplnt_fr_dt=\"2015-12-31T00:00:00.000\"&$limit=1000";
const MUSEUMS_URL = "https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD";
const GALLERIES_URL = "https://data.cityofnewyork.us/api/views/43hw-uvdj/rows.json?accessType=DOWNLOAD";

var count2=1;
var count=0;
var bronxCount=1;
var brooklynCount=1;
var manhattanCount=1;
var queensCount=1;
var stIslandCount=1;

var disPicker;

var bronxMCount=1;
var brooklynMCount=1;
var manhattanMCount=1;
var queensMCount=1;
var stIslandMCount=1;
var newCount=1;

var bronxGCount=1;
var brooklynGCount=1;
var manhattanGCount=1;
var queensGCount=1;
var stIslandGCount=1;

var bronxCCount=1;
var brooklynCCount=1;
var manhattanCCount=1;
var queensCCount=1;
var stIslandCCount=1;

var verDistricts;

var latCrimes = [];
var longCrimes = [];

var ver;
var verBronx;
var verBrooklyn;
var verManhattan;
var verQueens;
var verStIsland;

var verBronxM;
var verBrooklynM;
var verManhattanM;
var verQueensM;
var verStIslandM;
var verNew;

var verBronxG;
var verBrooklynG;
var verManhattanG;
var verQueensG;
var verStIslandG;

var verBronxC;
var verBrooklynC;
var verManhattanC;
var verQueensC;
var verStIslandC;

var map;

var ny_coordinates = {lat:40.703092,lng:-73.989741};
var u_coordinates = {lat:40.7291,lng:-73.9965};
var u_marker;

var crimeBronx = [];
var crimeBrooklyn = [];
var crimeManhattan = [];
var crimeQueens = [];
var crimeStIsland = [];

var centroides = [];
var housing = [];
var museums = [];
var galleries = [];
var markers = [];
var crimes = [];

var latV=[];
var longV=[];
var latVMuseum=[];
var longVMuseum=[];
var latVGalleries=[];
var longVGalleries=[];
var latVHouses = [];
var longVHouses = [];

var alterable;
var nei_coordinates;
var mark_coordinates;

var bronx = [];
var brooklyn = [];
var manhattan = [];
var queens = [];
var stIsland = [];

var bronxM = [];
var brooklynM = [];
var manhattanM = [];
var queensM = [];
var stIslandM = [];
var newYorkM = [];

var bronxG = [];
var brooklynG = [];
var manhattanG = [];
var queensG = [];
var stIslandG = [];

var bronxC = [];
var brooklynC = [];
var manhattanC = [];
var queensC = [];
var stIslandC = [];

var bronxNei = [];
var brooklynNei = [];
var manhattanNei = [];
var queensNei = [];
var stIslandNei = [];
var museumsBronx = [];
var museumsBrooklyn = []
var museumsManhattan = [];
var museumsQueens = [];
var museumsStIsland = [];
var museumsNewYork = [];

var markerBronx = [];
var markerBrooklyn = [];
var markHoodsBrooklynx;
var markerManhattan = [];
var markHoodsManhattan;
var markerQueens = [];
var markHoodsQueens;
var markerStIsland = [];
var markHoodsStIsland;

var markerBronxM = [];
var markerBrooklynM = [];
var markerManhattanM = [];
var markerQueensM = [];
var markerStIslandM = [];
var markerNewYorkM = [];

var markerBronxH = [];
var markerBrooklynH = [];
var markerManhattanH = [];
var markerQueensH = [];
var markerStIslandH = [];

var housingBronx = [];
var housingBrooklyn = [];
var housingManhattan = [];
var housingQueens = [];
var housingStIsland = [];

var bronxH = [];
var brooklynH = [];
var manhattanH = [];
var queensH = [];
var stIslandH = [];

var heatMaps = [];

function getHousingData() {
  var data = $.get(HOUSING_URL, function(){})
    .done(function () {
      for (var i = 0; i < data.responseJSON.data.length; i++) {
        if(data.responseJSON.data[i][9]!="CONFIDENTIAL"){
          var disAlterable = data.responseJSON.data[i][19];
          disAlterable=disAlterable.slice(3,7);
          housing.push([data.responseJSON.data[i][15],Number(disAlterable),data.responseJSON.data[i][9],data.responseJSON.data[i][14],data.responseJSON.data[i][23],data.responseJSON.data[i][24]]);
        }
      }

      for (var j = 0; j < housing.length; j++) {
        if(housing[j][0]=="Bronx"){
          bronxH.push(j)
          housingBronx.push([housing[j][0],housing[j][1],housing[j][2],housing[j][3]]);
          latVHouses.push(housing[j][4]);
          longVHouses.push(housing[j][5]);
        }else if(housing[j][0]=="Brooklyn"){
          brooklynH.push(j)
          housingBrooklyn.push([housing[j][0],housing[j][1],housing[j][2],housing[j][3]]);
          latVHouses.push(housing[j][4]);
          longVHouses.push(housing[j][5]);
        }else if(housing[j][0]=="Manhattan"){
          manhattanH.push(j)
          housingManhattan.push([housing[j][0],housing[j][1],housing[j][2],housing[j][3]]);
          latVHouses.push(housing[j][4]);
          longVHouses.push(housing[j][5]);
        }else if(housing[j][0]=="Queens"){
          queensH.push(j)
          housingQueens.push([housing[j][0],housing[j][1],housing[j][2],housing[j][3]]);
          latVHouses.push(housing[j][4]);
          longVHouses.push(housing[j][5]);
        }else if(housing[j][0]=="Staten Island"){
          stIslandH.push(j)
          housingStIsland.push([housing[j][0],housing[j][1],housing[j][2],housing[j][3]]);
          latVHouses.push(housing[j][4]);
          longVHouses.push(housing[j][5]);
        }

      }

    })
    .fail(function(error) {
      console.log(error);
    })
}

function tableHousing(){

  tableReference = $("#tableH")[0];
  var newRow, boro, dis, name, street;

  for (var i = 0; i < housingBronx.length; i++) {
    newRow = tableReference.insertRow(tableReference.rows.length);
    boro = newRow.insertCell();
    dis = newRow.insertCell();
    name = newRow.insertCell();
    street = newRow.insertCell();
    boro.innerHTML = "Bronx";
    dis.innerHTML = housingBronx[i][1];
    name.innerHTML = housingBronx[i][2];
    street.innerHTML = housingBronx[i][3];

  }
}

function showHousingBronx() {

    for (var i = 0; i < bronxH.length; i++) {
        var markHouses = new google.maps.Marker({
        position: {lat:Number(latVHouses[bronxH[i]]), lng:Number(longVHouses[bronxH[i]])},
        map: map
        })

        markerBronxH.push(markHouses);
    }

}

function showHousingBrooklyn() {

    for (var i = 0; i < brooklynH.length; i++) {
        var markHouses = new google.maps.Marker({
        position: {lat:Number(latVHouses[brooklynH[i]]), lng:Number(longVHouses[brooklynH[i]])},
        map: map
        })

        markerBrooklynH.push(markHouses);
    }

}

function showHousingManhattan() {

    for (var i = 0; i < manhattanH.length; i++) {
        var markHouses = new google.maps.Marker({
        position: {lat:Number(latVHouses[manhattanH[i]]), lng:Number(longVHouses[manhattanH[i]])},
        map: map
        })

        markerManhattanH.push(markHouses);
    }

}

function showHousingQueens() {

    for (var i = 0; i < queensH.length; i++) {
        var markHouses = new google.maps.Marker({
        position: {lat:Number(latVHouses[queensH[i]]), lng:Number(longVHouses[queensH[i]])},
        map: map
        })

        markerQueensH.push(markHouses);
    }

}

function showHousingStIsland() {

    for (var i = 0; i < stIslandH.length; i++) {
        var markHouses = new google.maps.Marker({
        position: {lat:Number(latVHouses[stIslandH[i]]), lng:Number(longVHouses[stIslandH[i]])},
        map: map
        })

        markerStIslandH.push(markHouses);
    }

}

function getMuseumsData() {
  var data = $.get(MUSEUMS_URL, function(){})
    .done(function () {

      var alterableM;

      for (var i = 0; i < data.responseJSON.data.length; i++) {
        museums.push([data.responseJSON.data[i][9],data.responseJSON.data[i][12],data.responseJSON.data[i][14],data.responseJSON.data[i][10],data.responseJSON.data[i][11],data.responseJSON.data[i][8]]);
      }

      for (var j = 0; j < museums.length; j++) {

        alterableM=museums[j][5];
        latVMuseum[j]=alterableM.toString().slice(alterableM.length-19,alterableM.length-2);

        if (latVMuseum[j].charAt(0)=="0") {
          latVMuseum[j] = 4 + latVMuseum[j];
        }

        longVMuseum[j]=alterableM.toString().substring(7,24);

        if (museums[j][2]=="Bronx") {
          bronxM.push(j);
          museumsBronx.push(museums[j][0],museums[j][1],museums[j][2],museums[j][3],museums[j][4]);
        }else if (museums[j][2]=="Brooklyn") {
          brooklynM.push(j);
          museumsBrooklyn.push(museums[j][0],museums[j][1],museums[j][2],museums[j][3],museums[j][4]);
        }else if (museums[j][2]=="Manhattan") {
          manhattanM.push(j);
          museumsManhattan.push(museums[j][0],museums[j][1],museums[j][2],museums[j][3],museums[j][4]);
        }else if (museums[j][2]=="Queens") {
          queensM.push(j);
          museumsQueens.push(museums[j][0],museums[j][1],museums[j][2],museums[j][3],museums[j][4]);
        }else if (museums[j][2]=="Staten Island") {
          stIslandM.push(j);
          museumsStIsland.push(museums[j][0],museums[j][1],museums[j][2],museums[j][3],museums[j][4]);
        }else if (museums[j][2]=="New York") {
          newYorkM.push(j)
          museumsNewYork.push(museums[j][0],museums[j][1],museums[j][2],museums[j][3],museums[j][4]);
        }

      }

    })

    .fail(function(error){
      console.log(error);
    })

}

function showMBronx() {

  if (verBronxM!=0) {
    for (var i = 0; i < bronxM.length; i++) {
      var markMuseums = new google.maps.Marker({
      position: {lat:Number(latVMuseum[bronxM[i]]), lng:Number(longVMuseum[bronxM[i]])},
      map: map
      })

      markerBronxM.push(markMuseums);
    }

  }
  else if (verBronxM==0) {
    for (var i = 0; i < markerBronxM.length; i++) {
        markerBronxM[i].setMap(null);
      }
    }

    bronxMCount=bronxMCount+1;
    verBronxM=bronxMCount%2;

}

function showMBrooklyn() {

  if (verBrooklynM!=0) {
    for (var i = 0; i < bronxM.length; i++) {
      var markMuseums = new google.maps.Marker({
      position: {lat:Number(latVMuseum[brooklynM[i]]), lng:Number(longVMuseum[brooklynM[i]])},
      map: map
      })

      markerBrooklynM.push(markMuseums);
    }

  }
  else if (verBrooklynM==0) {
    for (var i = 0; i < markerBrooklynM.length; i++) {
        markerBrooklynM[i].setMap(null);
      }
    }

    brooklynMCount=brooklynMCount+1;
    verBrooklynM=brooklynMCount%2;

}

function showMNew() {

  if (verNew!=0) {
    for (var i = 0; i < newYorkM.length; i++) {
      var markMuseums = new google.maps.Marker({
      position: {lat:Number(latVMuseum[newYorkM[i]]), lng:Number(longVMuseum[newYorkM[i]])},
      map: map
      })

      markerNewYorkM.push(markMuseums);
    }

  }
  else if (verNew==0) {
    for (var i = 0; i < markerNewYorkM.length; i++) {
        markerNewYorkM[i].setMap(null);
      }
    }

    newCount=newCount+1;
    verNew=newCount%2;

}

function showMQueens() {

  if (verQueensM!=0) {
    for (var i = 0; i < queensM.length; i++) {
      var markMuseums = new google.maps.Marker({
      position: {lat:Number(latVMuseum[queensM[i]]), lng:Number(longVMuseum[queensM[i]])},
      map: map
      })

      markerQueensM.push(markMuseums);
    }

  }
  else if (verQueensM==0) {
    for (var i = 0; i < markerQueensM.length; i++) {
        markerQueensM[i].setMap(null);
      }
    }

    queensMCount=queensMCount+1;
    verQueensM=queensMCount%2;

}


function showMStIsland() {

  if (verStIslandM!=0) {
    for (var i = 0; i < stIslandM.length; i++) {
      var markMuseums = new google.maps.Marker({
      position: {lat:Number(latVMuseum[stIslandM[i]]), lng:Number(longVMuseum[stIslandM[i]])},
      map: map
      })

      markerStIslandM.push(markMuseums);
    }

  }
  else if (verStIslandM==0) {
    for (var i = 0; i < markerStIslandM.length; i++) {
        markerStIslandM[i].setMap(null);
      }
    }

    stIslandMCount=stIslandMCount+1;
    verStIslandM=stIslandMCount%2;

}




function getGalleriesData() {
  var data = $.get(GALLERIES_URL, function(){})
    .done(function () {
    for (var i = 0; i < data.responseJSON.data.length; i++) {
      galleries.push([data.responseJSON.data[i]]);
    }
    })
}

function getCrimesData() {
  var data = $.get(CRIMES_URL, function(){})
    .done(function () {

      for (var i = 15; i < data.responseJSON.length; i++) {
        crimes.push([data.responseJSON[i]["boro_nm"],data.responseJSON[i]["latitude"],data.responseJSON[i]["longitude"]]);
      }
      for (var j = 0; j < crimes.length; j++) {

        if(crimes[j][0]=="BRONX"){
          crimeBronx.push({location: new google.maps.LatLng(Number(crimes[j][1]), Number(crimes[j][2])), weight: 10000});
       }else if(crimes[j][0]=="BROOKLYN"){
          crimeBrooklyn.push({location: new google.maps.LatLng(Number(crimes[j][1]), Number(crimes[j][2])), weight: 10000});
        }else if (crimes[j][0]=="MANHATTAN") {
          crimeManhattan.push({location: new google.maps.LatLng(Number(crimes[j][1]), Number(crimes[j][2])), weight: 10000});
        }else if (crimes[j][0]=="QUEENS") {
          crimeQueens.push({location: new google.maps.LatLng(Number(crimes[j][1]), Number(crimes[j][2])), weight: 10000});
        }else if (crimes[j][0]=="STATEN ISLAND") {
          crimeStIsland.push({location: new google.maps.LatLng(Number(crimes[j][1]), Number(crimes[j][2])), weight: 10000});
        }
      }

    })
    .fail(function (error){
      console.log(error);
    })


}

function heatmapBronx() {

    // heatMaps[0] = new google.maps.visualization.HeatmapLayer({
    // data: crimeBronx
    //
    // });
    // heatmap[0].setMap(map);

    if (verBronxC!=0) {
      heatMaps[0] = new google.maps.visualization.HeatmapLayer({
      data: crimeBronx

      });
      heatMaps[0].setMap(map);

    }
    else if (verBronxC==0) {
        heatMaps[0].setMap(null);

    }
      bronxCCount=bronxCCount+1;
      verBronxC=bronxCCount%2;

}

function heatmapBrooklyn() {

  if (verBrooklynC!=0) {
    heatMaps[1] = new google.maps.visualization.HeatmapLayer({
    data: crimeBrooklyn

    });
    heatMaps[1].setMap(map);

  }
  else if (verBrooklynC==0) {
      heatMaps[1].setMap(null);

  }
    brooklynCCount=brooklynCCount+1;
    verBrooklynC=brooklynCCount%2;

}

function heatmapManhattan() {

  if (verManhattanC!=0) {
    heatMaps[2] = new google.maps.visualization.HeatmapLayer({
    data: crimeManhattan

    });
    heatMaps[2].setMap(map);

  }
  else if (verManhattanC==0) {
      heatMaps[2].setMap(null);

  }
    manhattanCCount=manhattanCCount+1;
    verManhattanC=manhattanCCount%2;
}

function heatmapQueens() {

  if (verQueensC!=0) {
    heatMaps[3] = new google.maps.visualization.HeatmapLayer({
    data: crimeQueens

    });
    heatMaps[3].setMap(map);

  }
  else if (verQueensC==0) {
      heatMaps[3].setMap(null);

  }
    queensCCount=queensCCount+1;
    verQueensC=queensCCount%2;
}

function heatmapStIsland() {

  if (verStIslandC!=0) {
    heatMaps[4] = new google.maps.visualization.HeatmapLayer({
    data: crimeStIsland

    });
    heatMaps[4].setMap(map);

  }
  else if (verStIslandC==0) {
      heatMaps[4].setMap(null);

  }
    stIslandCCount=stIslandCCount+1;
    verStIslandC=stIslandCCount%2;
}



function getCenterData() {
  var data = $.get(CENTER_URL, function (){})
    .done(function (){
      for(var i=0; i< data.responseJSON.data.length; i++){
        centroides.push([data.responseJSON.data[i][16],data.responseJSON.data[i][10],data.responseJSON.data[i][9]]);
      }

      for (var j = 0; j < data.responseJSON.data.length; j++) {
        alterable=centroides[j][2];
        latV[j]=alterable.toString().slice(alterable.length-19,alterable.length-2);
        if (latV[j].charAt(0)=="0") {
          latV[j] = 4 + latV[j];
        }
        longV[j]=alterable.toString().substring(7,24);
        nei_coordinates="{lat:"+Number(latV)+", lng:"+Number(longV)+"}";
        markers.push(nei_coordinates);

        if (centroides[j][0]=="Bronx") {
          bronx.push(j);
          bronxNei.push(centroides[j][1]);
        }else if (centroides[j][0]=="Brooklyn") {
          brooklyn.push(j);
          brooklynNei.push(centroides[j][1]);
        }else if (centroides[j][0]=="Manhattan") {
          manhattan.push(j);
          manhattanNei.push(centroides[j][1]);
        }else if (centroides[j][0]=="Queens") {
          queens.push(j);
          queensNei.push(centroides[j][1]);
        }else if (centroides[j][0]=="Staten Island") {
          stIsland.push(j);
          stIslandNei.push(centroides[j][1]);
        }

      }

    })
    .fail(function(error){
      console.log(error);
    })
}

function coloresRandom(){
  var color = ["#023fa5", "#7d87b9", "#bec1d4", "#d6bcc0", "#bb7784", "#8e063b", "#4a6fe3", "#8595e1", "#b5bbe3", "#e6afb9", "#e07b91", "#d33f6a", "#11c638", "#8dd593", "#c6dec7", "#ead3c6", "#f0b98d", "#ef9708", "#0fcfc0"];
  return color[Math.floor(Math.random()*color.length)];
}
function uMarker(){

  if (ver!=0) {
      u_marker = new google.maps.Marker({
      position: u_coordinates,
      map: map,
      icon : "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
    });

  }
  else if (ver==0) {
      u_marker.setMap(null);

  }
    count2=count2+1;
    ver=count2%2;

}

function districts() {

  if (verDistricts!=0) {
    map.data.loadGeoJson(DISTRICTS_URL);
    map.data.setStyle(function(feature) {
      var color = coloresRandom();
      return {
        fillColor: color,
        strokeWeight: 1
      };
    });

  }
  else if (verDistricts==0) {
    map.data.setStyle({visible: false});
  }

  count=count+1;
  verDistricts=count%2;

}

/*function markerEvents(marker) {
  if(marker!="undefined"){
    marker.addListener("click",function () {
      getRoute();
    });
  }
}

function getRoute() {
  var request = {
    origin: ny_marker.position,
    destination: bro_marker.position,
    travelMode: 'DRIVING'
  }
  directionsRenderer.setMap(map);
  directionsService.route(request, function(result,status){
    if(status=="OK"){
      directionsRenderer.setDirections(result);
    }
  })
}*/

function showNeiBronx() {

  if (verBronx!=0) {
    for (var i = 0; i < bronx.length; i++) {
      var markHoods = new google.maps.Marker({
      position: {lat:Number(latV[bronx[i]]), lng:Number(longV[bronx[i]])},
      map: map
      })
      markerBronx.push(markHoods);
    }

  }
  else if (verBronx==0) {
    for (var i = 0; i < markerBronx.length; i++) {
        markerBronx[i].setMap(null);
      }
    }

    bronxCount=bronxCount+1;
    verBronx=bronxCount%2;
}

function showNeiBrooklyn() {

  if (verBrooklyn!=0) {
    for (var i = 0; i < brooklyn.length; i++) {
      var markHoods = new google.maps.Marker({
      position: {lat:Number(latV[brooklyn[i]]), lng:Number(longV[brooklyn[i]])},
      map: map
      })
      markerBrooklyn.push(markHoods);
    }

  }
  else if (verBrooklyn==0) {
    for (var i = 0; i < markerBrooklyn.length; i++) {
        markerBrooklyn[i].setMap(null);
      }
    }

    brooklynCount=brooklynCount+1;
    verBrooklyn=brooklynCount%2;

}

function showNeiManhattan() {

  if (verManhattan!=0) {
    for (var i = 0; i < manhattan.length; i++) {
      var markHoods = new google.maps.Marker({
      position: {lat:Number(latV[manhattan[i]]), lng:Number(longV[manhattan[i]])},
      map: map
      })
      markerManhattan.push(markHoods);
    }

  }
  else if (verManhattan==0) {
    for (var i = 0; i < markerManhattan.length; i++) {
        markerManhattan[i].setMap(null);
      }
    }

    manhattanCount=manhattanCount+1;
    verManhattan=manhattanCount%2;

}

function showNeiQueens() {

  if (verQueens!=0) {
    for (var i = 0; i < queens.length; i++) {
      var markHoods = new google.maps.Marker({
      position: {lat:Number(latV[queens[i]]), lng:Number(longV[queens[i]])},
      map: map
      })
      markerQueens.push(markHoods);
    }

  }
  else if (verQueens==0) {
    for (var i = 0; i < markerQueens.length; i++) {
        markerQueens[i].setMap(null);
      }
    }

    queensCount=queensCount+1;
    verQueens=queensCount%2;

}

function showNeiStIsland() {

  if (verStIsland!=0) {
    for (var i = 0; i < stIsland.length; i++) {
      var markHoods = new google.maps.Marker({
      position: {lat:Number(latV[stIsland[i]]), lng:Number(longV[stIsland[i]])},
      map: map
      })
      markerStIsland.push(markHoods);
    }

  }
  else if (verStIsland==0) {
    for (var i = 0; i < markerStIsland.length; i++) {
        markerStIsland[i].setMap(null);
      }
    }

    stIslandCount=stIslandCount+1;
    verStIsland=stIslandCount%2;

}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10.7,
    center: u_coordinates
  });

  getCenterData();
  getHousingData();
  getCrimesData();
  getMuseumsData();
  getGalleriesData();

}

$("document").ready(function(){
  $("#showU").on("click",uMarker)
  $("#showDistricts").on("click",districts)
  $("#getNeiBronx").on("click",showNeiBronx)
  $("#getNeiBrooklyn").on("click",showNeiBrooklyn)
  $("#getNeiManhattan").on("click",showNeiManhattan)
  $("#getNeiQueens").on("click",showNeiQueens)
  $("#getNeiStIsland").on("click",showNeiStIsland)
  $("#showMuseumsBronx").on("click",showMBronx)
  $("#showMuseumsBrooklyn").on("click",showMBrooklyn)
  $("#showMuseumsManhattan").on("click",showMNew)
  $("#showMuseumsQueens").on("click",showMQueens)
  $("#showMuseumsSt").on("click",showMStIsland)
  $("#bronxHouses").on("click",tableHousing)
  $("#bthbronx").on("click",showHousingBronx)
  $("#bthbrooklyn").on("click",showHousingBrooklyn)
  $("#bthmanhattan").on("click",showHousingManhattan)
  $("#bthqueens").on("click",showHousingQueens)
  $("#bthstisland").on("click",showHousingStIsland)
  $("#cbronx").on("click",heatmapBronx)
  $("#cbrooklyn").on("click",heatmapBrooklyn)
  $("#cmanhattan").on("click",heatmapManhattan)
  $("#cqueens").on("click",heatmapQueens)
  $("#cst").on("click",heatmapStIsland)
  $('.dropdown-trigger').dropdown()
});
