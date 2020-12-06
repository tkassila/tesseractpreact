import React  from "preact/compat";
import { renderer, screen, Component, createRef } from "preact";
import UploadService from "../services/upload-files.service";
import Markup from 'preact-markup';
// const BrowserFS = require('browserfs')

export default class UploadFiles extends Component {

  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);

    this.state = {
      selectedFiles: undefined,
      currenFile: undefined,
      progress: 0,
      message: "",
      ocrtext: "",
      fileInfos: [],
      copySuccess: ''
    };

    this.linksaveref = createRef();
    this.domlink = null;
  }

    componentDidMount() {
      // this.domlink = React.findDOMNode(this.linksaveref); 
	/*
    UploadService.getFiles().then((response) => {
      this.setState({
        fileInfos: response.data,
      });
    });
    */
  }

  selectFile(event) {
    this.setState({
      selectedFiles: event.target.files[0],
    });
      console.log("selectedfiles: " + URL.createObjectURL(event.target.files[0]));
  }

  save(event) {
    const ocrtext = this.state;
      if (ocrtext == '')
	  return;

    // BrowserFS.writeFile('/home/tk/test.txt', ocrtext, function(err) {
    // fs.readFile('/test.txt', function(err, contents) {
    //   console.log(contents.toString());
	// });
	// console.log(err.toString());
   // });

  }
    
   upload(event) {
    let currentFile = this.state.selectedFiles;

    this.setState({
      progress: 0,
	currentFile: currentFile,
        ocrtext: "",
        copySuccess: ""
    });

      var data = new FormData()
      data.append('file', currentFile)

       /*

           headers: { 'Content-Type': 'multipart/form-data',
		          "Origins": "*",
			  "Accept": "*?*",
		      "mode": 'cors',
		      "Accept-Encoding": "gzip, deflate, br",
		      "Connection": "keep-alive"
		    },
       */

       // 	        "Origins": "*",
      //    UploadService.upload(currentFile, (event) => {
       const requestOptions = {
           method: 'POST',	         
           headers: { 
	       "Accept": "text/plain",
	       'Content-Type': 'multipart/form-data',
	        'Access-Control-Allow-Origin':'*'
		    },
        body: data
       };

       /*
//               signal: this.abortSignal,
       UploadService.fetchData( 'http://localhost:9998/tika/form',  {        
        method: 'POST',
        headers: {"Content-Type": "multipart/form-data",  'Accept': 'text/plain'},     
           body: currentFile })
           .then(responseData => {
	       if (Config.bDebug) console.log(responseData);
               return responseData;})
        .then(data => { 
            if (Config.bDebug)
            {
		console.log("data");
		console.log(data);
            }
        })
      .catch((error) => {
          console.error("error");
          console.error(error);
          return;
      });
      */

       fetch('http://localhost:9998/tika/form', requestOptions)
       .then(response => response.text())
           .then((response) => {
	       let strbody = response.replace(/(\r|\s|\n){3,}/mg, "").trim();
    	    //   console.log("resp data:");
      // console.log(strbody);    
        // Create blob link to download        
       // const url = window.URL.createObjectURL(
         // new Blob([strbody]));
        // const link = document.createElement('a');
        // renderer(link, this.linksaveref);
        // const link = document.getDOMNode("savelink");
        // screen.getByText('Save text into file');
        // const domlink = React.findDOMNode(this.linksaveref); 
        //this.domlink = React.findDOMNode(this.linksaveref); 
        //console.log("domlink");    
        //console.log(domlink);
        //this.domlink.href = url;
       // //  domlink.download = `FileName.pdf`;
       // this.domlink.setAttribute(
         // 'download',
         // `FileName.pdf`,
        // );
        // this.domlink.click();
        this.setState({
          message: null,
          ocrtext: strbody
        });

        })
/*      .then((files) => {
        this.setState({
          fileInfos: files.data,
        });
      })
*/
	  .catch((error) => {
	      console.log("catch error:" +error);
        this.setState({
          progress: 0,
          message: "Could not upload the file! " +error,
            currentFile: undefined,
	          ocrtext: undefined,
        });
      });                
  }

  copyToClipboard = (e) => {
    this.linksaveref.current.value = this.state.ocrtext;
    this.linksaveref.current.style="" 
    this.linksaveref.current.focus();
    this.linksaveref.current.select();
    document.execCommand('copy');
    this.linksaveref.current.value = "";
    this.linksaveref.current.style="display:none;";
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    this.setState({ copySuccess: 'Copied!' });
  };

    /*

        <div className="card">
          <div className="card-header">List of Files</div>
          <ul className="list-group list-group-flush">
            {fileInfos &&
              fileInfos.map((file, index) => (
                <li className="list-group-item" key={index}>
                  <a href={file.url}>{file.name}</a>
                </li>
              ))}
          </ul>
        </div>
    */

    /*
            <button
          className="btn btn-success"
          disabled={htmlocrtext == ""}
          onClick={this.save}
        >
          Save text into a file
        </button>
                */

                /*
                   {currentFile && (
          <div className="progress">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}
        */
       
  render() {
    const {
      selectedFiles,
      currentFile,
      progress,
      message,
      fileInfos,
      ocrtext,
    } = this.state;

    let htmlocrtext = ocrtext.replace(/(\r|\n)/mg, "<br/>");

    return (
      <div>
        <h2>Convert tika compatible or ocr document into text</h2>

        <label for="selectfile" className="btn btn-default">
          Open ocr file:  </label>      
          <input type="file" name="selectfile" 
          id="selectfileid" onChange={this.selectFile}           
          />            

        <button
          className="btn btn-success"
          disabled={selectedFiles == undefined}
          onClick={this.upload}
        >
          Convert file into text
        </button>

        <div className="alert alert-light" role="alert">
          {message}
        </div>

        <br/>
        {document.queryCommandSupported('copy') && htmlocrtext != "" && 
          <div>
            <button onClick={this.copyToClipboard} 
                  disabled={htmlocrtext == ""}>Copy into clipboard</button> 
            <space>  </space>{this.state.copySuccess}
            <textarea style="display:none;" type="textarea" ref={this.linksaveref}  
          name="textValue" value="" 
        />
          </div>
        }
	
        <br/>

        {htmlocrtext != "" &&
        <div className="card" >
          <label><b>Converted text:</b></label><br/><br/>
          <Markup markup={htmlocrtext}/>
        </div>
        }

      </div>
    );
  }
}

/*
          <Markup markup={htmlocrtext}/>

    	BrowserFS.install(window);
	BrowserFS.configure(
	   {
	       fs: 'LocalStorage'
	   },
	    function(e) {
		if (e) {
		    // An error happened!
		    throw e
		}
		// Otherwise, BrowserFS is ready-to-use!
		window.fs = window.require('fs')
	    });
*/