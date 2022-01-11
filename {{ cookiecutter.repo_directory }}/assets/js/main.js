"use strict";

/* ======= Header animation ======= */   
const header = document.getElementById('header');  

window.onload=function() 
{   
    headerAnimation(); 

};

window.onresize=function() 
{   
    headerAnimation(); 

}; 

window.onscroll=function() 
{ 
    headerAnimation(); 

}; 
    

function headerAnimation () {

    var scrollTop = window.scrollY;
	
	if ( scrollTop > 100 ) {	    
	    header.classList.add('header-shrink');    
	    	    
	} else {
	    header.classList.remove('header-shrink');
	}

};

/* ===== Smooth scrolling ====== */
/*  Note: You need to include smoothscroll.min.js (smooth scroll behavior polyfill) on the page to cover some browsers */
/* Ref: https://github.com/iamdustan/smoothscroll */


let scrollLinks = document.querySelectorAll('.scrollto');
const pageNavWrapper = document.getElementById('navigation');

scrollLinks.forEach((scrollLink) => {

	scrollLink.addEventListener('click', (e) => {
		
		e.preventDefault();

		let element = document.querySelector(scrollLink.getAttribute("href"));
		
		const yOffset = 69; //page .header height
		
		//console.log(yOffset);
		
		const y = element.getBoundingClientRect().top + window.pageYOffset - yOffset;
		
		window.scrollTo({top: y, behavior: 'smooth'});
		
		
		//Collapse mobile menu after clicking
		if (pageNavWrapper.classList.contains('show')){
			pageNavWrapper.classList.remove('show');
		}

		
    });
	
});
    

/* ===== Gumshoe SrollSpy ===== */
/* Ref: https://github.com/cferdinandi/gumshoe  */
// Get the sticky header


// Initialize Gumshoe
var spy = new Gumshoe('#navigation a', {
	offset: 69 //page .header heights
});


// variables for time units
const counterDiv =  document.getElementById("countdown-box");
const endDate = new Date(counterDiv.getAttribute('data-start-date'));
let days, hours, minutes, seconds;

function createCountdownSpans(className) {
    const span = document.createElement("SPAN");
    span.className = className;
    return span
}

function updateCountdownHTML(span, value, unit) {
    span.innerHTML = '<span class="number">' + value + '</span>' +
        '<span class="unit">' + unit + '</span>';
}

function timeLeft() {
    // find the amount of "seconds" between now and target
    const currentDate = new Date().getTime();
    return (endDate - currentDate) / 1000;
}


function updateCounter(counterDiv) {
    let secondsLeft = timeLeft()
    let days = parseInt(secondsLeft / 86400);
    secondsLeft = secondsLeft % 86400;

    let hours = parseInt(secondsLeft / 3600);
    secondsLeft = secondsLeft % 3600;

    let minutes = parseInt(secondsLeft / 60);
    let seconds = parseInt(secondsLeft % 60);

    // format countdown string + set tag value.
    updateCountdownHTML(counterDiv.getElementsByClassName('days')[0], days, 'Days');
    updateCountdownHTML(counterDiv.getElementsByClassName('hours')[0], hours, 'Hours');
    updateCountdownHTML(counterDiv.getElementsByClassName('minutes')[0], minutes, 'Mins');
    updateCountdownHTML(counterDiv.getElementsByClassName('secs')[0], seconds, 'Secs');
}

function startCountDown(counterDiv) {
    if ( timeLeft() > 0 ) {
        counterDiv.appendChild(createCountdownSpans('days'))
        counterDiv.appendChild(createCountdownSpans('hours'))
        counterDiv.appendChild(createCountdownSpans('minutes'))
        counterDiv.appendChild(createCountdownSpans('secs'))

        // update the counter every 1 second
        setInterval(updateCounter, 1000, counterDiv);
    } else {
        document.getElementById("countdown-intro").remove();
    }
}

startCountDown(counterDiv);