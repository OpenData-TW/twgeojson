var mainland, mtw, mercator, mercatorTW, slice$ = [].slice;
mainland = d3.geo.conicEqualArea().parallels([23.5, 24.5]).rotate([-121, 0]).center([0, 23.6]);
mtw = function(){
  var mainland, kme, ljf, projection;
  mainland = d3.geo.conicEqualArea().parallels([23.5, 24.5]).rotate([-123, 0]).center([0, 23.6]);
  kme = d3.geo.conicEqualArea().parallels([23.5, 24.5]).rotate([-121.7, 0]).center([0, 23.6]);
  ljf = d3.geo.conicEqualArea().parallels([23.5, 24.5]).rotate([-123.4, 0]).center([0, 24.6]);
  projection = function(arg$){
    var lon, lat;
    lon = arg$[0], lat = arg$[1];
    switch (false) {
    case !(lon < 118.5):
      return kme;
    case !(lat > 25.8):
      return ljf;
    default:
      return mainland;
    }
  };
  function mtw(coordinates){
    return projection(coordinates)(coordinates);
  }
  mtw.scale = function(x){
    if (!arguments.length) {
      return mainland.scale();
    }
    mainland.scale(x);
    kme.scale(x);
    ljf.scale(x);
    return mtw.translate(mainland.translate());
  };
  mtw.translate = function(x){
    var dx, dy, dz;
    dx = x[0], dy = x[1];
    if (!arguments.length) {
      return mainland.translate();
    }
    dz = mainland.scale();
    mainland.translate(x);
    kme.translate(x);
    ljf.translate(x);
    return mtw;
  };
  return mtw.scale(8000);
};
mercator = (function(){
  mercator.displayName = 'mercator';
  var prototype = mercator.prototype, constructor = mercator;
  function mercator(arg$){
    var this$ = this instanceof ctor$ ? this : new ctor$;
    if (arg$ != null) {
      this$.scale = arg$.scale, this$.translate = arg$.translate;
    }
    this$.call2 = bind$(this$, 'call2', prototype);
    this$.m = d3.geo.mercator();
    if (this$.scale) {
      this$.m.scale(this$.scale);
    }
    if (this$.translate) {
      this$.m.translate(this$.translate);
    }
    return this$;
  } function ctor$(){} ctor$.prototype = prototype;
  prototype.call2 = function(){
    var args;
    args = slice$.call(arguments);
    return this.m.apply(this, args);
  };
  return mercator;
}());
mercatorTW = (function(superclass){
  var prototype = extend$((import$(mercatorTW, superclass).displayName = 'mercatorTW', mercatorTW), superclass).prototype, constructor = mercatorTW;
  function mercatorTW(arg$){
    var ref$, ref1$, this$ = this instanceof ctor$ ? this : new ctor$;
    ref$ = arg$ != null
      ? arg$
      : {}, this$.scale = (ref1$ = ref$.scale) != null ? ref1$ : 50000, this$.translate = (ref1$ = ref$.translate) != null
      ? ref1$
      : [-16550, 3560];
    this$.call = bind$(this$, 'call', prototype);
    this$.call2 = bind$(this$, 'call2', prototype);
    mercatorTW.superclass.apply(this$, arguments);
    return this$;
  } function ctor$(){} ctor$.prototype = prototype;
  prototype.call2 = function(arg$){
    var x, y;
    x = arg$[0], y = arg$[1];
    return console.log('call2');
  };
  prototype.call = function(arg$){
    var x, y;
    x = arg$[0], y = arg$[1];
    if (x < 118.5) {
      x += 1.3;
    }
    if (y > 25.8) {
      x -= 0.2;
      y -= 1;
    }
    return this.m([x, y]);
  };
  return mercatorTW;
}(mercator));
function bind$(obj, key, target){
  return function(){ return (target || obj)[key].apply(obj, arguments) };
}
function extend$(sub, sup){
  function fun(){} fun.prototype = (sub.superclass = sup).prototype;
  (sub.prototype = new fun).constructor = sub;
  if (typeof sup.extended == 'function') sup.extended(sub);
  return sub;
}
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}