
var divContent = "";
var string = "";
var spanId = "";
var debugVariable = "";
var disabledIds = [];
var storage = window.localStorage;
var dosage = "";


var MTime = "07:00:00";
var LTime = "14:49:00";
var ETime = "19:00:00";
var PillArr = [];
var MPills = ["Paralen", "X", "Morphine", "Ibalgin"];
var LPills = ["Paralen", "X", "Morphine"];
var EPills = ["Paralen", "Morphine"];
var DayPeriod = "";

var checkedValueKey = "checkedValues", 
    pillsArr = "pills",
    daytime = "daytime";


var statBtn = "stat-btn";
var callBtn = "call-btn";
var mainBtn = "main-btn";
var mainContent = "main-content";
var statContent = "stat-content";
var callContent = "call-content";

var DOMId = "";

var DOMStBtn = document.getElementById(statBtn);
var DOMClBtn = document.getElementById(callBtn);
var DOMMnBtn = document.getElementById(mainBtn);

var DOMStCnt = document.getElementById(statContent);
var DOMClCnt = document.getElementById(callContent);
var DOMMnCnt = document.getElementById(mainContent);

var btnStyleSt = DOMStBtn.style;
var btnStyleCl = DOMClBtn.style;
var btnStyleMn = DOMMnBtn.style;

var cntStyleSt = DOMStCnt.style;
var cntStyleCl = DOMClCnt.style;
var cntStyleMn = DOMMnCnt.style;

var decorNone = "none";
var colorWhite = "white";
var colorBlue = "#0066ff";


window.onload = starter();


DOMStBtn.addEventListener("click", function()
{
  navigator(statBtn);
});

DOMClBtn.addEventListener("click", function()
{
  navigator(callBtn);
});

DOMMnBtn.addEventListener("click", function()
{
  navigator(mainBtn);
});

function starter()
{

    
    
    getFromStorage(checkedValueKey);
    getFromStorage(pillsArr);
    getFromStorage(daytime);
    
    removeFromStorage(checkedValueKey);
    removeFromStorage(daytime);
    removeFromStorage(pillsArr);

    
    navigator(mainBtn);
    var today = new Date(),
        h = checkTime(today.getHours()),
        m = checkTime(today.getMinutes()),
        s = checkTime(today.getSeconds()),
        fTime = h + ":" + m + ":" + s;
    DayPeriod = fTime;
    getFromStorage(daytime);
    if(fTime >= "00:00:00" && fTime < LTime)
    {
       
        PillArr = MPills;
        pushToStorage(pillsArr, PillArr);
        renderMain(PillArr);
        if(disabledIds != null || disabledIds != undefined)
        {
            disableSelectIdsMain();
        }
    }
    if(fTime >= LTime && fTime < ETime)
    {
        
        PillArr = LPills;
        pushToStorage(pillsArr, PillArr);
        renderMain(PillArr);
        if(disabledIds != null || disabledIds != undefined)
        {
            disableSelectIdsMain();
        }
    }
    if(fTime >= ETime || fTime < "00:00:00")
    {
        
        PillArr = EPills;
        pushToStorage(pillsArr, PillArr);
        renderMain(PillArr);
        if(disabledIds != null || disabledIds != undefined)
        {
            disableSelectIdsMain();
        }
    }

    btnStyleSt.textDecoration = decorNone;
    btnStyleCl.textDecoration = decorNone;
    btnStyleMn.textDecoration = decorNone;
    
    
}

function navigator(elementId)
{
   //alert(JSON.stringify(elementId));
   //document.getElementById("main-content").innerHTML = "";
   
   //var eId = JSON.stringify(elementId);

   DOMId = document.getElementById(elementId);
   
   //alert("fn "+eId);
   if(elementId == "main-btn") 
   {
      DOMId.style.backgroundColor = colorBlue;
      DOMId.style.color = colorWhite;
      DOMId.style.fontWeight = "bold";

      btnStyleSt.backgroundColor = colorWhite;
      btnStyleSt.color = colorBlue;
      btnStyleSt.fontWeight = "normal";

      btnStyleCl.backgroundColor = colorWhite;
      btnStyleCl.color = colorBlue;
      btnStyleCl.fontWeight = "normal";

      cntStyleSt.display = "none";
      cntStyleCl.display = "none";
      cntStyleMn.display = "block";
      
   }
   if(elementId == "stat-btn") 
   {
      DOMId.style.backgroundColor = colorBlue;
      DOMId.style.color = colorWhite;
      DOMId.style.fontWeight = "bold";

      btnStyleMn.backgroundColor = colorWhite;
      btnStyleMn.color = colorBlue;
      btnStyleMn.fontWeight = "normal";

      btnStyleCl.backgroundColor = colorWhite;
      btnStyleCl.color = colorBlue;
      btnStyleCl.fontWeight = "normal";

      cntStyleSt.display = "block";
      cntStyleCl.display = "none";
      cntStyleMn.display = "none";
   }
   if(elementId == "call-btn") 
   {
      DOMId.style.backgroundColor = colorBlue;
      DOMId.style.color = colorWhite;
      DOMId.style.fontWeight = "bold";

      btnStyleSt.backgroundColor = colorWhite;
      btnStyleSt.color = colorBlue;
      btnStyleSt.fontWeight = "normal";

      btnStyleMn.backgroundColor = colorWhite;
      btnStyleMn.color = colorBlue;
      btnStyleMn.fontWeight = "normal";

      cntStyleSt.display = "none";
      cntStyleCl.display = "block";
      cntStyleMn.display = "none";
   }
   
}
function renderMain(pills)
{
  //removeFromStorage();
   //alert("function "+divContent);
   


   document.getElementById(mainContent).innerHTML = "";
   for(var i=0; i<pills.length; i++)
   {

      btnIdSpan = "btnId_"+i;
      btnIdBtn = "btnId_"+i+"_btn";
      divContent = divContent+'<div class="card">'+
                                 '<div class="card-block">'+
                                    '<h4 class="card-title">'+pills[i]+'</h4>'+
                                    '<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card&#39;s content.</p>'+
                                    '<input id="'+btnIdBtn+'" type="button" class="btn btn-default dynamic-button" aria-label="Left Align" style="visibility:hidden">'+
                                       '<span id="'+btnIdSpan+'" class="glyphicon glyphicon-apple" aria-hidden="true" onClick="pillCheck(this.id)"> Beriem si liek</span>'+
                                    '</input>'+
                                 '</div>'+
                              '</div></br>'
   }
   //removeFromStorage();
   document.getElementById(mainContent).innerHTML = divContent;
   
   //disableSelectIdsMain();
   
   
   divContent="";
}


function renderStats(dosage)
{
   //alert(divContent);
   for(var i=0; i<dosage; i++)
   {
      divContent = divContent+'<h3>Status '+(i+1)+'</h3><br>';
   }
   //alert(divContent);
   document.getElementById(statContent).innerHTML = divContent;

   divContent="";
}
function renderCall(dosage)
{
   //alert(divContent);
   for(var i=0; i<dosage; i++)
   {
      divContent = divContent+'<h3>Whatever '+(i+1)+'</h3><br>';
   }
   //alert(divContent);
   document.getElementById(callContent).innerHTML = divContent;

   divContent="";
}


function pillCheck(spanId)
{
    //alert("ids: "+disabledIds);
    debugVariable = spanId+"_btn";
    document.getElementById(spanId).className = "glyphicon glyphicon-ok";
    document.getElementById(spanId).innerHTML = " Mnam :)";
    document.getElementById(debugVariable).disabled = true;
    
    //alert(disabledIds.length + " : " + spanId);
      
    //alert("nonexistent value");
    disabledIds.push(spanId);
    pushToStorage(checkedValueKey, disabledIds);
    
    
    //getFromStorage();
}



function disableSelectIdsMain()
{
    //alert("disabking: "+disabledIds);
   for (var i = 0; i < disabledIds.length; i++) 
   {
      debugVariable = disabledIds[i]+"_btn";
      //alert(disabledIds[i]);
      document.getElementById(disabledIds[i]).className = "glyphicon glyphicon-ok";
      document.getElementById(disabledIds[i]).innerHTML = " Mnam :)";
      document.getElementById(debugVariable).disabled = true;
      //removeFromStorage();
   }
   
}

function getFromStorage(key)
{     //alert("key: "+key);
      if(key == checkedValueKey)
      {
        disabledIds = JSON.parse(storage.getItem(key));

        if(disabledIds == null)
        {
            disabledIds = [];
        }
      }
      if(key == pillsArr)
      {
        PillArr = JSON.parse(storage.getItem(key));
      }
      if(key == daytime)
      {
        DayPeriod = JSON.parse(storage.getItem(key));
        //alert(DayPeriod);
      }
}
function pushToStorage(key, value)
{
    storage.setItem(key, JSON.stringify(value));
}
function removeFromStorage(key)
{
    if(key == checkedValueKey)
    {
     storage.removeItem(key);
    }
    if(key == pillsArr)
    {
     storage.removeItem(key);
    }
    if(key == daytime)
    {
     storage.removeItem(key);
    }
}

function checkTime(i) 
{
    return (i < 10) ? "0" + i : i;
}


document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
    // Handle the back button
}

document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
    // Handle the back button
}

document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
    // Handle the back button
}

document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
    // Handle the back button
}










