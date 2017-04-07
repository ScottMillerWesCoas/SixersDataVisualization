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
     console.log(data);  
    }
  }); 

         $('#totalPoints').on('click', function(){
          if (counter < 1){
             
           $(".D3PointsBarChart").append('<div  id="barChart"></div>'); 
            
            data.forEach(function(d){
                d.PPG = +d.PPG; 
                d.points = +d.points 
                 if (d.name === 'Timothe Luwawu-Cabarrot') d.name = 'T. Luwawu-Cabarrot'; 
            })
                //margin
                var margin = {top: 40, bottom: 110, right:10, left: 40}; 
                var width = 700 - margin.right - margin.left,
                        height = 500 - margin.top - margin.bottom; 
              

                    //var svg = d3.select("#reportingDiv  .row .col-xs-12")
                var svg = d3.select("#barChart")
                    .append('svg')
                    .attr('id', 'barChartSVG')
                    .attr('viewBox', "0 0 " + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom + 20)  )
                    .attr('perserveAspectRatio', "xMinYMid")
                    .attr('width', width + margin.left + margin.right )
                    .attr('height', height + margin.top + margin.bottom + 20)
                    .append('g')
                    .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')' )
                    .attr('width', width)
                    .attr('height', height); 

                var x = d3.scaleBand()
                    .range([0, width])
                     .padding(0.2); 

                var y = d3.scaleLinear()
                    .range([height, 0]); 

                      x.domain(data.map(function(d) { return d.name; }));
                         y.domain([0, d3.max(data, function(d) { return d.points; })]);


                 var  barColor = d3.scaleOrdinal(d3.schemeCategory20c); 
                 var fill = '#fff'; 
               
                // else {
                //   barColor = d3.scaleOrdinal(d3.schemeCategory20b); 
                //   fill = '#fff'; 
                // }

             var bars = svg.selectAll(".bar")
                .data(data)
                .enter()
                  .append("rect")
                  .attr('height', 0)
                  .attr('y', height)
                  .attr("class", "barGraphBar")
                  .attr("x", function(d) { return x(d.name); })
                  .attr("width", x.bandwidth())
                  .attr('transform', 'translate(0,' + margin.top + ')' )
                  //.style('fill', function(d,i){return 'rgb(30,30,' + ((i * 30) + 100) + ')'}) //bars are progressively lighter shades of blue
                  // .attr('fill', function(d,i){return d3.interpolateRdYlBu( i / 10)}) //bars are progressively lighter shades of blue
                  .transition()
                  .duration(3000)
                  .delay(function(d,i){return i * 550})
                  .attr("y", function(d) { return y(d.points); })
                 // .attr('fill', function(d, i){return barColor(d.label)}) //uses built-in d3 color template
                 .attr("height", function(d) { return height - y(d.points); }); 

                 function addColor(colorScheme){
                   bars
                  .attr('fill', function(d,i){
                    if (i === 0) return colorScheme(.64)
                    else if (i < (data.length/2)) return colorScheme(( i / data.length) * 2); 
                    return colorScheme( i / (data.length)) }) 
                }

                //d3.interpolateRdYlBu
                 // }
                 if (true){
                  addColor(d3.interpolateBuPu);  //interpolateRdYlBu  interpolateSpectral
                }
                // else if (title === 'Spending By Industry'){
                //   addColor(d3.interpolateBuPu); 
                // }
                // else if (title === 'Total Customer Spending By Competitor'){
                //   addColor(d3.interpolateRdPu); 
                // }
                // else if (title === 'Avg Total Spending By Score'){
                //   addColor(d3.interpolateYlOrBr); 
                // }
                // else if (title === 'Total Customers By Score'){
                //   addColor(d3.interpolateGreens); 
                // }
                // else if (title === 'Transactions By Score Resulting From Clout Promo'){
                //   bars
                //   .attr('fill', function(d, i){return barColor(d.label)})
                // }
                //   else if (title === 'Total Transactions By Score'){
                //   bars
                //   .attr('fill', function(d, i){return barColor(d.label)})
                // }
                


                //ADD count label to each bar
                  svg.selectAll('text')
                    .data(data)
                    .enter()
                    // .append('rect')
                    // .attr('width', x.bandwidth())
                    // .attr('fill', '#000')
                    .append('text')
                    .text(function(d){return d.points}) //toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').slice(0, - 3); 
                    .attr('x', function(d, i ){
                        return x(d.name) + x.bandwidth()/2; 
                    })
                    .attr('y', function(d, i ){
                        return y(d.points) + 20; 
                    })
                    .attr('transform', 'translate(0,' + margin.top + ')' )
                     .transition()
                    .duration(1500)
                    .delay(function(d,i){return i * 350})
                    .style('font-size', '.6em')
                    .style('text-anchor', 'middle')
                    .style('fill', fill)
                  

                  // else {  //ADD count label to each bar
                  // svg.selectAll('text')
                  //   .data(data)
                  //   .enter()
                  //   .append('text')
                  //   .text(function(d){return '$' + d.count.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').slice(0, - 3); })
                  //   .attr('x', function(d, i ){
                  //       return x(d.label) + x.bandwidth()/2; 
                  //   })
                  //   .attr('y', function(d, i ){
                  //       return y(d.count) + 20; 
                  //   })
                  //   .attr('transform', 'translate(0,' + margin.top + ')')
                  //   .style('font-size', '.6em')
                  //   .style('fill', fill)
                  //   .style('text-anchor', 'middle')
                  // }


                     // Add the X Axis
                              svg.append("g")
                                  .attr("transform", "translate(0," + (height + margin.top) + ")")
                                  .call(d3.axisBottom(x))
                                  .selectAll('text')
                                  .attr('transform', "rotate(-60)")
                                  .attr('dx', "-.8em")
                                  .attr('dy', '.5em')
                                  .style('text-anchor', "end")
                                  .style('font-size', '1.3em'); 
                                  // .attr("transform", "translate(0," + 20 + ")")

                              // Add the Y Axis
                              svg.append("g")
                               .attr("transform", "translate(0," + margin.top + ")")
                                  .call(d3.axisLeft(y));

                            svg.append("text")             
                            .attr("transform", "translate(" + (width/2) + " ," +  (margin.top/2) + ")")
                            .style("text-anchor", "middle")
                            .text("Sixers By Points: 2016/2017 Season");

                              //making d3 responsive
                                var chart = $("#barChartSVG"),
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
          }); 
                 
                              
        

}); 
