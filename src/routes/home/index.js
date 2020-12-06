import { h, Component } from 'preact';
import style from './style.css';
import UploadFiles from "../../components/upload-files.component";

class Home extends Component {
   
    constructor(props) {
    super(props);
      this.state = {
        selectedFile: null
      }
    }
    
    onSubmit = e => {
	 this.setState({
	     selectedFile: e.target.files[0],
	     loaded: 0,
	 })
//    alert(this.state.selectedFile);
    e.preventDefault();
   }

    render(_, { value }) {
	return (
	<div class={style.home}>

	<UploadFiles/>

   </div>
	);
    }
}

export default Home;
