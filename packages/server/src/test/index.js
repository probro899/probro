

var tmpamount=100000;
var tmptenor=12;
var tmpirr=parseFloat(10/100);
var p_hlemi;
var tmpgp;
var tmpk;
tmpk		= 1/(1+tmpirr*1/12);
tmpgp		= (Math.pow(tmpk,tmptenor)-1)/(tmpk-1)*tmpk;
p_hlemi = tmpamount/tmpgp/1;
p_hlemi= Math.round(p_hlemi);

console.log(p_hlemi);
