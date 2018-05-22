**Using a D3 force directed graph to visualize relationships between members of the US Senate**

1st step -> prepare the CSV data for use with D3 by using a FORMATTER

2nd step -> using a callback (3rd argument to d3.csv) which accepts data from the formatter ("nodes") and first creates links between different members of the senate based on which committees they are in (with source and target value based on the members' names)

There are 1021 links!!!

3rd step -> display nodes with D3 as circles and links as lines

4th step -> make links draggable (with startDrag, drag, endDrag functions)

5th step -> add Tooltips

