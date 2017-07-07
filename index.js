var AppDivs = {};
AppDivs.numsUsed = [];
AppDivs.amntUsed = [];

var AppGraph = {};
AppGraph.dom = document.getElementById("graph");
AppGraph.g = AppGraph.dom.getContext('2d');
AppGraph.pointSize = 5;
AppGraph.g.fillText("Bruh, like, bruh",30,30)
AppGraph.size = {w:AppGraph.dom.width,h:AppGraph.dom.height};

AppGraph.point = function(x,y) {
    g.beginPath();
    g.arc(x,y,pointSize,0,Math.PI*2);
    g.fill();
}

AppDivs.getDivs = function(n) {
    AppDivs.numsUsed = [];
    AppDivs.primes = [];
    if(n==0)return 0;
    /*if(n==1)return 1;
    if(n==2)return 2;*/
    AppDivs.factorize(n);
    res = AppDivs.numsUsed.length;
    console.log("%i has %i divs",n,res);
    return res;
}

AppDivs.factorize = function(n) {//40
    var limit = Math.sqrt(n);
    //console.log("Limiting search to %1.23f",limit);
    for(var i=1;i<=limit;i++) {
        if(n%i==0) {
            AppDivs.numsUsed.push(i);
            //console.log("%1.f is divisor of %1.f",i,n);
        }
    }
    AppDivs.numsUsed.push(n);
    var arrLength = AppDivs.numsUsed.length-1;
    var last = AppDivs.numsUsed[arrLength];
    for(var i=0;i<arrLength;i++) {
        var nNum = n/AppDivs.numsUsed[i];
        //console.log("%i / %i = %i",n,AppDivs.numsUsed[i],n);
        if(AppDivs.numsUsed.lastIndexOf(nNum)==-1)
            AppDivs.numsUsed.push(nNum);
    }
    //AppDivs.numsUsed.push(1);
    //AppDivs.numsUsed.push(n);
    if(AppDivs.numsUsed.indexOf(n)!=AppDivs.numsUsed.lastIndexOf(n))
        AppDivs.numsUsed.pop();
}

var divs = [];

function process() {
    divs = [];
    var max = 0;
    var min = 0;
    var lim = Number(document.getElementById("lim").value);
    var ini = Number(document.getElementById("ini").value);
    var rng = lim-ini;
    min = AppDivs.getDivs(ini);
    max = min;
    for(var n=ini+1,i=0;n<=lim;n++,i++) {
        var d = AppDivs.getDivs(i)
        if(d>max)
            max = d;
        if(d<min)
            min = d;
        divs[i] = {};
        divs[i].x = 0;
        //divs[i-ini-1] = {x:0,y:0};
        //divs.push(d);
    }
    console.log("Range: %i > %i",min,max);
}

function graphicate() {

}