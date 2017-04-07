$(function(){
  var data = [];
  var counter = 0;  
  $.ajax({
    url: "realData", 
    error: function(data){
      console.log('BUSTED AJAX', data); 
    }, 
    success: function(result){
     data = result;  
    }
  }); 
      $('#snapshot').on('click', function(){
        if (counter < 1){
          $(".D3SnapshotScatterPlotChart").append('<div id="scatterChart"></div>'); 
                      //margin
                var margin = {top: 80, bottom: 150, right:10, left: 40}; 
                var width = 700 - margin.right - margin.left,
                        height = 500 - margin.top - margin.bottom; 

                         data.forEach(function(d){
                            d.PPG = +d.PPG; 
                            d.points = +d.points;
                            d.reb = +d.reb; 
                            d.ast = +d.ast; 
                            d.stl = +d.stl; 
                            if (d.name === 'Timothe Luwawu-Cabarrot') d.name = 'T. Luwawu-Cabarrot'; 
                        })

                                var svg1 = d3.select("#scatterChart").append('svg')
                                    .attr('id', 'scatterPlotChartSVG')
                                    .attr('viewBox', "0 0 " + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom + 20)  )
                                    .attr('perserveAspectRatio', "xMinYMid")
                                    .attr('width', width + margin.left + margin.right )
                                    .attr('height', height + margin.top + margin.bottom + 20)
                                    .append('g')
                                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')' )
                                    .attr('width', width)
                                    .attr('height', height); 

                                    // var g1 = svg1.append("g")
                                    //     .attr("transform", "translate(35, 35)"); 

                                
                                    // var xAxisG = g1.append('g')
                                    //     .attr("transform", "translate(0, " + innerHeight + ")"); 
                                    //making sure data points that must be numbers are converted to numbers; 
                                    // function type(d){
                                    //     d.x = +d.x;
                                    //     d.y = +d.y; 
                                    //     return d; 

                                    // }
                                    var xScale = d3.scaleLinear().range([0, width]); 
                                    var yScale = d3.scaleLinear().range([height, 0]); 
                                          var tooltip = d3.select('body')
                                                .append('div')
                                                .attr('class', 'reportingTooltip')
                                                .attr('id', 'redTT'); 

                                            tooltip.append('div')
                                                .attr('class', 'name'); 
                                            tooltip.append('div')
                                                .attr('class', 'position'); 
                                            tooltip.append('div')
                                                .attr('class', 'ppg'); 
                                            tooltip.append('div')
                                                .attr('class', 'assists'); 
                                            tooltip.append('div')
                                                .attr('class', 'percent'); 
                                            tooltip.append('div')
                                                .attr('class', 'steals'); 
                                  
                                                var maxReb = d3.max(data, function(d){return d.ast;}); 
                                                var maxAst = d3.max(data, function(d){return d.reb;});
                                                console.log("MR", maxReb, "MA", maxAst); 

                                            xScale.domain([0, d3.max(data, function(d){return d.ast;})]); 
                                            yScale.domain([0, d3.max(data, function(d){return d.reb;})]); 
                                            // var yRange = d3.extent(data, function(d){return d.reb;})
                                            // console.log("YR", yRange); 
                                            var colorScale = d3.scaleOrdinal(d3.schemeCategory10); 
                                            //Bind data
                                            var circles = svg1.selectAll('circle')
                                                .data(data)
                                                .enter()
                                                    .append("circle")
                                                    .attr('cx', function(d){
                                                        return xScale(d.ast); })
                                                    .attr('cy', function(d, i){
                                                        return yScale(d.reb); }) 
                                                    .attr('stroke', 'white')
                                                    .attr('r',1)
                                                     .attr('fill', 'white')
                                                    //     var stealsMax = d3.max(data, function(d){return d.stl;}); 
                                                    //     return d3.interpolateReds(d.stl/stealsMax); })
                                                    .attr('class', 'testClass'); 

                                                circles
                                                    .transition()
                                                      .duration(3000)
                                                      .delay(function(d,i){return i * 550})
                                                      .attr('fill', function(d){
                                                        var stealsMax = d3.max(data, function(d){return d.stl;}); 
                                                        return d3.interpolateReds(d.stl/stealsMax); })
                                                      .attr('stroke', 'black')
                                                      // .attr('stroke', function(d){
                                                      //   var stealsMax = d3.max(data, function(d){return d.stl;}); 
                                                      //   return d3.interpolateReds(d.stl/stealsMax); })
                                                      .attr("r",  function(d){
                                                        var pointsMax = d3.max(data, function(d){return d.PPG;});
                                                        return (d.PPG/pointsMax) * 30; 
                                                    });




                                           

                                                       circles.on('mouseover', function(d){
                                                            var total = d3.sum(data.map(function(d){
                                                                return (d.enabled) ? d.PPG : 0; // FOR ANIMATION PURPOSES; 
                                                            }))
                                                            var percent = Math.round(100 * d.PPG /total);   //just time 100?
                                                            tooltip.select('.name').html(d.name);
                                                            tooltip.select('.position').html(d.position); 
                                                            tooltip.select('.ppg').html("PPG: " + d.PPG); //toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').slice(0, - 3)); 
                                                            tooltip.select('.assists').html("Assists: " + d.ast); //toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').slice(0, - 3)); 
                                                            tooltip.select('.percent').html("Rebounds: " + d.reb);
                                                            tooltip.select('.steals').html("Steals: " + d.stl);
                                                            // tooltip.style('display', 'block')
                                                            tooltip.style('opacity', 1);  //for fade in/out effect using display makes immediate pop in/out of view
                                                            // .classed("my-selector", true);
                                                        }); 
                                                          circles.on('mousemove', function(d){
                                                            tooltip
                                                            .style('top',  event.pageY + 25 + 'px')  // .style('top', (d3.event.pageY - 50) + 'px')
                                                            .style('left',  event.pageX + 'px')
                                                            .style('opacity', 1) //.style('left',  (d3.event.pageX - 780) + 'px')

                                                        })
                                                             circles.on('mouseout', function(d){
                                                                    // tooltip.style('display', 'none')
                                                                    tooltip.style('opacity', 0); 
                                                                })


                                            // var xMin = d3.min(data, function(d){return d.x;}); 
                                            // var xMax = d3.max(data, function(d){return d.x;}); 
                                            // var extent = d3.extent(data, function(d){return d.x;}); 
                                            // console.log("XMIN", xMin, 'XMAX', xMax); 

                                            // g1.call(d3.axisBottom(xScale)); 
                                        

                                // render(testD3Arr2.slice(0, testD3Arr2.length/3)); 
                                // setTimeout(function(){render(testD3Arr2.slice(0, Math.floor(testD3Arr2.length * .66))); }, 2000); 
                                // setTimeout(function(){render(testD3Arr2); }, 4000); 
                        


                                // //Add the X axis
                                // svg1.append("g")
                                //     .attr("transform", "translate(0, " + (maxHeight - 40) + ")")
                                //     .attr('class', 'axis1')
                                //     .call(d3.axisBottom(xScale)); 

                             svg1.append("text")             
                                .attr("transform", "translate(" + (innerWidth/2) + " ," +  (innerHeight + 195) + ")")
                                .style("text-anchor", "middle")
                                .text("Days Since Last In-Store Purchase");
                                

                                //       // Add the Y Axis
                                // svg1.append("g")
                                //     .attr("transform", "translate(20, 60)")
                                //     .attr('class', 'axis1')
                                //     .call(d3.axisLeft(yScale));

                                  // Add the X Axis
                              svg1.append("g")
                                  .attr("transform", "translate(0," + (height) + ")")
                                  .call(d3.axisBottom(xScale))
                                  .selectAll('text')
                                  .attr('transform', "rotate(-60)")
                                  .attr('dx', "-.8em")
                                  .attr('dy', '.5em')
                                  .style('text-anchor', "end")
                                  .style('font-size', '1.3em'); 
                                  // .attr("transform", "translate(0," + 20 + ")")

                              // Add the Y Axis
                              svg1.append("g")
                                .call(d3.axisLeft(yScale));

                             svg1.append("text")             
                            .attr("transform", "translate(" + (width/2) + " ," +  (margin.top/1.5 + height) + ")")
                            .style("text-anchor", "middle")
                            .text("Assists");

                              svg1.append("text")
                                .attr("transform", "rotate(-90)")
                                  .attr("y", 0 - margin.left * 1.1)
                                  .attr("x",0 - (height / 2))
                                  .attr("dy", "1em")
                                  .style("text-anchor", "middle")
                                  .text("Rebounds"); 

                        //COLOR LEGEND!

                        var linear = d3.scaleLinear()
                          .domain([0,d3.max(data, function(d){return d.stl;})])
                          .range(["rgb(253,213,196)", "rgb(103,0,13)"]);

                        

                        svg1.append("g")
                          .attr("class", "legendLinear")
                          .attr("transform", "translate(20," + (margin.top + height) +  ")");

                        var legendLinear = d3.legendColor()
                          .shapeWidth(30)
                          .title('Color Gradient by Steals')
                          .orient('horizontal')
                          .scale(linear);

                        svg1.select(".legendLinear")
                          .call(legendLinear);


                        //SIZE LEGEND!
                        var linearSize = d3.scaleLinear().domain([0,d3.max(data, function(d){return d.PPG;})]).range([10,30])//.range([10, 30]);

                            svg1.append("g")
                            .attr("class", "legendSize")
                            .attr("transform", "translate(" + (width * .6) + "," + (margin.top + height) +  ")");

                            var legendSize = d3.legendSize()
                            .scale(linearSize)
                            .title('Size Gradient by PPG')
                            .shape('circle')
                            .shapePadding(15)
                            .labelOffset(20)
                            .orient('horizontal');

                            svg1.select(".legendSize")
                            .call(legendSize);
         

                              //making d3 responsive
                                var chart = $("#scatterPlotChartSVG"),
                                aspect = chart.width() / chart.height(),
                                container = chart.parent();
                                var windowCounter = 0; 
                            $(window).on("resize", function() {
                              if (windowCounter > 0){
                                var targetWidth = container.width();
                                chart.attr("width", targetWidth *.85);
                                chart.attr("height", Math.round(targetWidth / aspect));
                              }; 
                              windowCounter++; 
                            }).trigger("resize");
                counter++; 
            }
          })

}); 



