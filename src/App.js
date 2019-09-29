import React, {useCallback} from 'react';
import logo from './logo.svg';
import './App.css';
import {useDropzone} from 'react-dropzone'
import MyDropzone from './MyDropzone'
import MyDropzone2 from './MyDropzone2'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      files: []
    }
  }

  addFileToState = (file) => {
    debugger
    let stateFiles = [...this.state.files, file]
    this.setState({
      files: stateFiles
    })
  }



  render() {
    console.log("state: ", this.state)
    return(
      <div>
        <div>Dropzone hook:</div>
        <MyDropzone addFileToState = {this.addFileToState}/>

        <hr />

      <MyDropzone2 addFileToState = {this.addFileToState}/>
      </div>
    )
  }
}


export default App;
