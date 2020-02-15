import axios from 'axios';

 const fetchViewsLikes = () =>{
    axios
    .get("http://localhost:81/phpapi/api/views/readonce/?id" + this.props.match.params.id)
    .then(res => {
      const viewLikeList = res.data.item;
      this.setState({ viewLikeList });
      console.log(...this.state.viewLikeList);
    })

    .catch(err => console.log(err));
 }

 export  default   fetchViewsLikes() ;