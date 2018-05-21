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