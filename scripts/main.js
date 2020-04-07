//Navigation

//HTML of Navigation links
var navHTMl = document.querySelector("nav .wrap-container").innerHTML;

if (navHTMl != undefined || navHTMl != null) {
    //Number of menuLinks
    var menuItems = navHTMl.split("</a>").length-1;
    
    //Get the middle of all Links (where new element has to be inserted)
    menuMiddle = menuItems/2;

    //Check if number is integer
    if (menuMiddle % 1 == 0) {
        var menuMiddle = document.querySelector("nav .wrap-container a:nth-child(" + menuMiddle + ")");
        menuMiddle.style.margin = "0 100px 0 0";
    } else {
        console.error("LWD2.0 Error: The menu must have an even number of menu items");
    }
}