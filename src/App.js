import React, {useCallback} from 'react';
import logo from './logo.svg';
import './App.css';
import {useDropzone} from 'react-dropzone'
import MyDropzone from './MyDropzone'


class App extends React.Component {
  constructor(props) {
    super(props)

  }



  render() {
    return(
      <div>
        <div>Dropzone hook:</div>
        <MyDropzone />
      </div>
    )
  }
}


export default App;
