# Open Source Prognostics and Health Management Datahub for Machine Learning

Machine Data Hub is an open source data hub for storing prognostics and health management datasets for machine learning researchers and hobbyists. 

## Installation

Use the package [pip](https://github.com/PHM-Data-Hub/lib/) to install our Python client. 

```bash
pip install machinedatahub
```

## Commands

```python
import machinedatahub as mdh

dataset = mdh.fetch('Bearing Dataset') # feteches the dataset titled 'Bearing Dataset' from Machinedatahub.ai

```

## Contributing
Pull requests welcomed

## License
In progress
[MIT](https://github.com/PHM-Data-Hub/)

---

# Recent Updates
### May 4, 2021
1. Main View
   i. 'See More' removed
2. Card View
   i. 'See More' removed
   ii. File size on the left hand side of the card removed --> replaced with file type (??? for unlabeled)


### April 27, 2021
1. Suggesting data sets writes to team discussion. Speficically, it writes to the 'UW capstone team' discussion. Can easily switch to any discussion. Just needs the GitHub authentication token. 
https://github.com/orgs/PHM-Data-Hub/teams
2. Colors updated
3. Blog function semi-implemented --> Doesn't look great but functionally works. 
4. Check LICENSE
5. Whole tile clickable
6. Main Page Cards
   i. Subtext lines on cards is now left justified. 
   ii. Whole card is clickable. 
   iii. Photos added
7. Data set Cards
   i. Suggested data sets cards changed to mimic cards on main page. 
   ii. "About this data set" text has more spacing between text. 

### April 20, 2021
1. Bryan's feedback implemented
    * Filter and Sort buttons are just individual buttons. I hope to turn them into a more visually appealing bar by next week. 
2. PageSpeed
    * 95/100 on Mobile
    * 97/100 on Website
3. Generated Lighthouse Report

### March 29, 2021
1. 11/15 design changes implemented
    * What's not implemented
    * Blog function works locally, does not work on Netlify, cannot find any error codes on what is happening
    * Writing to JSON requires ExpressJS. Been working on that since last Wednesday. Have been prioritizing this. Feels like I'm almost done. 
    * Displaying cards by Tile / Datasets is in progress. Paused to solve the JSON problem. 
2. What is Implemented / What to Review
    * Prettier used for formatting
    * Simulation and Time Series sorting
    * Color code tags for filtering
    * Filtering and Sorting separated
    * Pagination set to bottom
    * Nested datasets format completed
    * Summary on front of card -- removed "Attributes": card look overwhelming, felt like attributes wasn't needed information
    * About page reviewed, typos fixed
    * Cecilia and Jiwoo profiles spaced out
    * Search panel full width
    * MOSFET dataset added
    * Search by name implemented
    * Filter box closes on external mouse click
    * Download and Like active from tile but do not appear to work (need to fix axios to show)
    * Donated --> "Acquired"
    * HCDE Reviews Completed
    * Blog functions
