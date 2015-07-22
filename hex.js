
var svg = d3.selectAll("svg");

var m = 32; // m and n should always be even here
var n = 16;
var len = 12;

var upcolor = "white"
var downcolor = "#999999"

 var highthresh = 6;
 var lowthresh = 2;
//var thresh = 3;

var data = [];

svg.attr("width", (m + 2) * 2 * len)
   .attr("height", (n + 2) * 2 * len);

for (var i = 0; i < m; i++) {
  for (var j = 0; j < n; j++){
    data.push({"i": i, "j": j});
  }
}

var circles = svg.selectAll(".circle")
  .data(data, function(d){ return d.i + m * d.j;})
.enter().append("circle")
  .attr("class", "circle")
  .attr("r", function(d){ return 10;})
  //.attr("active", false)
  .attr("id", function(d){ return d.i + m * d.j;})
  .attr("i", function(d){ return d.i;})
  .attr("j", function(d){ return d.j;})
  .attr("transform", function(d){ return "translate(" + [len +  len * (2 * d.i +
      (1 + Math.pow(-1, 1 + d.j)) / 2), len + len * d.j * Math.sqrt(3)] + ")";})
  .style("fill", downcolor);

var change = function (d) {
  var item = d3.select(this);

  if (item.classed("active")) {
    item.classed("active", false).style("fill", downcolor);
  } else {
    item.classed("active", true).style("fill", upcolor);
  }

}

circles.on("mouseover", change);

$(document).ready(function() { setInterval(update, 800);});

var step = function (d) {
  var neigh = neighbors(d.__data__["i"], d.__data__["j"]);
  var count = 0;

  neigh.forEach(
    function(d) {
      if (d3.select($("#" + (d.i + m * d.j))[0]).classed("active")) {
        count++;
      };
    }
  );

  if (((d3.select(d).classed("active")) && count < highthresh && lowthresh < count) || ((!d3.select(d).classed("active")) && lowthresh < count)) {
    return true;
  } else {
    return false;
  }

};

var update = function () {
    olddata = d3.selectAll(".circle")[0];

    var newdata = [];
    olddata.forEach(function (d) {return newdata.push(
      {"id": d.id,"value":step(d)}
    );});
    //console.log(newdata)
    newdata.forEach(function(d, i){

      if (d.value) {
        d3.select($("#" + d.id)[0]).classed("active", true).style("fill", upcolor);
      } else {
        d3.select($("#" + d.id)[0]).classed("active", false).style("fill", downcolor);
      }

    });

};


var neighbors = function (i, j) {
  if (i === 0 && j === 0){
    var neigh = [];

    neigh.push({"i": 0, "j": 1})
    neigh.push({"i": 1, "j": 0})

    neigh.push({"i": m-1,"j": 1})
    neigh.push({"i": m-1, "j": 0})
    neigh.push({"i": 1, "j": n-1})
    neigh.push({"i": 0, "j": n-1})

    return neigh;

  } else if (i === m-1 && j === 0){
    var neigh = [];

    neigh.push({"i": m-2, "j": 0})
    neigh.push({"i": m-2, "j": 1})
    neigh.push({"i": m-1, "j": 1})

    neigh.push({"i": 0, "j": 0})
    neigh.push({"i": m-1, "j": n-1})
    neigh.push({"i": m-2, "j": n-1})

    return neigh;
  } else if (i === 0 && j === n-1){
    var neigh = [];

    neigh.push({"i": 1, "j": n-1})
    neigh.push({"i": 1, "j": n-2})
    neigh.push({"i": 0, "j": n-2})

    neigh.push({"i": 0, "j": 0})
    neigh.push({"i": 1, "j": 0})
    neigh.push({"i": m-1, "j": n-1})

    return neigh;
  } else if (i === m-1 && j === n-1){
    var neigh = [];

    neigh.push({"i": m-2, "j": n-1})
    neigh.push({"i": m-1, "j": n-2})

    neigh.push({"i": 0, "j": n-1})
    neigh.push({"i": m-1, "j": 0})
    neigh.push({"i": 0, "j": n-2})
    neigh.push({"i": 0, "j": 0})

    return neigh;

  } else if (i === 0){

    if (j % 2 === 0) {
      var neigh = [];

      neigh.push({"i": m-1, "j": j})
      neigh.push({"i": m-1, "j": j+1})
      neigh.push({"i": m-1, "j": j-1})

      neigh.push({"i": 0, "j": j})
      neigh.push({"i": 0, "j": j-1})
      neigh.push({"i": 0, "j": j+1})

      return neigh;
    } else{
      var neigh = [];

      neigh.push({"i": m-1, "j": j})

      neigh.push({"i": i, "j": j+1})
      neigh.push({"i": i, "j": j-1})
      neigh.push({"i": i+1, "j": j})
      neigh.push({"i": i+1, "j": j+1})
      neigh.push({"i": i+1, "j": j-1})

      return neigh;
    }

  } else if (j === 0) {
    var neigh = [];

    neigh.push({"i": i-1, "j": n-1})
    neigh.push({"i": i, "j": n-1})

    neigh.push({"i": i-1, "j": j})
    neigh.push({"i": i+1, "j": j})
    neigh.push({"i": i, "j": j+1})
    neigh.push({"i": i-1, "j": j+1})

    return neigh;
  } else if (i === m-1){
    if (j % 2 === 0){
      var neigh = [];

      neigh.push({"i": 0, "j": j})

      neigh.push({"i": i, "j": j-1})
      neigh.push({"i": i, "j": j+1})
      neigh.push({"i": i-1, "j": j+1})
      neigh.push({"i": i-1, "j": j})
      neigh.push({"i": i-1, "j": j-1})

      return neigh;
    } else {
      var neigh = [];

      neigh.push({"i": 0, "j": j+1})
      neigh.push({"i": 0, "j": j})
      neigh.push({"i": 0, "j": j-1})

      neigh.push({"i": i, "j": j+1})
      neigh.push({"i": i-1, "j": j})
      neigh.push({"i": i, "j": j-1})

      return neigh;
    }

  } else if (j === n-1){
    var neigh = [];

    neigh.push({"i": i, "j": 0})
    neigh.push({"i": i+1, "j": 0})

    neigh.push({"i": i-1, "j": j})
    neigh.push({"i": i+1, "j": j})
    neigh.push({"i": i, "j": j-1})
    neigh.push({"i": i+1, "j": j-1})

    return neigh;

  } else if (j % 2 === 1){
    var neigh = [];

    neigh.push({"i": i-1, "j": j})
    neigh.push({"i": i+1, "j": j})

    neigh.push({"i": i+1, "j": j+1})
    neigh.push({"i": i+1, "j": j-1})

    neigh.push({"i": i, "j": j-1})
    neigh.push({"i": i, "j": j+1})

    return neigh;
  } else {
    var neigh = [];

    neigh.push({"i": i+1, "j": j})
    neigh.push({"i": i-1, "j": j})

    neigh.push({"i": i-1, "j": j+1})
    neigh.push({"i": i-1, "j": j-1})

    neigh.push({"i": i, "j": j-1})
    neigh.push({"i": i, "j": j+1})

    return neigh;
  }


}
