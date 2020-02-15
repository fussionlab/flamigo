import React, { Component, Fragment } from "react";
import { Breadcrumb } from "react-bootstrap";
import axios from "axios";
import Moment from "react-moment";
import Style from "./blogPage.module.scss";

//import fetchViewsLikes from "./blogFunction"
export default class Blog extends Component {
  constructor(props) {
    super(props);
    //const {ShowReply} = this.props
    this.state = {
      blogList: {},
      commentList: [],
      ReplyList: [],
      LastCommentDate: '',
      LastReplyDate: '',
      showReply: '',
      newComment:{username: '',
      content:''},
      newReply:{replyUsername:'',replyContent:''}

    };
    this.handleChange = this.handleChange.bind(this);
    this.handelCommentSubmit = this.handelCommentSubmit.bind(this);
    this.handelRelpySubmit = this.handelReplySubmit.bind(this);
    this.PostLike = this.PostLike.bind(this);
  }
  async componentDidMount() {
    this.fetchBlogList();
    this.fetchCommentList();
    this.fetchReplyList();
    // this.fetchViewsLikes();
  }
  fetchBlogList = () => {
    axios
      .get("https://api.fussionweb.co.in/api/" + this.props.match.params.id)
      .then(res => {
        const blogList = res.data;
        this.setState({ blogList });
        console.log(this.state.blogList);
      })

      .catch(err => console.log(err));
  };
  fetchCommentList = () => {
    axios
      .get(
        "https://api.fussionweb.co.in/api/comments/readonce/?id=" +
          this.props.match.params.id
      )
      .then(res => {
        const commentList = res.data.item;
        this.setState({ commentList });
        console.log(this.state.commentList);
      })

      .catch(err => console.log(err));
  };
  fetchReplyList = () => {
    axios
      .get(
        "https://api.fussionweb.co.in/api/reply/readonce/?id=" +
          this.props.match.params.id
      )
      .then(res => {
        const ReplyList = res.data.item;
        this.setState({ ReplyList });
        console.log(this.state.ReplyList);
      })

      .catch(err => console.log(err));
  };
  
  replyFilter = id => {
    return this.state.ReplyList.filter(el => {
      return el.comment_id === id;
    });
  };
  
  //Avatar
  AvatarColorChange=(o)=>{const r=o.toUpperCase();return"A"===r|"B"===r?"bg-color-1":"C"===r|"D"===r?"bg-color-2":"E"===r|"F"===r?"bg-color-3":"G"===r|"H"===r?"bg-color-4":"I"===r|"J"===r?"bg-color-5":"K"===r|"L"===r?"bg-color-6":"M"===r|"N"===r?"bg-color-7":"O"===r|"P"===r?"bg-color-8":"Q"===r|"R"===r?"bg-color-9":"S"===r|"T"===r?"bg-color-10":"U"===r|"V"===r?"bg-color-11":"W"===r|"X"===r?"bg-color-12":"Y"===r|"Z"===r?"bg-color-13":void 0}
 
  //Update Likes
  PostLike = (like, id) => {
    const increase = parseInt(like) + 1;
    axios
      .put("https://api.fussionweb.co.in/api/posts/update/", {
        id: id,
        likes: increase
      })
      .then(this.fetchBlogList())

      .catch(err => console.log(err));
  };

  //Post comments
  handleChange(key,type) {
    return function (e) {
      const state = type==='comment'?this.state.newComment:this.state.newReply;
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
    
  }
  
  handelCommentSubmit = e => {
    e.preventDefault();
    const {username, content} =this.state.newComment;
    const  item = { post_id: this.props.match.params.id, 'username':username, 'content':content}
   // alert(item.post_id +' '+item.content);
    axios
      .post("https://api.fussionweb.co.in/api/comments/create/", item)
      .then(()=>{this.fetchCommentList();this.setState({content:'',username:''})})
      .catch(err => console.log(err));
      
  }
  handelReplySubmit = (id, e)=>{
    e.preventDefault();
    const postId =this.props.match.params.id;
    const {replyUsername, replyContent} =this.state.newReply;
  
    
    const  item = {comment_id:id, post_id:postId , 'username':replyUsername, 'content':replyContent}
  
    axios
      .post("https://api.fussionweb.co.in/api/reply/create/", item)
      .then(()=>{this.fetchReplyList(); this.resetState();  this.toggleReplyInput(postId); })
      .catch(err => console.log(err));
  }
   resetState = ()=>{
    this.setState(prevState => ({
      newReply: {
        ...prevState.newReply,          
        replyUsername:'',
        replyContent:''
      }
    }))
   }
  LastComment = val => {
    const r = val.length - 1;
    if (val[r]) return val[r].created_on;
  };

  toggleReplyInput = postId => {
    const { showReply } = this.state;
    let value;
    if (showReply === postId) {
      value = '';
    } else {
      value = postId;
    }
    this.setState({ showReply: value });
  };
  LastReply = val => {
    const r = val.length - 1;
    if (val[r]) return val[r].created_on;
  };

  render() {
    const blogItem = this.state.blogList;
    const {commentList, ReplyList } = this.state;
    const {username, content} = this.state;

    const replyIterationMap = id => {
      //console.log(id);
      return ReplyList.filter(c => c.comment_id === id).map((item, index) => (
        <div className="media d-block d-md-flex mt-3" key={index.toString()}>
          <div
            className={
              Style.avatar +
              " " +
              this.AvatarColorChange(item.username.substring(0, 1))
            }
          >
            <h2 className="text-center pt-1 mt-md-1 mt-sm-2 mt-lg-1">
              {item.username.substring(0, 1).toUpperCase()}
            </h2>
          </div>
          <div className="media-body text-center text-md-left ml-md-3 ml-0">
            <h5 className="mt-0 font-weight-bold">
              {item.username}
              <span
                className={
                  Style.relativeDate + "  float-right font-weight-lighter"
                }
              >
                <Moment format="MMM DD">{item.created_on}</Moment>
              </span>
            </h5>
            <p>{item.content}</p>

            <hr />
          </div>
        </div>
      ));
    };

    const commentIterationMap = commentList.map((item, index) => (
      <div
        className={Style.comments + " media d-block d-md-flex mt-4"}
        key={index.toString()}
      >
        <div
          className={
            Style.avatar +
            " " +
            this.AvatarColorChange(item.username.substring(0, 1))
          }
        >
          <h2 className="text-center pt-1 mt-md-1 mt-sm-2 mt-lg-1">
            {item.username.substring(0, 1).toUpperCase()}
          </h2>
        </div>
        <div className="media-body text-center text-md-left ml-md-3 ml-0">
          <h5 className="font-weight-bold">
            {item.username}
            <span
              className={
                Style.relativeDate + "  float-right font-weight-lighter"
              }
            >
              <Moment format="MMM DD">{item.created_on}</Moment>
            </span>
          </h5>
          <p>{item.content} </p>

          <div className="text-right pt-1">
            <button
              type="button"
              key={index}
              className={Style.reply + " reply btn btn-link"}
              onClick={() => this.toggleReplyInput(item.id)}
            >
              Replay
            </button>
          </div>
          <hr />
          {replyIterationMap(item.id)}
          {this.state.showReply === item.id ? (
            <form key={index.toString()} showreply={this.state.showReply} onSubmit={(e)=>this.handelRelpySubmit(item.id, e)}>
              <label htmlFor="user">Your Name</label>
              <input
                type="text"
                className="form-control"
                value={this.state.newReply.replyUsername} onChange={this.handleChange('replyUsername','')}
              />
              <label htmlFor="quickReplyFormComment">Your comment</label>
              <textarea
                className="form-control"
                id="quickReplyFormComment"
                rows="5"
                value={this.state.newReply.replyContent} onChange={this.handleChange('replyContent','')}
              ></textarea>
              <div className="mt-2 mb-2 float-right">
                <button className="btn btn-info btn-sm" type="submit">
                  Post
                </button>
              </div>
            </form>
          ) : (
            ''
          )}
        </div>
      </div>
    ));
    

    return (
      <Fragment>
        <div className="jumbotron">
          <Breadcrumb>
            <Breadcrumb.Item href=" ">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="#">Blog</Breadcrumb.Item>
            <Breadcrumb.Item active>{blogItem.title}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={Style.blog + " container"}>
          <div className="row">
            <div className="col-md-12">
              <h1>{blogItem.title}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10">
              <p className="text-justify">{blogItem.body}</p>
            </div>
            <div className="col-md-10">
              <p
                className={Style.like + " text-right"}
                onClick={() =>{ this.PostLike(blogItem.likes, blogItem.id); }}
              >
                <i className="fa fa-heart"></i>
              </p>
            </div>
            <div className="clear-fix"></div>
            <div className="col-md-10">
              <section className={Style.linkHolder + " mb-2 rounded"}>
                <ul className="clear-fix">
                  <li>
                    <h4>Created</h4>
                    <div className="created-at">
                      <span>
                        <b
                          className={
                            "roundedBtn btn-sm rounded-circle m-sm-1 bg-warning text-white font-weight-light"
                          }
                        >
                          C
                        </b>
                      </span>
                      <span>
                        <Moment format="MMM DD">{blogItem.created_on}</Moment>
                      </span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h4>
                        Last{" "}
                        {this.LastReply(ReplyList) <=
                        this.LastComment(commentList)
                          ? "Comment"
                          : "Reply"}
                      </h4>
                      <div>
                        <div>
                          <b
                            className={
                              "roundedBtn btn-sm rounded-circle m-sm-1 bg-info text-white font-weight-light"
                            }
                          >
                            {this.LastReply(ReplyList) <=
                            this.LastComment(commentList)
                              ? "C"
                              : "R"}
                          </b>
                          <span>
                            <Moment format="MMM 'DD">
                              {this.LastReply(ReplyList) <=
                              this.LastComment(commentList)
                                ? this.LastComment(commentList)
                                : this.LastReply(ReplyList)}
                            </Moment>
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <span className={Style.number}>{commentList.length}</span>
                    <h4>comments </h4>
                  </li>
                  <li className="text-center">
                    <span className={Style.number}>{ReplyList.length}</span>
                    <h4>replies</h4>
                  </li>
                  <span>
                    <li className={Style.secondray}>
                      <span className={Style.number}>{blogItem.views}</span>
                      <h4>views</h4>
                    </li>
                    <li className={Style.secondray}>
                      <span className={Style.number}>{blogItem.likes}</span>
                      <h4>likes</h4>
                    </li>
                  </span>
                </ul>
              </section>
            </div>
            <div className="clear-fix"></div>
            <div className="col-md-10">
              <div className={Style.comment}>
                <div className="card card-comments mb-3 wow fadeIn">
                  <div className="card-header font-weight-bold">
                    {commentList.length} Comments
                  </div>
                  <div className="card-body">{commentIterationMap}</div>
                  <div className="card-footer">
                  <h4>New Comment</h4>
                    <form onSubmit={this.handelCommentSubmit}>
                      <label htmlFor="user">Your Name</label>
                      <input type="text" className="form-control"  value={username||''}  onChange={this.handleChange('username','comment')}  />
                      <label htmlFor="FormComment">Your comment</label>
                      <textarea
                        className="form-control"
                        id="FormComment"
                        rows="5"
                         value={content||''} onChange={this.handleChange('content','comment') }
                        
                      ></textarea>
                      <div className="mt-2 mb-2 float-right">
                        <button className="btn btn-info btn-sm" type="submit" >
                          Post
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
