# Rosenwald Schools Choropleth Map
July 18, 2017

This map was built using the following tools
  - A python script - to extract the dataset for the Rosenwald Schools with their counties from the [Fisk University Rosenwald Fund Card File Database](http://rosenwald.fisk.edu/index.php?module=search). Thanks to Scott Enderle for his help on this. This will be made public soon!
  - American Fact Finder - To create a shapefile of just the county data I needed, I used [American Fact Finder](https://factfinder.census.gov/faces/nav/jsf/pages/index.xhtml). This was to combat the problem that sometimes you can have too much data. Too much data can cause two problems: 1) The map loads slowly; 2) Most of the map is blank because there is no data present. If I included all counties in the U.S. in my map for example, it would look pretty white. No Rosenwald Schools ever went beyond the American South, so it would be wasted space, both for the human eye and for the map's loading time. You can find the data from American Fact Finder in the Github Repo at counties.topojson. You can modify the format at [geojson.io](geojson.io).
  - Open Refine - I used this amazing program to match the FIPS codes (the codes the census uses to give unique id's to geographic entities) with the counties in the spreadsheet I extracted from the Fisk University Rosenwald Fund Card File Database in order to then match them with polygon geometries that were in the American Fact Finder Data. I first concatenated state and county names together into a new column. I then used the [Wikidata reconciliation interface for OpenRefine](https://github.com/wetneb/openrefine-wikidata) to reconcile the county names in each state. Once you've installed the extension, here are written instructions on how to use the it to find the geographic information: Click on the "down arrown" on the column for the column in which you want to get the geographic data. Go to the bottom of the "down arrow" menu and click "reconcile." Once you've clicked "reconcile" another submenu will appear. In this submenu, click "start reconciling." You will see the window working and spinning. Once it has stopped spinning, you will see two columns. In the first column, towards the bottom, you will see "reconcile against type:" with a blank box. I faceted each state seperately and then with each one reconciled against "county of 'state name.'" So in the example below I would have faceted for the state of Florida, gone through the process above, and then typed in "county of Florida." 
 ![See how it works](https://cl.ly/0x450N2i3i0e/Screen%20Recording%202017-07-18%20at%2011.07%20AM.gif)
   While it might seem time consuming, 15 times v. 890 times is worth it! Plus this tells you where you have spelling mistakes and if no county was found it usually means that someone had mislabeled the county and you needed to do some research (rare, but it happened). Once I was sure of the county names, I copied the newly reconciled column and ran a new command using the Wikidata reconcile service. I did not facet like I did with the state names above, but I did repeat almost the same exact procedure otherwise. The only other difference was instead of reconciling against the "county of 'state name,'" instead I reconciled against P882, which is the unique FIPS code for each county. I then added a column based on the FIPS column from another project and used the common FIPS code to add the geometry found in the CSV from the converted shapefile (see below).
   - CartoDB - I took the American Fact Finder Shapefile and I uploaded it to CartoDB. I then proceeded to download it to a CSV using their export function as well as a topojson (what you see in counties.topojson). The CSV then uploaded as a seperate spreadsheet to OpenRefine. 
