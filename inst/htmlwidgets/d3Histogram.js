HTMLWidgets.widget({
  
  name: 'd3Histogram',
  
  type: 'output',
  
  renderOnNullValue: true,
  
  factory: function(el, width, height) {
    
    return {
      
      renderValue: function(x) {
        
        var container = d3.select(el).append("div").attr("id", "container");
        
        var barPadding = 1;
        
        /*
          var data=[
            {"lpu":"lpu1","amount":"20"},
            {"lpu":"lpu2","amount":"40"},
            {"lpu":"lpu3","amount":"60"},
            {"lpu":"lpu4","amount":"10"},
            {"lpu":"lpu5","amount":"80"},
            {"lpu":"lpu6","amount":"30"},
            {"lpu":"lpu7","amount":"20"},
            {"lpu":"lpu8","amount":"40"},
            {"lpu":"lpu9","amount":"60"},
            {"lpu":"lpu10","amount":"10"},
            {"lpu":"lpu11","amount":"80"},
            {"lpu":"lpu12","amount":"30"},
            {"lpu":"lpu13","amount":"20"},
            {"lpu":"lpu14","amount":"40"},
            {"lpu":"lpu15","amount":"60"},
            {"lpu":"lpu16","amount":"10"},
            {"lpu":"lpu17","amount":"80"},
            {"lpu":"lpu18","amount":"30"}
            ];
          */
            
            var dataset = HTMLWidgets.dataframeToD3(x.dataset);
            
            var width=2000,
            height=300;
            //radius=100,
            //	padding=100;
            
            var margin = {top: 100, right: 50, bottom: 40, left: 50};
            
            var xLPU=d3.scale.ordinal();
            var yLPU=d3.scale.linear();
            
            var xLPUAxis = d3.svg.axis()
            .scale(xLPU)
            .orient("bottom");
            
            var yLPUAxis = d3.svg.axis()
            .scale(yLPU)
            .orient("left")
            .ticks(20, "??????.");
            
            
            var svg1 = d3.select("#container").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
            xLPU.domain(dataset.map(function(d){return d.lpu;}))
            .rangeBands([0, width]);
            yLPU.domain([0,d3.max(dataset, function(d) { return d.amount; })])
            .range([height,0]);
            svg1.append("g")
            .attr("class","x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xLPUAxis);      
            
            svg1.append('g')
            .attr('class','y axis')
            .call(yLPUAxis);
            
            
            svg1.selectAll('rect').data(dataset).enter().append('rect')
            .attr('x', function(d) {
              return xLPU(d.lpu);
            })
            .attr('y',function(d) {
              return yLPU(d.amount);
            })
            .attr('width',xLPU.rangeBand()-3)
            .attr('height', function(d) {
              return height - yLPU(d.amount);
            })
            .attr('fill','teal');
            // .attr("fill", function(d) {
              // return "rgb(0, 0, " + (d * 10) + ")";
              //  });
            
            svg1.selectAll(".bartext")
            .data(dataset)
            .enter()
            .append("text")
            .attr("class", "bartext")
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .attr("x", function(d,i) {
              return xLPU(d.lpu)+xLPU.rangeBand()/2;
            })
            .attr("y", function(d,i) {
              return yLPU(d.amount) + (-3);
            })
            .text(function(d){
              return d.amount   
            });
            
            svg1.selectAll('.axis line, .axis path')
            .style({'stroke': 'Black', 'fill': 'none', 'stroke-width': '2px'});
            
            svg1.append("text")      // text label for the x axis
            //.attr("x", 265 )
            //.attr("y", 240 )
            //.style("text-anchor", "middle")
            .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
            .text("Year")
            .attr('font-family','sans-serif')
            .attr('font-size','15px')
            .attr('fill','black');
            
            
            svg1.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Count")
            .attr('font-family','sans-serif')
            .attr('font-size','15px')
            .attr('fill','black');
            
            
            
      },
      
      resize: function(width, height) {
        
        
      }
      
    };
  }
});