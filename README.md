# CS5610-WebDev-HW2

## Details :

This is a web application developed as a part of coursework of CS5610 Web Development. The application consists of 2 pages, one with HTML and CSS knowledge demonstration by having a page about Animal and the attribution.

The second application is a four-function calculator application with multifunction += button and supports negative numbers as well.

The webpage is available at hw02.cs5610f19.website

## Four-function Calculator Design-Decisions :

The application supports decimal point operations and operations on negative numbers.

Design decision was made not to support consecutive arithmetic operations so as to have the functionality of += as intended and rest operations are only used to perform operations on the latest available numbers unless += button is entered to store the state/result. (Example : To compute 2-3-5 which would be -6, the user needs to be compute 2 - 3 and then see the result i.e use += and then perform - 5. If user interacts directly 2-3-5 then subtract - operator considers only last two digits and return result of -2.). This decision is made for += to have its intended behaviour.

Not finite numbers like Infinity, NaN are displayed as UNDEFINED in the calculator