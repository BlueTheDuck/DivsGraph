var AppDivs = {};
AppDivs.numsUsed = [];
AppDivs.amntUsed = [];

var AppGraph = {}
AppGraph.g = document.getElementById("graph").getContext('2d');
AppGraph.pointSize = 5;
AppGraph.g.fillText("Bruh, like, bruh",30,30)

AppGraph.point = function(x,y) {
    g.beginPath();
    g.arc(x,y,pointSize,0,Math.PI*2);
    g.fill();
}

AppDivs.getDivs = function(n) {
    if(n==0)return 0;
    if(n==1)return 1;
    if(n==2)return 2;
    AppDivs.numsUsed = [];
    AppDivs.amntUsed = [];
    AppDivs.factorize(n);
    res = AppDivs.numsUsed.length;
    console.log("%i has %i divs",n,res);
    return res;
}

AppDivs.factorize = function(n) {//40
    var limit = Math.ceil(Math.sqrt(n));
    //console.log("Limiting search to %i",limit);
    for(var i=2;i<=limit;i++) {
        if(n%i==0) {
            AppDivs.numsUsed.push(i);
            //console.log("%1.f is divisor of %1.f",i,n);
        }
    }
    var arrLength = AppDivs.numsUsed.length-1;
    var last = AppDivs.numsUsed[arrLength];
    for(var i=0;i<arrLength;i++) {
        //console.log("%i * %i = %i",AppDivs.numsUsed[i],last,AppDivs.numsUsed[i]*last);
        AppDivs.numsUsed.push(AppDivs.numsUsed[i]*last);
    }
    AppDivs.numsUsed.push(1);
    AppDivs.numsUsed.push(n);
    if(AppDivs.numsUsed.indexOf(n)!=AppDivs.numsUsed.lastIndexOf(n))
        AppDivs.numsUsed.pop();
}

var divs = [];

function process() {
    divs = [];
    var lim = Number(document.getElementById("lim").value);
    var ini = Number(document.getElementById("ini").value);
    for(var i=ini;i<=lim;i++) {
        divs.push(AppDivs.getDivs(i));
    }
    console.log(divs);
}