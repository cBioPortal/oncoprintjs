import json
import numpy as np
import pandas as pd

# populate heatmap fake data
hm_df = pd.DataFrame(
	columns=['TCGA-{0:02d}'.format(n) for n in range(50)],
	index=['GENE{0}'.format(n) for n in range(5)]
)

hm_df.ix[:, :] = np.random.randn(*hm_df.values.shape)
hm_df.ix[:3, :12] = np.random.randn(3, 12) + 1
hm_df.ix[3:, :12] = np.random.randn(2, 12) - 0.5
hm_df.ix[:2, 12:28] = np.random.randn(2, 28-12) - 2
hm_df.ix[2:, 28:35] = np.random.randn(3, 35-28) + 3
hm_df.ix[:, 45:] = 0

data = []
for row in hm_df.index:
	datum = {'gene': row, 'data': []}
	for col in hm_df.columns:
		datum['data'].append({'sample': col, 'vaf': hm_df.ix[row, col]})
	data.append(datum)

json_str = json.dumps(data, indent=4)

with open('heatmap-data.js', 'w') as f:
	f.write('var hm_data = ' + json_str + ';')
