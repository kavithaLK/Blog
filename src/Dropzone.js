import React from 'react';
import Dropzone from 'react-dropzone';
import _ from 'lodash';
export default class  UploadFiles extends React.Component{
    constructor(props){
        super(props);
        var mF = [];
        if(this.props.images){
            mF = this.props.images;
        }
        console.log(mF);
        this.state = {
                masterFiles:mF,
                files:[],
                deleteFiles: [],
                addFiles:[]
         }
    }
    
    onDrop(files) {
        var mF = this.state.masterFiles;
        var toBeAdded = this.state.addFiles;
        files.forEach((file) => {
            if(this.isNew(file)){
                 mF.push(file);
                 toBeAdded.push(file);
            }
        });
        this.setState({ masterFiles: mF,
      });
      console.log('Received files: ', files);
      console.log('Master Files: ' , this.state.masterFiles);
      this.props.onUpload(this.state.addFiles, this.state.deleteFiles);
    }
    isNew(file){
        var nonStringFilearr = this.state.masterFiles.filter((mFile) => {
            return typeof mFile !== 'string';
        });
        var arr = nonStringFilearr.filter((mFile) => {
            return mFile.name === file.name;
        });
        return arr.length <= 0;
    }
    onOpenClick() {
      this.refs.dropzone.open();
    }

    removeImage(file){
        var fname ;
         if (typeof file === 'string'){
            fname = file;
            this.state.deleteFiles.push(file);   
        } else{
            fname =  file.name;
        } 
        var mF = this.state.masterFiles.filter( (mFile) => {
            let mFname = mFile;
            if(typeof mFile !== 'string'){
                mFname = mFile.name;
            }
            return fname !== mFname; 
            });
        console.log(mF);
        this.setState({
            masterFiles: mF
        });
        console.log(this.state.masterFiles);
    }
    render() {
        return (
            <div>
                Drag and Drop in here.
                <Dropzone ref="dropzone" onDrop={this.onDrop.bind(this)}>
                </Dropzone>
                {this.state.masterFiles.length}
                {this.state.masterFiles.length > 0 ? <div>
                <h4>Uploading {this.state.masterFiles.length} files...</h4>
                     <div className="parent">{this.state.masterFiles.map((file) => {
                         var fileName = file;
                         var source = "http://localhost:8080/Blog/image/"+file;
                         if(typeof file !== 'string'){
                             fileName = file.name;
                             source = file.preview;
                         }
                         return <div className="img-wrap" key={fileName}>
                                    <span className="close" onClick={this.removeImage.bind(this, file)}>&times;</span>
                                    <img  className="child" key={fileName} src={source} />
                                </div>
                         
                         
                      })}</div>
                </div> : null}
            </div>
        );
    }
}
/*
File {preview: "blob:http%3A//localhost%3A3000/7f3e6e6a-3bc8-41f1-8378-4201b82b8dc9", name: "IMG_20160507_145425347.jpg", lastModified: 1462658066000, lastModifiedDate: Sat May 07 2016 14:54:26 GMT-0700 (Pacific Daylight Time), webkitRelativePath: ""…}
lastModified
:
1462658066000
lastModifiedDate
:
Sat May 07 2016 14:54:26 GMT-0700 (Pacific Daylight Time)
name
:
"IMG_20160507_145425347.jpg"
preview
:
"blob:http%3A//localhost%3A3000/7f3e6e6a-3bc8-41f1-8378-4201b82b8dc9"
"blob:http%3A//localhost%3A3000/a698fdc6-ded1-4992-b195-85fba8112acf"
size
:
1459151
type
:
"image/jpeg"
webkitRelativePath
:
""
__proto__
:
File


*/

/**
 [FilelastModified: 1462657629000
 lastModifiedDate: Sat May 07 2016 14:47:09 GMT-0700 (Pacific Daylight Time)
 name: "IMG_20160507_144708967.jpg"
 preview: "blob:http%3A//localhost%3A3000/a698fdc6-ded1-4992-b195-85fba8112acf"
 size: 1773963type: "image/jpeg"webkitRelativePath: ""__proto__: File]
 */
