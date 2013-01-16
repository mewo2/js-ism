"use strict";

function grad(v, dx) {
  var n = v.length;
  var g = [(v[1] - v[0])/dx]
  for (var i = 1; i < n - 1; i++) {
    g.push((v[i+1] - v[i-1]) * .5 / dx);
  }
  g.push((v[n-1] - v[n-2])/dx);
  return g;
}

function tridiag(a, b, c, v) {
  var n = v.length;
  for (var i = 1; i < n; i++) {
    var m = a[i] / b[i-1];
    b[i] -= m * c[i-1];
    v[i] -= m * v[i-1];
  }
  var x = [v[n-1] / b[n-1]];
  for (var i = n - 2; i >= 0; i--) {
    x.unshift((v[i] - c[i] * x[0]) / b[i]);
  }
  return x;
}
var constants = {
  'rho_i': 910,
  'rho_w': 1028,
  'rho_m': 3300,
  'theta': 3000,
  'B0': 2.207,
  'C': 0.16612,
  'K': 1.17,
  'n': 3,
  'p': 3,
  'Q': 78800,
  'R': 8.31,
  'Tr': 273.39,
  'g': 9.81
};
function paramSet(extras) {
  var params = {};
  for (var p in constants) {
    params[p] = constants[p];
  }
  for (var p in extras) {
    params[p] = extras[p];
  }
  return params;
}
function greenland() {
  var params = paramSet({
    'm': 7.5,
    'dx': 36000,
    'dt': 40,
    'omega': 1.0,
    'Ab': 1.21e-10,
    'climate': greenlandClimate
  });
  var state = {'params': params};
  state.t = 0;
  state.Tf = 0;
  state.b = [-2230.77, -2292.63, -2250.39, -2061.61, -1406.43, -626.842,
    -350.303, -259.054, -223.468, -156.348, -69.5695, 654.747, 727.329, 
    718.217, 621.243, 552.613, 476.599, 345.435, 184.03, 31.9247, -75.7639,
    -56.0242, 35.8462, 106.573, 94.9412, 160.722, 379.913, 626.069, 
    838.234, 643.812, 720.549, 907.735, 1152.31, 1415.01, 1318.98, 856.985, 
    -170.996, -267.75, 5.62864, 192.311, 323.31, -29.2944, -80.286, 
    -277.126, -897.685];
  
  state.h = [-2230.77, -2292.63, -2250.39, -2061.61, -1406.43, -626.842, 
    -350.303, -259.054, -223.468, -156.348, -69.5695, 962.503, 1697.24, 
    1963.24, 2222.07, 2486.46, 2716.23, 2879.01, 2989.49, 3069.93, 3141.31,
    3210.37, 3274.68, 3333.28, 3376.35, 3361.4, 3291.88, 3194.59, 3092.49,
    2981.29, 2856.08, 2716.93, 2490.21, 2197.69, 1822.74, 856.985, 
    -170.996, -267.75, 5.62864, 192.311, 323.31, -29.2944, -80.286, 
    -277.126, -897.685];
  
  params.longitude = [71.66666667, 70.34090909, 69.01515152, 67.68939394, 
    66.36363636, 65.03787879, 63.71212121, 62.38636364, 61.06060606, 
    59.73484848, 58.40909091, 57.08333333, 55.75757576, 54.43181818, 
    53.10606061, 51.78030303, 50.45454545, 49.12878788, 47.8030303, 
    46.47727273, 45.15151515, 43.82575758, 42.5, 41.17424242, 39.84848485, 
    38.52272727, 37.1969697, 35.87121212, 34.54545455, 33.21969697, 
    31.89393939, 30.56818182, 29.24242424, 27.91666667, 26.59090909, 
    25.26515152, 23.93939394, 22.61363636, 21.28787879, 19.96212121, 
    18.63636364, 17.31060606, 15.98484848, 14.65909091, 13.33333333];
  
  state.H = [];
  params.b0 = []
  for (var i = 0; i < state.h.length; i++) {
    state.H.push(state.h[i] - state.b[i]);
    params.b0.push(state.b[i] + params.rho_i / params.rho_m * state.H[i]);
  }
  diagnostic(state);
  return state;
}

function antarctica() {
  var params = paramSet({
    'm': 59,
    'dx': 120000,
    'dt': 200,
    'omega': 2.5,
    'Ab': 9.56e-10,
    'climate': antarcticClimate
  });
  var state = {'params': params};
  state.t = 0;
  state.Tf = 0;
  params.latitude = [70, 70.8, 71.6, 72.4, 73.2, 74, 74.8, 75.6, 76.4,
    77.2, 78, 78.8, 79.6, 80.4, 81.2, 82, 82.8, 83.6, 84.4, 85, 84, 83, 82,
    81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64,
    63, 62, 61, 60];
  state.b = [0, -50, -100, 600, 800, 500, 400, 400, 400, 400, 400, 500, 
    400, 400, 500, 600, 700, 900, 1250, 1850, 2000, 1500, 1250, 1100, 1000,
    750, 300, 250, 0, -100, -50, 0, 500, 250, 200, 0, -200, -250, -200, 0,
    -0.1, -50, -100, -150, -200];
  state.h = [0, 1400, 2200, 2850, 3180, 3400, 3480, 3550, 3600, 3640, 3680,
    3700, 3710, 3720, 3730, 3735, 3740, 3800, 3950, 4020, 4000, 3850, 3760,
    3710, 3580, 3450, 3340, 3260, 3250, 3240, 3230, 3210, 3150, 3000, 2800, 
    2510, 2420, 2050, 1350, 675, -0.1, -50, -100, -150, -200];
  state.H = [];
  params.b0 = []
  for (var i = 0; i < state.h.length; i++) {
    state.H.push(state.h[i] - state.b[i]);
    params.b0.push(state.b[i] + params.rho_i / params.rho_m * state.H[i]);
  }
  diagnostic(state);
  return state;
}

function antarcticClimate(state) {
  var params = state.params;
  state.Tma = [];
  state.Tms = [];
  state.aabl = [];
  state.aacc = [];
  for (var i = 0; i < state.h.length; i++) {
    state.Tma.push(-15.15 - 0.012 * Math.max(state.h[i], state.sealevel) + state.Tf);
    state.Tms.push(16.81 - 0.00692 * Math.max(state.h[i], state.sealevel) - 0.27937 * params.latitude[i] + state.Tf);
    state.aabl.push(Math.min(Math.max(-1.4 * state.Tms[i], -10), 0));
    state.aacc.push(2.5 * Math.pow(2, state.Tma[i]/10));
  }
}

function greenlandClimate(state) {
  var params = state.params;
  state.Tma = [];
  state.Tms = [];
  state.aabl = [];
  state.aacc = [];
  for (var i = 0; i < state.h.length; i++) {
    state.Tma.push(-5.31 - 0.007992 * Math.max(state.h[i], state.sealevel) + state.Tf);
    state.Tms.push(7.29 - 0.006277 * Math.max(state.h[i], state.sealevel) + state.Tf);
    state.aabl.push(Math.min(Math.max(-1.4 * state.Tms[i], -10), 0));
    state.aacc.push((-2.4657 + params.longitude[i] * (0.13657 - 0.0016 * params.longitude[i])) * Math.pow(1.0533, Math.min(state.Tf, 0)));
  }
}
function diagnostic(state) {
  var params = state.params;
  state.sealevel = Math.max(Math.min(state.Tf * 15, 0), -150);
  state.T = state.Tf > 0 ? 0.5 * state.Tf + 263.15 : state.Tf + 263.15;
  state.T = Math.min(state.T, 273.15);
  state.A = params.m * Math.pow(params.B0, -params.n) * Math.exp(3*params.C/Math.pow(params.Tr - state.T, params.K) - params.Q/(params.R * state.T));

  state.h = [];
  state.Zstar = [];
  for (var i = 0; i < state.H.length; i++) {
    state.h.push(state.b[i] + state.H[i]);
    state.Zstar.push(Math.max(state.H[i] + params.rho_w / params.rho_i * Math.min(state.b[i] - state.sealevel, 0), 0.01));
  }
  state.gradh = grad(state.h, params.dx);
  params.climate(state);
  state.D = [];
  state.a = [];
  state.volume = 0;
  for (var i = 0; i < state.H.length; i++) {
    state.D.push((.4 * state.A * state.H[i] + params.Ab/state.Zstar[i]) 
                 * Math.pow(params.rho_i * params.g, params.n)
                 * Math.pow(state.H[i], params.n + 1)
                 * Math.pow(Math.abs(state.gradh[i]), params.n - 1)
      );
    state.a.push(state.aacc[i] + state.aabl[i]);
    state.volume += state.H[i] * params.dx;
  }
}

function prognostic(state) {
  var n = state.h.length;
  var params = state.params;
  var newstate = {
    'params': params,
    'Tf': state.Tf,
    't': state.t + params.dt	
  };
  newstate.b = [];
  var delta = [];
  for (var i = 0; i < n; i++) {
    newstate.b.push(state.b[i] + params.dt * (params.b0[i] - state.b[i] - params.rho_i / params.rho_m * state.H[i]) / params.theta);
    delta.push(state.H[i] + params.dt * state.a[i]);
  }
  var alpha_ = [0];
  var gamma_ = [];
  for (var i = 1; i < n; i++) {
    var val = params.dt / (4 * params.dx * params.dx) * (state.D[i] + state.D[i-1]);
    alpha_.push(val);
    gamma_.push(val);
  }
  delta[0] = state.H[0];
  delta[n-1] = state.H[n-1];
  gamma_.push(0);
  var alpha = [0];
  var beta = [1];
  var gamma = [0];
  var b = newstate.b;
  var H = state.H;
  var omega = params.omega;
  for (var i = 1; i < n-1; i++) {
    alpha.push(-omega * alpha_[i]);
    beta.push(omega * (1 + (alpha_[i] + gamma_[i])));
    gamma.push(-omega * gamma_[i]);
    delta[i] += alpha_[i] * b[i-1] - (alpha_[i] + gamma_[i]) * b[i] + gamma_[i] * b[i+1] + (1 - omega) * (gamma_[i] * H[i+1] - (alpha_[i] + gamma_[i] + 1) * H[i] + alpha_[i] * H[i-1]);
  }
  alpha.push(0);
  beta.push(1);
  gamma.push(0);
  newstate.H = tridiag(alpha, beta, gamma, delta);
  for (var i = 0; i < n; i++) {
    if ((state.H[i] == 0) && (newstate.b[i] < state.sealevel)) newstate.H[i] = 0; 
    if (newstate.H[i] < Math.max(0, (state.sealevel - state.b[i]) * params.rho_w / params.rho_i)) newstate.H[i] = 0;
  }
  newstate.alpha = alpha;
  newstate.alpha_ = alpha_;
  newstate.beta = beta;
  newstate.gamma = gamma;
  newstate.gamma_ = gamma_;
  newstate.delta = delta;
  return newstate;
}

function step(states) {
  var state = states[states.length - 1];
  console.log(state);
  var newstate = prognostic(state);
  diagnostic(newstate);
//      console.log(newstate);
  return newstate;
}
function timeseries(items, fn) {
  var data = items.map(function (it) {return [it.t/1e3, fn(it)]});
  return {
    'data': data,
  };
}
function section(items, varname) {
  var it = items[items.length-1];
  var data = [];
  var iv = it[varname];
  for (var i = 0; i < iv.length; i++) {
    data.push([i * it.params.dx / 1e3, iv[i]]); 
  }
  return {
    'data': data,
    'label': varname
  };
}
function performTask(numToBuild, numPerTick, initial, buildItem, update) {
  var pos = 1;
  var items = [initial];
  function iteration() {
    var j = Math.min(pos + numPerTick, numToBuild);
    for (var i = pos; i < j; i++) {
      items.push(buildItem(items));
    }
    pos += numPerTick;
    update(items);
    if (pos < numToBuild)
      setTimeout(iteration, 20);
  }
  iteration();
}

function startmodel(initial, plots) {
  performTask(20001, 10,
    initial,
    step,
    function (items) {
      for (var i = 0; i < plots.length; i++) {
        var plot = plots[i];
        var ps = plotsetup[i];
        var data = ps.data(items);
        plot.setData(data);
        plot.setupGrid();
        plot.draw();
      }
      var Tf = parseFloat($("#tempforcing").val());
      //console.log(Tf);
      items[items.length-1].Tf = Tf;
    }
  );
}	
var plotsetup = [
  {
    'div': '#icevolume',
    'data': function (items) {
      return [timeseries(items, 
    	    function (it) {return 100 * it.volume / items[0].volume}
    	  )];
    },
    'ylabel': "Ice volume (% relative)",
    'xlabel': "Time (ky)"
  },
  {
    'div': '#elevation',
    'data': function (items) {
      return [section(items, 'b'), section(items, 'h')];
    },
    'ylabel': "Elevation (m)",
    'xlabel': "Distance (km)"
  },
  {
    'div': '#tforcing',
    'data': function (items) {
      return [timeseries(items,
    	    function (it) {return it.Tf})];
    },
    'ylabel': "Thermal forcing (K)",
    'xlabel': "Time (ky)"
  },
  {
    'div': '#massbalance',
    'data': function (items) {
      return [section(items, 'a'), section(items, 'aacc'), section(items, 'aabl')];
    },
    'ylabel': "Mass balance (m/y)",
    'xlabel': "Distance (km)"
  },
  {
    'div': '#temperature',
    'data': function (items) {
      return [section(items, 'Tms'), section(items, 'Tma')];
    },
    'ylabel': "Temperature (&deg;C)",
    'xlabel': "Distance (km)"
  }
];

$(function () {
  var plots = [];
  for (var i = 0; i < plotsetup.length; i++) {
    var ps = plotsetup[i];
    var options = {
  	  yaxis: {
        'axisLabel': ps.ylabel,
        'axisLabelPadding': 10
      },
      xaxis: {
        'axisLabel': ps.xlabel
      },
      'series': {'shadowSize': 0}
    };
    plots.push($.plot($(ps.div), [[]], options));
  }
  startmodel(greenland(), plots);
});