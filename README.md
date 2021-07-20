# CSCI 202 Assignment 5 - People in Space

> Working with data from the [People in Space API](http://open-notify.org/Open-Notify-API/People-In-Space/), create a site that presents this information. The people in space API provides a JSON list of individuals currently in space, including their names, the spacecraft they are on, the total number of people in space. Use this information to create that creatively visualizes this information. I encourage you to think about interesting ways you would like to represent this information.

This is an homage to the the [delightfully gaudy 1996 webpage for the Warner Bros. film *Space Jam.*](https://www.spacejam.com/1996/). The planets are clickable and show info and Google search strings for the people currently in space, and their craft. The effect on the center logo takes into account the current coordinates of the ISS.

## Ideas
- [x] [Figma prototype](https://www.figma.com/file/ce9poFVz0soctapy1ndcsI/People-in-Space-Jam?node-id=0%3A1)
- [ ] More effects on icons
- [ ] More logo hover effects using ISS coordinate data
- [ ] Sound effects? - come on and slam
- [ ] Callback to update ISS data in real time
- [ ] Squish text effect? - look into textAscent() and textDescent()
- [ ] Make more accessible - p5 canvases are not exactly screen-readable
- [ ] Get person and spacecraft info from the web (currently the data is hard-coded)