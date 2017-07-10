var AppDivs = {};
AppDivs.numsUsed = [];
AppDivs.amntUsed = [];

var AppGraph = {};
AppGraph.dom = document.getElementById("graph");
AppGraph.g = AppGraph.dom.getContext('2d');
AppGraph.pointSize = 1;
AppGraph.guideLines = false;
//AppGraph.g.fillText("Bruh, like, bruh",30,30)
AppGraph.size = {w:Number(AppGraph.dom.width),h:Number(AppGraph.dom.height)};

AppGraph.clear = function() {
    AppGraph.g.fillStyle = "white";
    AppGraph.g.fillRect(0,0,AppGraph.size.w,AppGraph.size.h);
}

AppGraph.draw = function(data,mode) {
    if(typeof(data)!="object") {
        console.error("Bruh, dis is not an obj");
        return;
    }
    if(data.length==0) {
        console.error("Bruh, dis obj is emti");
        return;
    }
    var m = mode;
    if(typeof(data.x)=="number"&&typeof(data.y)=="number") {//Just one point
        AppGraph.point(data.x,data.y);
    } else {
        //console.log("Dis is an arr of points");
        for(p of data) {
            //console.log(p);
            if(typeof(p.x)=="number"&&typeof(p.y)=="number") {
                if(m=="point")
                    AppGraph.point(p.x,p.y);
                if(m=="line2") {
                    //console.log("I'mma makin' da line at (%i;%i)",p.x,p.y);
                    AppGraph.g.lineTo(p.x,p.y);
                }
                if(m=="line") {
                    AppGraph.g.moveTo(p.x,p.y);
                    //console.log("I'mma startin' a line at (%i;%i)",p.x,p.y);
                    m = "line2";
                }
            }
        }
        switch(m) {
            case "line2":
            case "line":
                AppGraph.g.fillStyle = "black";
                AppGraph.g.stroke();
                //console.log("Da line has ben draft");
                break;
        }
    }
    return 0;
}
AppGraph.point = function(x,y) {
    with(AppGraph) {
        g.beginPath();
        g.arc(x,y,pointSize,0,Math.PI*2);
        g.fillStyle="black";
        g.fill();
    }
}

AppDivs.getDivs = function(n) {
    AppDivs.numsUsed = [];
    AppDivs.primes = [];
    if(n<3)return n;
    AppDivs.factorize(n);
    res = AppDivs.numsUsed.length;
    //console.log("%i has %i divs",n,res);
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
    var arrLength = AppDivs.numsUsed.length;
    var last = AppDivs.numsUsed[arrLength];
    for(var i=0;i<arrLength;i++) {
        var nNum = n/AppDivs.numsUsed[i];
        //console.log("%i / %i = %i",n,AppDivs.numsUsed[i],n);
        if(AppDivs.numsUsed.lastIndexOf(nNum)==-1)
            AppDivs.numsUsed.push(nNum);
    }
    //AppDivs.numsUsed.push(1);
    //AppDivs.numsUsed.push(n);
    /*if(AppDivs.numsUsed.indexOf(n)!=AppDivs.numsUsed.lastIndexOf(n))
        AppDivs.numsUsed.pop();*/
}

var domD = document.getElementById("d");
var domN = document.getElementById("n");
var divs = [];
var por = 0;//0-1
function process() {
    AppGraph.clear();
    divs = [];
    var max = 0;
    var min = 0;
    var maxn = 0;
    var minn = 0
    var lim = Number(document.getElementById("lim").value);
    var ini = Number(document.getElementById("ini").value);
    var rng = Math.max(lim-ini,1);
    /*min = AppDivs.getDivs(ini);
    max = min;*/
    divs.ini = ini;
    divs.lim = lim;
    divs.rng = rng;
    for(var n=ini,i=0;n<=lim;n++,i++) {
        var d = AppDivs.getDivs(i);
        if(d>max||i==0) {
            max = d;
            maxn = n;
        }
        if(d<min||i==0) {
            min = d;
            minn = n;
        }
        divs[i] = {};
        divs[i].x = AppGraph.size.w/rng*i;
        divs[i].d = d;
        por = i/rng;
    }
    divs.max = {d:max,n:maxn};
    divs.min = {d:min,n:minn};
    for(var i=0;i<divs.length;i++) {
        divs[i].y = AppGraph.size.h-AppGraph.size.h/max*divs[i].d;
        //console.log("(%i;%i)",divs[i].x,divs[i].y);
    }
    //console.log("Biggest: %i\nSmallest: %i",max,min);
    AppGraph.draw(divs,'point');
    if(AppGraph.guideLines==false)return;
    //console.log("Range: %i > %i",min,max);
    var horz = [];
    for(var d=0;d<max;d++) {
        var y = AppGraph.size.h-AppGraph.size.h/max*d;
        if(y%10==0) {
            AppGraph.draw([{x:0,y:y},{x:AppGraph.size.w,y:y}],'line');
        }
    }
}

function h() {
    if(divs.length==0)return;
    var rect = AppGraph.dom.getBoundingClientRect();
    var mouse = {x:event.clientX-rect.left,y:event.clientY-rect.top};
    i = Math.floor(mouse.x/(AppGraph.size.w/divs.rng));
    //console.log("N: %i has %i",Number(document.getElementById("ini").value)+i,divs[i].d);
    domD.innerText = divs[i].d;
    domN.value = divs.ini+i;
}
domN.onchange = function() {
    domD.innerText = divs[domN.value].d;
}