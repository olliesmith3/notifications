# Notifications Tray

## Overview

During my 2 week work experience at an automated marketing company, I was given a project to build a notifications tray for one of their existing products. For such a short project, I was not given access to the existing code so instead I asked questions about the system and built a proof of concept to demonstrate how the feature would work. For this reason, I did not build a shiny UI, just a POC as the notifications tray would be added to the existing UI. 

## Requirements

- Single Page
- Can make a notification for a variety of events (e.g. SMS, email, cleardown, calculation) all with different attributes
- Uses an SQL database and PHP and JS so that it can fit in with the current tech stack. 

## My Approach

1) In the first few days, I prepared a development environment and began writing the requirements for the feature and planning a solution. By having a look at a few possibilities I was able to get feedback from experienced developers as to which path is recommended.  

2) I then started learning some PHP and set up a MySQL database. I set up tables to hold calculations and emails and then then a notifications table that stored a reference to the other tables and value for whether it had been read or not. I used JQuery AJAX requests to transfer information between the client and the server. I had to utilise callbacks so that all requests were carried out in a feasible order. The flow diagram below shows the logic behind the getNotifications function which is regularly called.
<img src="./public/images/getNotifications.png" alt="Get Notifications Flow Chart" width="90%"/>

3) I received some feedback along the way such as being told to change my PHP syntax in order to protect against SQL injection. It was also suggested that instead of regularly polling the server, it would be better to create a websocket connection. This would be less computationally expensive as well as providing a more realtime flow of notifications. It was decided that for version one a polling method would be fine but I plan to build a version two in a slightly different stack that is more accomodating to websockets. The below images show the UI which was built to prove the concept. 

<img src="./public/images/Notifications.png" alt="Notifications Page" width="93%"/>
The notifications display page. Depending on the settings selected, different types of notifications (e.g. emails or calculations) can be viewed and the read notifications can be shown or hidden. 
<br />
<img src="./public/images/Forms.png" alt="Forms Page" width="89%"/>
This forms page is purely to demonstrate what happens when a new calculation or email is created. When this feature is implemented this will be replaced by the existing ways to create events. When the form is submitted and an entry made in the database, a trigger passes the ID and type of event into a new entry in the notifications table. From here, the information required for displaying the notification can be gathered using this reference ID.
<br />
<img src="./public/images/Settings.png" alt="Settings Page" width="71%"/>

