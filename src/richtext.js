    import React from 'react';
    import  ReactQuill from 'react-quill';
    import '../node_modules/quill/dist/quill.snow.css';
    
   export  default class  RichText  extends React.Component {
      
      constructor(){
          super();
          this.state = {text: ""};
      }
    
     onTextChange(value){
        this.setState({ text:value });
        this.props.onChange(value);

     }


      render() {
       
        return (
            <div>
            <ReactQuill theme="snow"
                  value={this.state.text}
                  onChange={this.onTextChange.bind(this)} />
       
      </div>
    );
      }
    } 

