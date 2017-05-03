import React, { Component } from 'react';
import Dropzone from 'react-dropzone'

class UploadFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      JSONFile: '',
      xJSONKey: '',
      yJSONKey: '',
      xValues: [],
      yValues: [],
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onJSONSubmit = this.onJSONSubmit.bind(this);
    this.onJSONUpload = this.onJSONUpload.bind(this);
  }
  render() {
    // console.log(this.state);
    return (
      <div>
        <form id='importJSONForm' onSubmit={this.onJSONSubmit} >
          <label>
            {'Import data (array of objects .json): '}
            <input type='file' accept={'.json'} onChange={this.onJSONUpload} />
          </label>
          <br />
          <label>
            {'JSON x-value key: '}
            <input id='xJSONKeyInput' name='xJSONKey' type='text' value={this.state.xJSONKey} onChange={this.onInputChange} placeholder={'x-value key'} />
          </label>
          <label>
            {'\tJSON y-value key: '}
            <input id='yJSONKeyInput' name='yJSONKey' type='text' value={this.state.yJSONKey} onChange={this.onInputChange} placeholder={'y-value key'} />
          </label>
          <input type='submit' value={'Submit JSON keys'} />
        </form>
        <Dropzone accept={'.csv,.tsv'} onDrop={(accepted, rejected) => this.onCSVUpload(accepted)}>
          {'drag csv/tsv here'}
        </Dropzone>
      </div>
    )
  }

  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value.trim(),
    });
  }

  onJSONUpload(event) {
    const read = new FileReader();
    const file = event.target.files[0];
    read.readAsBinaryString(file);
    read.onloadend = () => {
      this.setState({
        JSONFile: read.result,
      });
    }
  }

  onJSONSubmit(event) {
    event.preventDefault();
    if (this.state.JSONFile !== '' && this.state.xJSONKey !== '' && this.state.yJSONKey !== '') {
      const data = JSON.parse(this.state.JSONFile);
      const xKey = this.state.xJSONKey
      const yKey = this.state.yJSONKey;
      const xValues = [xKey];
      const yValues = [yKey];
      let skippedCount = 0;

      data.forEach(obj => {
        if (obj[xKey] && obj[yKey]) {
          xValues.push(obj[xKey]);
          yValues.push(obj[yKey]);
        } else {
          skippedCount += 1;
        }
      });
      if (skippedCount !== 0) {
        console.log("Skipped " + skippedCount + " objects that don't have both x and y keys");
      }

      this.setState({
        JSONFile: '',
        xJSONKey: '',
        yJSONKey: '',
        xValues,
        yValues,
      });

      this.props.onUploadChange(xValues, yValues);
    }
    else if (this.state.JSONFile === '') alert('Choose a JSON file!');
    else if (this.state.xJSONKey === '') alert('Input x-value key!');
    else if (this.state.yJSONKey === '') alert('Input y-value key!');
  }

  onCSVUpload(file) {
    const read = new FileReader();
    read.readAsBinaryString(file[0]);
    read.onloadend = () => {
      this.handleCSVUploadSuccess(file, read.result);
    }
  }

  handleCSVUploadSuccess(file, text) {
    let data;
    let separator = '';

    if (file[0].type === "text/csv") {
      separator = ',';
      data = text.trim().split(/\r\n|\n/);
    }
    if (file[0].type === "text/tab-separated-values") {
      separator = ' ';
      data = text.trim().split(/\r\n|\n/);
    }
    
    const xValues = [];
    const yValues = [];
    for (let i = 0; i < data.length; i += 1) {
      let values = data[i].split(separator);
      xValues.push(values[0]);
      yValues.push(values[1]);
    }

    this.setState({
      xValues,
      yValues,
    });

    this.props.onUploadChange(xValues, yValues);
  }
}

export default UploadFile;