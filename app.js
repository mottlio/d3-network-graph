d3.csv('./senate_committee_data.csv', function(d, i, headers) {
    var committees = headers.slice(2).filter(h => d[h] === '1');
    return {
    name: d.name,
    party: d.party,
    committees: committees
    }
}, function(error, nodes) {
    if (error) throw error;

console.log(makeLinks(nodes));

var links = makeLinks(nodes);
var width = 750;
var height = 750;
var svg = d3.select("svg")
                .attr("width", width)
                .attr("height", height);
var linkGp = svg.append("g")
                    .classed("links", true);
var nodeGp = svg.append("g")
                    .classed("nodes", true);

var simulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(-100))
    .force("center", d3.forceCenter(width/2, height/2))
    .force("link", d3.forceLink(links)
                        .distance(d => {
                            var count1 = d.source.committees.length;
                            var count2 = d.target.committees.length;
                            return 25 * Math.max(count1, count2);
                        })
                            .id(d => d.name))
    .on("tick", () => {
        linkGp
            .selectAll("line")
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y)
        nodeGp
            .selectAll("circle")
                .attr("cx", d => d.x)
                .attr("cy")
    });

function graph(nodeData, linkData){
    var partyScale = d3.scaleOrdinal()
                        .domain(["D", "R", "I"])
                        .range(["blue", "red", "#ccc"]);
}

function makeLinks(nodes){
    var links = [];
    for (var i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
            var s1 = nodes[i];
            var s2 = nodes[j];
            for(var k = 0; k < s1.committees.length; k++){
                var committee = s1.committees[k];
                if(s2.committees.includes(committee)){
                    links.push({
                        source: s1.name,
                        target: s2.name
                    });
                    break;
                }
            }
        }
    }
    return links;
}
});