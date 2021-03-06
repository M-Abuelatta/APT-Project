$(document).ready(function()
{
    /* 'bank' (and 'queriesMixed') have the queries along with their respective counts one after the other */
    var queriesMIXED = bank;
    
    // 'queries' will have the queries and count separated from each other
    var queries = [];

    // Separating count values and text values of 'queriesMIXED' into array 'queries' of type object, each object with 'count' and 'value'
    for (i = 0; i < queriesMIXED.length; i+=2)
        queries.push({count: queriesMIXED[i], text: queriesMIXED[i+1]});
    
    // Constructing the suggestion engine
    var queries = new Bloodhound(
        {
            // Tokenizing 'queries' value i.e. text
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('text'),
            
            // Tokenizing what's being typed
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            
            // Specifying where the data is for tokenizing and ordering
            local: queries,
            
            // Sorting the data. Chosen is descending order based on 'queries' object's 'count' values respective of each object's 'text' values
            sorter: function(a, b)
            {
                // When function outputs: 
                //  ...-1 indicates a > b
                //  ...1 indicates b > a
                //  ...0 indicates both same
                
                //  Therefore,
                //  Asecnding: a.count - b.count
                //  Descending: b.count - a.count
                return (b.count - a.count);
            }
        });
        
    // Initializing the typehead. '.typehead' is the selector having what's being currently typed
    $('.typeahead').typeahead(
        {
            // Disabling showing hint in the search box
            hint: false,
            
            // Enable substring highlighting
            highlight: true,
            
            // Specify minimum characterrs required for showing result
            minLength: 1
        },
        {
            // The name of the dataset
            name: 'queries',
            
            // The source of the suggestions for displaying them
            source: queries,
            
            // Displaying only the 'text' value of each object in 'queries'
            display: 'text'
        });
});  