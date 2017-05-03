import React from 'react';
import DatasetListItem from './dataset_list_item'

const DatasetList = ({ dataset }) => {
  if (dataset.length === 0) {
    return <div>Upload some data!</div>;
  }
  const data = dataset.slice(1);
  const datasetItems = data.map(obj => {
    return <DatasetListItem key={obj.id} dataElement={obj} />
  });

  return (
    <div className='panel panel-default'>
      <div className='panel-heading'>Dataset</div>
      <table className='table'>
        <tbody>
          <tr>
            <th>{dataset[0].x} (x-values)</th>
            <th>{dataset[0].y} (y-values)</th>
          </tr>
          {datasetItems}
        </tbody>
      </table>
    </div>
  );
}

export default DatasetList;