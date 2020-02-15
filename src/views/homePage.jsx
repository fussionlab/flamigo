import React, {Component, Fragment} from 'react';
import SliderApp from '../components/sliderApp';
import {Card, Button} from 'react-bootstrap';
import axios from "axios";

  
export default class HomePage extends Component{
   
     
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      ViewLikeList:[],
      commentsList:[],
      filterView:[]
    };
  }
  async componentDidMount() {
    this.refreshList();
    this.fetchViewLike();
    this.fetchComments();
    
  }
  refreshList = () => {
    axios
      .get("https://api.fussionweb.co.in/api/")
      .then(res =>{ const todoList = res.data.items;
          this.setState({todoList}); console.log(this.state.todoList)})
      
      .catch(err => console.log(err));
  }
  fetchViewLike =() =>{
    axios
      .get("https://api.fussionweb.co.in/api/views/read/")
      .then(res =>{ const ViewLikeList = res.data.items;
          this.setState({ViewLikeList}); console.log(this.state.ViewLikeList) } )
      
      .catch(err => console.log(err));
  }
  fetchComments =()=>{
    axios
      .get("https://api.fussionweb.co.in/api/comments/read/")
      .then(res =>{ const commentsList = res.data.items;
          this.setState({commentsList}) })
      
      .catch(err => console.log(err));
  }
  
  LinkClick =(id, views)   =>{
   
    const viewcounts = parseInt(views) + 1; 
    
      axios.put("https://api.fussionweb.co.in/api/posts/update/", {id:id, views: viewcounts})
      .then(window.location.replace(`/blog/${id}`))
      .catch((response) => console.log('error', response));
  }   
  
      
    render(){
    const {todoList,  commentsList} = this.state;
   const Comments =(id)=>{
     return commentsList.filter(c => c.post_id ===id).length
     }
   
    const  itemsIterateMap =  todoList.map((item, index) =>
      <div className="col-md-6 pb-3" key={index}>
      <Card >
        <Card.Img variant="top" src={item.image} />
        <Card.Body>
            <Card.Title>{item.title} </Card.Title>
            <Card.Text>{item.body.substring(0, 100)+' [...]'}
            </Card.Text>
    <Button variant="link" className="float-right " onClick={()=>this.LinkClick(item.id, item.views)}><span className="span"> <span>Read More </span> <i className="fa fa-arrow-right"></i></span></Button>
        </Card.Body>
        <Card.Footer key={index} >
            <div className="d-flex">
               <div className="m-1 p-1"><span className={item.views>0?"color-4 ":""}><i className={"fa fa-eye" }></i> </span><span> {item.views!==0?item.views:0}</span></div>
               <div className="m-1 p-1"><span className={item.likes>0?'color-3':''}><i className={"fa fa-heart "}></i></span><span> {item.likes!==0?item.likes:0}</span></div>
               <div className="m-1 p-1" ><span className={Comments(item.id)>0?'color-5':''}><i className={"fa fa-comment"}></i></span><span> {Comments(item.id)}</span></div>
             </div>
           </Card.Footer>
         
    </Card>
    </div>
      );
        return (
          
        <Fragment>
            <SliderApp />
            <div className="container">
                <div className="row pb-5">
                    <div className="col-md-12 col-xl-12 col-lg-12 pb-5">
                        <h2>Recent Post</h2>
                    </div>
                    {itemsIterateMap }
                </div>
            </div>
        </Fragment>
        
        )
    }
}
