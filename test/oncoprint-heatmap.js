
var oncoprint = new window.Oncoprint("#oncoprint", 800);
oncoprint.suppressRendering();

var onco_data = [
  {gene:'ABC',
   data:[{sample:'biopsy-1', vaf: 0.5},
         {sample:'biopsy-2', vaf: 0.7},
         {sample:'biopsy-3', vaf: 0.9},
         {sample:'biopsy-4', vaf: 1.0},
        ],
  },
  {gene:'DEF',
   data:[{sample:'biopsy-1', vaf: 1.0},
         {sample:'biopsy-2', vaf: 0.9},
         {sample:'biopsy-3', vaf: 0.7},
         {sample:'biopsy-4', vaf: 0.5},
        ],
  },
  {gene:'GHI',
   data:[{sample:'biopsy-1', vaf: 0.8},
         {sample:'biopsy-2', vaf: 0.3},
         {sample:'biopsy-3', vaf: 0.8},
         {sample:'biopsy-4', vaf: 0.2},
        ],
  },
];

var share_id = null;
for (var i = 0; i < onco_data.length; i++) {
  var track_params = {
    'rule_set_params': {
        'type': 'gradient',
        'legend_label': 'Heatmap',
        'value_key': 'vaf',
        'value_range': [0, 1],
        'colors': [[0,0,0,1],[0,0,255,1]],
        'value_stop_points': [0, 1],
        'null_color': 'rgba(224,224,224,1)'
    },
    'has_column_spacing': true,
    'track_padding': 5,
    'label': onco_data[i].gene,
    'sortCmpFn': function(d1, d2) {return 0;},
    'target_group': 0,
    'removable': true,
  };
  var new_hm_id = oncoprint.addTracks([track_params])[0];
  onco_data[i].track_id = new_hm_id;
  if (i === 0) {
    share_id = new_hm_id;
  } else {
    oncoprint.shareRuleSet(share_id, new_hm_id);
  }
}

oncoprint.hideIds([], true);
oncoprint.keepSorted(false);

for (var i = 0; i < onco_data.length; i++) {
  oncoprint.setTrackData(onco_data[i].track_id, onco_data[i].data, 'sample');
  oncoprint.setTrackInfo(onco_data[i].track_id, "");
  oncoprint.setTrackTooltipFn(onco_data[i].track_id, function(data) {
    return "<b>Sample: " + data.sample + "<br/>VAF: " + data.vaf.toString().slice(0, 4) + "</b>";
  });
}

oncoprint.keepSorted(true);
oncoprint.releaseRendering();
