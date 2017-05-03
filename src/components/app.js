import React, { Component } from 'react';
import UploadFile from './upload_file';
import DatasetList from './dataset_list';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataset: [],
    };
  }

  uploadDataset(xValues, yValues) {
    const dataset = [];
    for (let i = 0; i < xValues.length; i += 1) {
      let obj = {};
      obj.id = i;
      obj.x = xValues[i];
      obj.y = yValues[i];
      dataset.push(obj);
    }
    this.setState({dataset});
  }

  render() {
    return (
      <div>
        <UploadFile onUploadChange={(xValues, yValues) => this.uploadDataset(xValues, yValues)} />
          <br />
        <DatasetList dataset={this.state.dataset} />
      </div>
    );
  }
}
