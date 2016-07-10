import React from 'react';
import RichText from './richtext';
var $ = require('jquery');
import UploadFiles from './Dropzone.js';

export default class PostForm extends React.Component {
   
    constructor(props){
        super(props);
        this.state = {formText:"", 
                     intro:""};
    }
  getRichText(value) {
//    $('#form-text').attr("value",value);
        this.setState({formText:value});
  }
  getRichIntro(value){
      this.setState({intro:value});
  }

  getImageFiles(addFiles, dF){
      this.setState({imageFiles: addFiles, deleteFiles : dF});
  }

  render() {
    return (
       <form id="addpost"   action="" enctype="multipart/form-data"  onSubmit={this.handleSubmit.bind(this)}>
	  <fieldset> 
	
            <h1 class="aligncenter">Add a new Post</h1>
    <div> 
	        <label  >Title
        <input id="given-name" name="postTitle"  type="text" value={this.props.model.postTitle} placeholder="First name only" required autofocus/> 
		</label>
    </div>
    <div> 
        <UploadFiles  name="imageFile" onUpload={this.getImageFiles.bind(this)} images={this.props.model.images}/>
    </div>
     <div > 
        <label class="btn btn-default btn-file placecenter">Add Video
        <input id="video" name="videoFile" type="file"  placeholder="videos" multiple="multiple" autofocus/> 
		</label>
     </div>
     <div> 
        <RichText  id="form-text" name="text" value={this.props.model.postContent.text} onChange={this.getRichText.bind(this)}/>
    </div>
      <div > 
        <RichText name="intro" value="" onChange={this.getRichIntro.bind(this)} value={this.props.model.postContent.intro}/>    
      </div>
  	<div > 
	    <button type="submit" class="btn btn-default placeenter">Add Post</button> 
    </div> 
  </fieldset> 
</form> );
  }
 htmlEncode(value){
  //create a in-memory div, set it's inner text(which jQuery automatically encodes)
  //then grab the encoded contents back out.  The div never exists on the page.
  return $('<div/>').text(value).html();
}

 handleSubmit(e){
    e.preventDefault();
    var form = document.querySelector('form');
    var formData = new FormData(form);
    this.state.addFiles.forEach( (image) => {
        formData.append("imageFile", image);
    });
    formData.append("deleteFile", this.state.deleteFiles);
    formData.append("posttext",this.state.formText);
    formData.append("intro",this.state.intro);

    for (var [key, value] of formData.entries()) { 
        console.log(key, value);
    }
    var URL = 'http://localhost:8080/Blog/createpost'; 

    if(this.props.model){
        URL = 'http://localhost:8080/Blog/editpost/'+this.props.model.id; 
    } 
    $.ajax({
        url: URL,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function(formData){
            alert(formData);
        } 
    });
    return false;
  }
}
//    zxdca   <RichText  > </RichText> //id="message"  name="posttext" type="" placeholder="Post Content"  -->
// <RichText  id="asdasda" value="zxczxc"></RichText>
// <input id="image" name="imageFile"   type="file" placeholder="images" multiple="multiple" autofocus/>
