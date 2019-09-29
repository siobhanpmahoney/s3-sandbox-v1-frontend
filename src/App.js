import React from 'react';
import logo from './logo.svg';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      song: "https://siobhan-fileupload-sandbox-9222019.s3.amazonaws.com/Appliance_20190504.m4a"
    }
  }

  // var request = require("request");
  //
  // var options = { method: 'GET',
  //   url: 'https://siobhan-fileupload-sandbox-9222019.s3.amazonaws.com/Appliance_20190504.m4a',
  //   headers:
  //    { 'cache-control': 'no-cache',
  //      Connection: 'keep-alive',
  //      'accept-encoding': 'gzip, deflate',
  //      'Postman-Token': 'a59ae0ec-ee97-4c50-9109-d42b70dd6b6f,ec01472c-5840-45cf-8499-81fd5fc46c0b',
  //      'Cache-Control': 'no-cache',
  //      Accept: '*/*',
  //      'User-Agent': 'PostmanRuntime/7.15.0',
  //      Authorization: 'AWS4-HMAC-SHA256 Credential=AKIA2HQ3ZJEDXFLZNFQS/20190922/us-east-1/s3/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=f9d8698f178542e4c7389292bc5919b360e913810907e8c39fa68660ff8cbc45',
  //      'X-Amz-Date': '20190922T225529Z',
  //      'X-Amz-Content-Sha256': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  //      Host: 'siobhan-fileupload-sandbox-9222019.s3.amazonaws.com' } };
  //
  // request(options, function (error, response, body) {
  //   if (error) throw new Error(error);
  //
  //   console.log(body);
  // });


  componentDidMount() {
    // fetch("https://siobhan-fileupload-sandbox-9222019.s3.amazonaws.com/Appliance_20190504.m4a", {
    //   method: 'GET',
    //   headers: {
    //     'cache-control': 'no-cache',
    //     'Content-Type': 'application/json',
    //     'Connection': 'keep-alive',
    //     'accept-encoding': 'gzip, deflate',
    //     'Accept': '*/*',
    //     'Authorization': 'AWS4-HMAC-SHA256 Credential=AKIA2HQ3ZJEDXFLZNFQS/20190922/us-east-1/s3/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=f9d8698f178542e4c7389292bc5919b360e913810907e8c39fa68660ff8cbc45',
    //     'X-Amz-Date': '20190922T225529Z',
    //     'X-Amz-Content-Sha256': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    //     'Host': 'siobhan-fileupload-sandbox-9222019.s3.amazonaws.com'
    //   }
    // })
    // .then(response => {
    //   console.log(response)
    //   return response
    // })
    // .then(res => this.setState({
    //   song: res.url
    // }))
    fetch("https://siobhan-fileupload-sandbox-9222019.s3.amazonaws.com/?versions&list-type=2&prefix=album2", {
          method: 'GET',
          headers:  { 'cache-control': 'no-cache',
     'Connection': 'keep-alive',
     'accept-encoding': 'gzip, deflate',
     'Cache-Control': 'no-cache',
     'Accept': '*/*',
     'Authorization': 'AWS4-HMAC-SHA256 Credential=AKIA2HQ3ZJEDXFLZNFQS/20190923/us-east-1/s3/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=90f35dfa4aa38596c677d942f4420fac9eb1f5cd3bac23efde81a5bcc38efa61',
     'X-Amz-Date': '20190923T045454Z',
     'X-Amz-Content-Sha256': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
     'Host': 'siobhan-fileupload-sandbox-9222019.s3.amazonaws.com' }})
        .then(xml => {
          return xml
        })
        .then(html => {
          console.log(html)
          debugger
          return html
        })
  }

  render() {
    if (!this.state.song) {
      return <div>loading</div>
    } else {
    return (
      <div>
        This is a test
        <audio controls>
          <source src={this.state.song} />
        </audio>
      </div>
    )
  }
  }
}


export default App;
