import React from 'react';

const DatasetListItem = ({dataElement}) => {
  return (
      <tr>
        <td>{dataElement.x}</td>
        <td>{dataElement.y}</td>
      </tr>
  );
};

export default DatasetListItem;