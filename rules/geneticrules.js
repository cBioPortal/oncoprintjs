// Feed this in as

// Mutation colors
var MUT_COLOR_MISSENSE = '#008000';
var MUT_COLOR_MISSENSE_PASSENGER = '#53D400';
var MUT_COLOR_INFRAME = '#993404';
var MUT_COLOR_INFRAME_PASSENGER = '#fe9929';
var MUT_COLOR_TRUNC = '#000000';
var MUT_COLOR_TRUNC_PASSENGER = '#708090';
var MUT_COLOR_FUSION = '#8B00C9';
var MUT_COLOR_PROMOTER = '#FFA942';
var MUT_COLOR_GERMLINE = '#FFFFFF';

var PROT_COLOR_UP = "#ff3df8";
var PROT_COLOR_DOWN = "#00E1FF";

const MUTATION_LEGEND_ORDER = 0;
const FUSION_LEGEND_ORDER = 1;
const GERMLINE_LEGEND_ORDER = 2;
const AMP_LEGEND_ORDER = 10;
const GAIN_LEGEND_ORDER = 11;
const HOMDEL_LEGEND_ORDER = 12;
const HETLOSS_LEGEND_ORDER = 13;
const MRNA_UP_LEGEND_ORDER = 20;
const MRNA_DOWN_LEGEND_ORDER = 21;
const PROT_UP_LEGEND_ORDER = 31;
const PROT_DOWN_LEGEND_ORDER = 32;

var non_mutation_rule_params = {
    // Default: gray rectangle
    '*': {
        shapes: [{
            'type': 'rectangle',
            'fill': 'rgba(190, 190, 190, 1)',
            'z': 1
        }],
        legend_label: "No alterations",
        legend_order: Number.POSITIVE_INFINITY // put at the end always
    },
    // Copy number alteration
    'disp_cna': {
        // Red rectangle for amplification
        'amp': {
            shapes: [{
                'type': 'rectangle',
                'fill': 'rgba(255,0,0,1)',
                'x': '0%',
                'y': '0%',
                'width': '100%',
                'height': '100%',
                'z': 2,
            }],
            legend_label: 'Amplification',
            legend_order: AMP_LEGEND_ORDER
        },
        // Light red rectangle for gain
        'gain': {
            shapes: [{
                'type': 'rectangle',
                'fill': 'rgba(255,182,193,1)',
                'x': '0%',
                'y': '0%',
                'width': '100%',
                'height': '100%',
                'z': 2,
            }],
            legend_label: 'Gain',
            legend_order: GAIN_LEGEND_ORDER
        },
        // Blue rectangle for deep devarion
        'homdel': {
            shapes: [{
                'type': 'rectangle',
                'fill': 'rgba(0,0,255,1)',
                'x': '0%',
                'y': '0%',
                'width': '100%',
                'height': '100%',
                'z': 2,
            }],
            legend_label: 'Deep Devarion',
            legend_order: HOMDEL_LEGEND_ORDER
        },
        // Light blue rectangle for shallow devarion
        'hetloss': {
            shapes: [{
                'type': 'rectangle',
                'fill': 'rgba(143, 216, 216,1)',
                'x': '0%',
                'y': '0%',
                'width': '100%',
                'height': '100%',
                'z': 2,
            }],
            legend_label: 'Shallow Devarion',
            legend_order: HETLOSS_LEGEND_ORDER
        }
    },
    // mRNA regulation
    'disp_mrna': {
        // Light red outline for upregulation
        'up': {
            shapes: [{
                'type': 'rectangle',
                'fill': 'rgba(0, 0, 0, 0)',
                'stroke': 'rgba(255, 153, 153, 1)',
                'stroke-width': '2',
                'x': '0%',
                'y': '0%',
                'width': '100%',
                'height': '100%',
                'z': 3,
            }],
            legend_label: 'mRNA Upregulation',
            legend_order: MRNA_UP_LEGEND_ORDER
        },
        // Light blue outline for downregulation
        'down': {
            shapes: [{
                'type': 'rectangle',
                'fill': 'rgba(0, 0, 0, 0)',
                'stroke': 'rgba(102, 153, 204, 1)',
                'stroke-width': '2',
                'x': '0%',
                'y': '0%',
                'width': '100%',
                'height': '100%',
                'z': 3,
            }],
            legend_label: 'mRNA Downregulation',
            legend_order: MRNA_DOWN_LEGEND_ORDER
        },
    },
    // protein expression regulation
    'disp_prot': {
        // small up arrow for upregulated
        'up': {
            shapes: [{
                'type': 'rectangle',
                'fill': PROT_COLOR_UP,
                'x':"0%",
                'y':"0%",
                'width':"100%",
                'height':"20%",
                'z': 4,
            }],
            legend_label: 'Protein Upregulation',
            legend_order: PROT_UP_LEGEND_ORDER
        },
        // small down arrow for upregulated
        'down': {
            shapes: [{
                'type': 'rectangle',
                'fill': PROT_COLOR_DOWN,
                'x':"0%",
                'y':"80%",
                'width':"100%",
                'height':"20%",
                'z': 4,
            }],
            legend_label: 'Protein Downregulation',
            legend_order: PROT_DOWN_LEGEND_ORDER
        }
    },
    // fusion
    'disp_fusion': {
        // tall inset purple rectangle for fusion
        'true': {
            shapes: [{
                'type': 'rectangle',
                'fill': MUT_COLOR_FUSION,
                'x': '0%',
                'y': '20%',
                'width': '100%',
                'height': '60%',
                'z': 5
            }],
            legend_label: 'Fusion',
            legend_order: FUSION_LEGEND_ORDER
        }
    },
    // germline
    'isGermline': {
        // white stripe in the middle
        'true': {
            shapes: [{
                'type': 'rectangle',
                'fill': MUT_COLOR_GERMLINE,
                'x': '0%',
                'y': '46%',
                'width': '100%',
                'height': '8%',
                'z': 7
            }],
            legend_label: 'Germline Mutation',
            legend_order: GERMLINE_LEGEND_ORDER
        }
    }
};

window.geneticrules = {};
window.geneticrules.genetic_rule_set_same_color_for_all_no_recurrence = {
    'type': 'gene',
    'legend_label': 'Genetic Alteration',
    'rule_params': $.extend({}, non_mutation_rule_params, {
        'disp_mut': {
            'trunc,inframe,missense,promoter,trunc_rec,inframe_rec,missense_rec,promoter_rec,trunc_germ,inframe_germ,missense_germ,promoter_germ,trunc_rec_germ,inframe_rec_germ,missense_rec_germ,promoter_rec_germ': {
                shapes: [{
                    'type': 'rectangle',
                    'fill': MUT_COLOR_MISSENSE,
                    'x': '0%',
                    'y': '33.33%',
                    'width': '100%',
                    'height': '33.33%',
                    'z': 6
                }],
                legend_label: 'Mutation',
                legend_order: MUTATION_LEGEND_ORDER
            }
        }
    })
};
window.geneticrules.genetic_rule_set_same_color_for_all_recurrence = {
    'type': 'gene',
    'legend_label': 'Genetic Alteration',
    'rule_params': $.extend({}, non_mutation_rule_params, {
        'disp_mut': {
            'missense_rec,inframe_rec,trunc_rec,missense_rec_germ,inframe_rec_germ,trunc_rec_germ': {
                shapes: [{
                    'type': 'rectangle',
                    'fill': MUT_COLOR_MISSENSE,
                    'x': '0%',
                    'y': '33.33%',
                    'width': '100%',
                    'height': '33.33%',
                    'z': 6
                }],
                legend_label: 'Mutation (putative driver)',
                legend_order: MUTATION_LEGEND_ORDER
            },
            'missense,inframe,trunc,promoter,promoter_rec,missense_germ,inframe_germ,trunc_germ,promoter_germ,promoter_rec_germ': {
                shapes: [{
                    'type': 'rectangle',
                    'fill': MUT_COLOR_MISSENSE_PASSENGER,
                    'x': '0%',
                    'y': '33.33%',
                    'width': '100%',
                    'height': '33.33%',
                    'z': 6
                }],
                legend_label: 'Mutation (unknown significance)',
                legend_order: MUTATION_LEGEND_ORDER
            },
        },
    })
};
window.geneticrules.genetic_rule_set_different_colors_no_recurrence = {
    'type': 'gene',
    'legend_label': 'Genetic Alteration',
    'rule_params': $.extend({}, non_mutation_rule_params, {
        'disp_mut': {
            'promoter,promoter_rec,promoter_germ,promoter_rec_germ': {
                shapes: [{
                    'type': 'rectangle',
                    'fill': MUT_COLOR_PROMOTER,
                    'x': '0%',
                    'y': '33.33%',
                    'width': '100%',
                    'height': '33.33%',
                    'z': 6,
                }],
                legend_label: 'Promoter Mutation',
                legend_order: MUTATION_LEGEND_ORDER
            },
            'trunc,trunc_rec,trunc_germ,trunc_rec_germ': {
                shapes: [{
                    'type': 'rectangle',
                    'fill': MUT_COLOR_TRUNC,
                    'x': '0%',
                    'y': '33.33%',
                    'width': '100%',
                    'height': '33.33%',
                    'z': 6,
                }],
                legend_label: 'Truncating Mutation',
                legend_order: MUTATION_LEGEND_ORDER
            },
            'inframe,inframe_rec,inframe_germ,inframe_rec_germ': {
                shapes: [{
                    'type': 'rectangle',
                    'fill': MUT_COLOR_INFRAME,
                    'x': '0%',
                    'y': '33.33%',
                    'width': '100%',
                    'height': '33.33%',
                    'z': 6,
                }],
                legend_label: 'Inframe Mutation',
                legend_order: MUTATION_LEGEND_ORDER
            },
            'missense,missense_rec,missense_germ,missense_rec_germ': {
                shapes: [{
                    'type': 'rectangle',
                    'fill': MUT_COLOR_MISSENSE,
                    'x': '0%',
                    'y': '33.33%',
                    'width': '100%',
                    'height': '33.33%',
                    'z': 6,
                }],
                legend_label: 'Missense Mutation',
                legend_order: MUTATION_LEGEND_ORDER
            },
        }
    })
};
window.geneticrules.genetic_rule_set_different_colors_recurrence = {
    'type': 'gene',
    'legend_label': 'Genetic Alteration',
    'rule_params': $.extend({}, non_mutation_rule_params, {
        'disp_mut': {
            'promoter,promoter_rec,promoter_germ,promoter_rec_germ': {
                shapes: [{
                    'type': 'rectangle',
                    'fill': MUT_COLOR_PROMOTER,
                    'x': '0%',
                    'y': '33.33%',
                    'width': '100%',
                    'height': '33.33%',
                    'z': 6,
                }],
                legend_label: 'Promoter Mutation',
                legend_order: MUTATION_LEGEND_ORDER
            },
            'trunc_rec,trunc_rec_germ': {
                shapes: [{
                    'type': 'rectangle',
                    'fill': MUT_COLOR_TRUNC,
                    'x': '0%',
                    'y': '33.33%',
                    'width': '100%',
                    'height': '33.33%',
                    'z': 6,
                }],
                legend_label: 'Truncating Mutation (putative driver)',
                legend_order: MUTATION_LEGEND_ORDER
            },
            'trunc,trunc_germ': {
                shapes: [{
                    'type': 'rectangle',
                    'fill': MUT_COLOR_TRUNC_PASSENGER,
                    'x': '0%',
                    'y': '33.33%',
                    'width': '100%',
                    'height': '33.33%',
                    'z': 6,
                }],
                legend_label: 'Truncating Mutation (unknown significance)',
                legend_order: MUTATION_LEGEND_ORDER
            },
            'inframe_rec,inframe_rec_germ': {
                shapes: [{
                    'type': 'rectangle',
                    'fill': MUT_COLOR_INFRAME,
                    'x': '0%',
                    'y': '33.33%',
                    'width': '100%',
                    'height': '33.33%',
                    'z': 6,
                }],
                legend_label: 'Inframe Mutation (putative driver)',
                legend_order: MUTATION_LEGEND_ORDER
            },
            'inframe,inframe_germ': {
                shapes: [{
                    'type': 'rectangle',
                    'fill': MUT_COLOR_INFRAME_PASSENGER,
                    'x': '0%',
                    'y': '33.33%',
                    'width': '100%',
                    'height': '33.33%',
                    'z': 6,
                }],
                legend_label: 'Inframe Mutation (unknown significance)',
                legend_order: MUTATION_LEGEND_ORDER
            },
            'missense_rec,missense_rec_germ': {
                shapes: [{
                    'type': 'rectangle',
                    'fill': MUT_COLOR_MISSENSE,
                    'x': '0%',
                    'y': '33.33%',
                    'width': '100%',
                    'height': '33.33%',
                    'z': 6,
                }],
                legend_label: 'Missense Mutation (putative driver)',
                legend_order: MUTATION_LEGEND_ORDER
            },
            'missense,missense_germ': {
                shapes: [{
                    'type': 'rectangle',
                    'fill': MUT_COLOR_MISSENSE_PASSENGER,
                    'x': '0%',
                    'y': '33.33%',
                    'width': '100%',
                    'height': '33.33%',
                    'z': 6,
                }],
                legend_label: 'Missense Mutation (unknown significance)',
                legend_order: MUTATION_LEGEND_ORDER
            },
        }
    })
};
