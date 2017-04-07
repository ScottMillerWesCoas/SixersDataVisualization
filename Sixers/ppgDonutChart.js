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

         $('#ppg').on('click', function(){
          if (counter < 1){

           $(".D3PointsDonutChart").append('<div id="chart"></div>'); 
            
                 // var data = [{name: '', PPG:  10}, {name: 'Coors', PPG:  20}, {name: 'Miller', PPG:  30}, {name: 'VIP', ppg:  40}, {name: 'Budweiser', ppg:  50}]; 
                 data.forEach(function(d, i){
                    d.PPG = +d.PPG
                    d.enabled = true;
                    if (d.name === 'Timothe Luwawu-Cabarrot') d.name = 'T. Luwawu-Cabarrot'; 
                 })

                     var margin = {top: 70, bottom: 80, right:10, left: 40}; 
                var width = 700 - margin.right - margin.left,
                        height = 600 - margin.top - margin.bottom; 
                 
                 var donutRadius = Math.min(height, width) *.6;  

                 var donutColor = d3.scaleOrdinal(d3.schemeCategory20b); 

                 var svg0 = d3.select('#chart')
                    .append('svg')
                     .attr('id', 'donutChartSVG')
                     .attr('viewBox', "0 0 " + (width + margin.left + margin.right)  + ' ' + (height + margin.top + margin.bottom)) 
                    .attr('perserveAspectRatio', "xMinYMid")
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .append('g')
                    .attr('width', width)
                    .attr('height', height + margin.bottom)
                    .attr('transform', 'translate(' + (width/2) + ',' +  (height/2) + ')'); 

                    var arc = d3.arc()
                        .innerRadius(donutRadius - 110)
                        .outerRadius(donutRadius - 50); 

                    var pie = d3.pie()
                        .value(function(d){
                            d.PPG = +d.PPG; 
                            d.enabled = true; 
                            return d.PPG;
                            // if (d.name === name) d.enabled = enabled; 
                            // return (d.enabled) ? d.PPG : 0; 
                        })
                        .sort(null); 


                var donutPath = svg0.selectAll('path')
                    .data(pie(data))
                    .enter()
                    .append('path')
                    .attr('d', arc) 
                    // .attr('fill', 
                    .attr('fill', function(d, i){return donutColor(d.data.name)}); 
                


              // addColor(d3.interpolateBlues); 
              //   function addColor(colorScheme){
              //      donutPath
              //     .attr('fill', function(d,i){
              //       if (i === 0) return colorScheme(.64)
              //       else if (i < (data.length/2)) return colorScheme(( i / data.length) * 2); 
              //       return colorScheme( i / (data.length)) }) 
              //   }
                

                        donutPath.transition()
                            .ease(d3.easeLinear)
                            .duration(2000)
                            .attrTween('d', pieTween); 

                        function pieTween(b){
                            b.innerRadius = 0; 
                            var i = d3.interpolate({startAngle: 0, endAngle: 0}, b); 
                            return function(t) { return arc(i(t)); }; 
                        }

                    // setTimeout(function(){
                            donutPath.on('mouseover', function(d){
                                var total = d3.sum(data.map(function(d){
                                    return (d.enabled) ? d.PPG : 0; // FOR ANIMATION PURPOSES; 
                                }))
                                var percent = Math.round(100 * d.data.PPG /total);   //just time 100?
                                tooltip.select('.name').html(d.data.name); 
                                tooltip.select('.PPG').html("Points Per Game: " + d.data.PPG); //toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').slice(0, - 3)); 
                                tooltip.select('.percent').html(percent + '% of Sixers PPG Total');
                                // tooltip.style('display', 'block')
                                tooltip.style('opacity', 1);  //for fade in/out effect using display makes immediate pop in/out of view
                                // .classed("my-selector", true);

                            })

                            function removeColors(){
                                 tooltip.classed('pie1', false);
                                 tooltip.classed('pie2', false);
                                 tooltip.classed('pie3', false);
                                 tooltip.classed('pie4', false);
                                 tooltip.classed('pie5', false); 
                            }

                            donutPath.on('mouseout', function(d){
                                // tooltip.style('display', 'none')
                                tooltip.style('opacity', 0); 
                            })

                               donutPath.on('mousemove', function(d){
                                    if (d.data.name ==="Shula's"){
                                        removeColors(); 
                                        tooltip.classed('wideLabel', false); 
                                     tooltip.classed('pie1', true)
                                     
                                 }
                                    else if (d.data.name ==="Fleming's") {
                                        removeColors(); 
                                        tooltip.classed('wideLabel', false); 
                                        tooltip.classed('pie2', true); 
                                        
                                    }
                                    else if (d.data.name ==="The Palm")  {
                                        removeColors(); 
                                        tooltip.classed('wideLabel', false); 
                                        tooltip.classed('pie3', true)
                                            
                                    }

                                    else if (d.data.name ==="Ruth's Chris"){
                                     removeColors(); 
                                     tooltip.classed('wideLabel', true); 
                                     tooltip.classed('pie4', true)
                                     
                                 }
                                    else if (d.data.name ==="Morton's"){
                                     removeColors(); 
                                     tooltip.classed('wideLabel', false); 
                                     tooltip.classed('pie5', true)
                                     
                                 }
                                 
                                            tooltip
                                            .style('top',  event.pageY + 25 + 'px')  // .style('top', (d3.event.pageY - 50) + 'px')
                                            .style('left',  event.pageX + 'px')
                                            .style('opacity', 1) //.style('left',  (d3.event.pageX - 780) + 'px')
                                //tooltip
                                //.style('top', (d3.event.pageY - 50) + 'px')
                               // .style('left',  (d3.event.pageX  - 750) + 'px')
                            })
                           // }, 4000); 


                    // var holeWidth = 75; 

                    var legendRectSize = 18, legendSpacing = 4; 

                    var legend = svg0.selectAll('.legend')
                        .data(donutColor.domain())
                        .enter()
                        .append('g')
                        .attr('class', 'legend')
                        .attr('transform', function(d,i){
                            var height = legendRectSize + legendSpacing; 
                            var offset = height * donutColor.domain().length / 2;
                            var horz = -2 * legendRectSize; 
                            var vert = i * height - offset; 
                            return 'translate(' + horz + ',' + vert + ')'; 
                        })

                        legend.append('rect')
                            .attr('width', legendRectSize)
                            .attr('height', legendRectSize)
                            // .classed("rectangle", true)  //Check later
                            .attr("id", function(d, i){ var result =  'rect' + i; return result; })
                            .style('fill', donutColor)
                            .style('stroke', donutColor)
                            .on('click', function(name){
                                var rect = d3.select(event.target);
                                var enabled = true;
                                var id = rect._groups[0][0].attributes[2].nodeValue; 
                                var thisClass = rect._groups[0][0].classList[0]; 
                                data.forEach(function(el){
                                    if (el.id === id) {
                                        // if (thisClass === 'disabledRect') el.enabled = true; 
                                        // else el.enabled = false; 
                                    }
                                })
                                   var totalEnabled = d3.sum(data.map(function(d){
                                    // console.log(d); 
                                    return (d.enabled) ? 1 :0; 
                                })); 
                                
                                if (rect.attr('class') === 'disabledRect') {
                                    rect.attr('class', ''); 
                                }
                                else {
                                    if (totalEnabled < 1) return;
                                    rect.classed("disabledRect", true) 
                                    // rect.enabled = false; 
                                }
                                pie.value(function(d){
                                    if (d.name === name) d.enabled = enabled;
                                    return (d.enabled) ? d.PPG: 0
                                })
                                donutPath = donutPath.data(pie(data)); 

                                donutPath.transition()
                                    .duration(750)
                                    .attrTween('d', function(d){
                                    var interpolate = d3.interpolate(this._current, d);
                                    this._current = interpolate(0); 
                                    return function(t){
                                    return arc(interpolate(t));
                        };
                    });
                            }); 

                        legend.append('text')
                            .attr('x', legendRectSize + legendSpacing)
                            .attr('y', legendRectSize - legendSpacing)
                            .text(function(d) {return d; }) //could do d.toUpperCase() to modify text, etc. 


                            var tooltip = d3.select('body')
                                .append('div')
                                .attr('class', 'reportingTooltip'); 

                            tooltip.append('div')
                                .attr('class', 'name'); 

                            tooltip.append('div')
                                .attr('class', 'PPG'); 

                            tooltip.append('div')
                                .attr('class', 'percent'); 



                        // svg0.append("text")             
                        //         .attr("transform", "translate(" + 0 + " ," +  (height/2.5) + ")")
                        //         .style("text-anchor", "middle")
                        //         .text("Percentage of Sales by Customer Tier");
            

                          svg0.append("text")             
                            .attr("transform", "translate(" + 0 + " ," +  275 + ")")
                            .style("text-anchor", "middle")
                            .text("Sixers Players PPG 2016/2017");
                            //END OF DONUT VISUALIZATION


                             //making d3 responsive
                                var chart = $("#donutChartSVG"),
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
            
              }//closes if re only appending 1x
      }); //closes click function

})




