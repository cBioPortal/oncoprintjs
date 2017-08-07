var Oncoprint = require('./src/js/oncoprint.js');

$(document).ready(function() {
    window.oncoprint = new Oncoprint('#oncoprint');
    var data = [];
    while (data.length < 1000) {
        // ---
        // getting random test data from 0 to 10
        // data.push({'sample':Math.random(), data:Math.random()*10});

        // getting random test data from 10 to 20
        // data.push({'sample':Math.random(), data:(Math.random()*10) + 10});

        // getting random test data from -10 to 10
        data.push({'sample':Math.random(), data:(Math.random() * 7500) - 5000});

        // getting random test data from -10 to 0
        // data.push({'sample':Math.random(), data:(Math.random()*10) - 10});

        // getting random test data from -20 to -10
        // data.push({'sample':Math.random(), data:(Math.random() * (-20000)) - 1000});
    }
    var rule_set_params = {
        type: 'bar',
        value_key: 'data',
        // value_range:[0,10],
        // value_range:[10,20],
        // value_range:[-10,10],
        // value_range:[-10,0],
        // value_range:[-21000,-1000],
        legend_label: 'Data',
        log_value: true
    };
    window.oncoprint.addTracks([{'data':data, 'rule_set_params': rule_set_params, 'data_id_key':'sample'},
        {'data':data, 'rule_set_params': rule_set_params, 'data_id_key':'sample'},
        {'data':data, 'rule_set_params': rule_set_params, 'data_id_key':'sample'},
        {'data':data, 'rule_set_params': rule_set_params, 'target_group':1, 'data_id_key':'sample'},
        {'data':data, 'rule_set_params':rule_set_params, 'target_group':2, 'data_id_key':'sample'}]);

    window.addTracks = function() {
        var tracks_to_add = [];
        for (var i=0; i<30; i++) {
            tracks_to_add.push({'data':data, 'rule_set_params':rule_set_params, 'target_group':3, 'data_id_key':'sample'});
        }
        window.oncoprint.addTracks(tracks_to_add);
    }
});
