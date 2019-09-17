# CS5610-WebDev-HW2

## Details :

This is a web application developed as a part of coursework of CS5610 Web Development. The application consists of 2 pages, one with HTML and CSS knowledge demonstration by having a page about Animal and the attribution.

The second application is a four-function calculator application with multifunction += button and supports negative numbers as well.

The webpage is available at hw02.cs5610f19.website

## Four-function Calculator Design-Decisions and Usage Document :

The application supports decimal point operations and operations on negative numbers.

Not finite numbers like Infinity, NaN are displayed as UNDEFINED in the calculator

Consecutive operations are executed sequential order i.e 1 + 2 * 3 will be (1 + 2) * 3 i.e in the order of inputs entered.

Consecutive operator inputs i.e * followed by / will be overidden by the latest operator entered. (Unless - where its treated as neg)

Design decision for any arithmetic operator except (+=) followed by - (minus) was made to handle as a negative number so to undo, the calculator clear must be used. Where as for += the - (minus) operator represents a subtract operation. To enter a negative number (from scratch operation) after +=, clear option must be used ( Using two - will result a  result - (negative number)).

## Attributions : 
Image of Polar Bear from wikepedia
Namespace and Anonymous functions understanding 
- https://www.codeproject.com/Articles/829254/JavaScript-Namespace
- https://www.contentful.com/blog/2017/01/17/the-global-object-in-javascript/
Window event listener after load - http://ccs.neu.edu/home/ntuck/courses/2019/09/cs5610/notes/02-browsers/page/code.js
Selector concepts understanding - https://www.w3schools.com/cssref/css_selectors.asp
Referenced W3 schools for button design
- https://www.w3schools.com/css/css3_buttons.asp for 
- https://www.w3schools.com/howto/howto_css_animate_buttons.asp
Documentation standards followed from :
https://gomakethings.com/whats-the-best-way-to-document-javascript/
