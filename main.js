const arrowLeft = document.getElementsByClassName('arrow')[0];
const arrowRight = document.getElementsByClassName('arrow')[1];
const main_container= document.getElementById('main_container');
let tabsWrapper = document.getElementById('tabs_wrapper');
let tabs = tabsWrapper.children;
let tabsLength = tabsWrapper.firstElementChild.offsetWidth;
const arrows = document.getElementsByClassName("arrow");
let  previousTab =document.getElementsByClassName("tab")[0];
let tabEditing = false;
let currentTab ;
let blincking_cursor = document.createElement("p");
	blincking_cursor.setAttribute("id","blincking_cursor");
	blincking_cursor.innerHTML="|";

//variables of editing utilities elements for tab after first creating title
let selectBtn = document.createElement("select");
		selectBtn.setAttribute("class","editer");
let option1 = document.createElement("option");
	option1.setAttribute("value","rename");
	selectBtn.appendChild(option1);
	if(tabs.length==2 && $(tabs[0].firstElementChild).text()=="title"){
		tabs[0].lastElementChild.insertAdjacentElement("afterend",blincking_cursor);
		getIn_tab(tabs[0]);
	}
	
function add_tab(){
	tabsLength+=tabs[tabs.length-2].offsetWidth;
	if(tabsLength>tabsWrapper.offsetWidth){
		for(let i=0;i<arrows.length;i++){
			arrows[i].style.visibility="visible";
			arrows[i].style.opacity="1";
		}
		
	}
	console.log(tabsLength);
	let title = document.createElement("p");
	title.innerHTML="title";
	let tab = document.createElement("div");
	tab.setAttribute("class","tab");
	tab.setAttribute("tabindex",tabsWrapper.children.length);
	tab.setAttribute("onclick","getIn_tab(this)");
	tab.appendChild(title);
	tabsWrapper.lastElementChild.insertAdjacentElement("beforebegin",tab);
	tabs[tabs.length-2].click();
}

function clickLeft(){
	arrowLeft.style.color="red";
	tabsWrapper.scrollLeft -= 220;

	setTimeout(function(){
		arrowLeft.style.color="black";
			
	},420);
}

function clickRight(){
		arrowRight.style.color="red";
		tabsWrapper.scrollLeft += 220;
		setTimeout(function(){
			arrowRight.style.color="black";

		},420);
}

function getIn_tab(element){
	element.focus();
	element.style.backgroundColor="rgb(163, 217, 238)"; // set a focusing on an element
	if(tabs.length>2 && element!==previousTab){
		previousTab.style.backgroundColor="gray"; //change the previous tab to original color
	}
	previousTab=element; // save the current for forword changing to original color

	// automatically line the tab to full vision,if there is occurs focus on overflowed tab at the edges	
	if($(element.firstElementChild).text()!=="title"){ 
	
		if(element.getBoundingClientRect().right>tabsWrapper.getBoundingClientRect().right){
			tabsWrapper.scrollLeft += 350;
		}
		if(element.getBoundingClientRect().left<tabsWrapper.getBoundingClientRect().left){
			tabsWrapper.scrollLeft -= 350;
		}
	}

	// if the tab isn't overflowed and its text area is empty ("title").
	else if($(element.firstElementChild).text()=="title"){
		$(element).removeAttr("onclick");// remove click event on the element.
		$("*").on("click keydown",function(event){
			if(element.contains(event.target)==false){
				element.focus();
				$(element).css("background-color","slategray");
				 setTimeout(function(){
				$(element).css("background-color","rgb(163, 217, 238)");
				
				},400);
			}
			if(event.key=="Enter"){
				$('*').off("click keydown");
				element.setAttribute("onclick","getIn_tab(this)");

				
			}
		  
		});
		element.lastElementChild.insertAdjacentElement("afterend",blincking_cursor);
		if(element.getBoundingClientRect().right>tabsWrapper.getBoundingClientRect().right){
			tabsWrapper.scrollLeft += 350;
			
		}
		else if(element.getBoundingClientRect().left<tabsWrapper.getBoundingClientRect().left){
			tabsWrapper.scrollLeft -= 350;
			
		}

			for(let i=0;i<tabs.length;i++){
				if(element!=tabs[i]){
					$(tabs[i]).css("pointer-events","none");
				}
			}	
	
		let string ="";
		let disabledBtns=["Tab","Escape","ShiftLeft","ShiftRight","CapsLock","ControlLeft","ControlRight",
						 "MetaLeft","AltLeft",""];
		$(element).on("keydown", function (event) {
			
            var keyPressed = event.key;
            console.log(keyPressed);
            if (keyPressed === "Enter") {
             	console.log("work")
            	if(string=="" || string=="title"){
            		$(element.firstElementChild).text("title");
            		$("#blincking_cursor").remove();
            		$(element).unbind("keydown");
            		$(element).css("pointer-events","auto");
            		$(element).removeAttr("pointer-events style");
            		$(element).css("background-color","slategray");
            		$(element).css("pointer-events","auto");
            		previousTab=element;
            	}
            	else{
            	$(element.firstElementChild).text("");	
            	$(element.firstElementChild).text(string);
            	$("body").css("pointer-events","auto");	
            	//$(element).css("pointer-events","none");
            	$("#blincking_cursor").remove();
            	$(element).unbind("keydown");
            	element.firstElementChild.insertAdjacentElement("afterend",selectBtn);
            	}
            		for(let i=0;i<tabs.length;i++){
				
					$(tabs[i]).css("pointer-events","auto");
				}
            }
	        else{

	        	if(keyPressed==="Backspace"){
	        		$(element.firstElementChild).text("");
	        		string=string.slice(0,string.length-1);
	        		$(element.firstElementChild).text(string);	
	        	}
	        	if(string.length<=20 && keyPressed!=="Backspace"){
	        		$(element.firstElementChild).text("");	
	        		string+=keyPressed;
	        		$(element.firstElementChild).text(string);
	        	}	
	        }
        }); //closing of on('keydown') method
    } // closing of first if statment - (element. ... .text()=="title") 
} // closing getIn_tab 

