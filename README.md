# REAL-T 
## Reas EstAte Lending Tracker


### Background

This is a project using modern web technologies to recreate and reimagine a set of programs I wrote years ago in VB for Microsoft Office. I was working at the time in my former life as a real estate lawyer for a title company. Some of the clients of this title company were fairly wealthy individuals who made loans on (often speculative) real estate projects. These loans were usually short-term, high-interest, and over-collateralized "hard money" or bridge loans made on projects that otherwise couldn't get funding.

I was put in charge of managing and conducting foreclosures for these clients. The system used by the prior lawyer doing this was terribly inefficient, and document preparation consisted of manual search and replace in Word for each case.

My personal interest in programming, and desire to improve the process of handling these loans, led me to start coding Visual Basic modules to automate various stages. I eventually ended up with complete custom intake forms that would auto-populate documents, correspondence, calendaring, case summaries, and emails. 

That experience played a major role in my eventual migration to a career in programming and web development. Of course there already exist several sophisticated products that do these functions and more, but it is a personal goal of mine to complete the circle by using my more recently acquired skills to recreate a modern full stack web version of the program that was the catalyst that led me here.

#
## Project Summary

This is a full stack project in the MEAN stack.

This web app is for managing real estate loans and non-judicial foreclosures of those loans that do not get repaid. 

The main target features of the app are to:
* Store and display relevant information about the property, parties involved, and terms of the loans.
* Allow user entry and editing of new and existing case information.
* Generate the necessary legal documents with the case-specific data.  
* Automatically generate the schedule for mailing and publication, and the appropriate correspodence and emails for the applicable jurisdiction.

The front end is built using Angularjs with Angular Material, and routing is handled by UI-Router. Frontend package management is handled with Bower. The backend uses Node.js, npm, and MongoDB. 
 
