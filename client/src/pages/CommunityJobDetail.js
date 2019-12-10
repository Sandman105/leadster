import React, { Component } from 'react';
import Header from '../components/Header';
// import Card from '../components/Card';
import { Redirect } from 'react-router-dom';
import GlobalContext from '../components/Global/context';
// import Card from '../components/Card';
import { createSubscription, getPostingById, getPostingsSavedByUser, deleteSubscription } from '../utils/API.js';



const communityButton = {

    backgroundColor: '#666666',
    border: 'none',
    borderRadius: '10px',
    color: 'white',
    padding: '5px 15px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: '600',
    fontFamily: "'Righteous', cursive",
    margin: '4px 2px',
    cursor: 'pointer',
}

class CommunityJobDetail extends Component {
    static contextType = GlobalContext;
    state = {
        postDetail: {},
        // savedPostList: [],
        btnDisable: null,
        // postId: url.split("=")[2],
        // isLoggedIn: false,
        // isEmployer: null
    }

    componentDidMount() {
        // this.setState({
        //     isLoggedIn: sessionStorage.getItem('isLoggedIn'),
        //     isEmployer: sessionStorage.getItem('isEmployer')
        // });
        this.handleGetPostDetail();
        this.handleCheckSave();
        // console.log("context on load: ", this.context);
    };

    handleCheckSave = () => {
        getPostingsSavedByUser(sessionStorage.getItem('userId'))
            .then(res => {
                console.log('result: ', res);
                const savedPostListFromData = (res.data).map(element => element.postID);
                console.log('result data: ', savedPostListFromData);
                console.log(savedPostListFromData.includes(parseInt((this.props.location.search).split("=")[2])));
                if (savedPostListFromData.includes(parseInt((this.props.location.search).split("=")[2]))) {
                    this.setState({
                        btnDisable: true,
                    });
                }
                else {
                    this.setState({
                        btnDisable: false,
                    });
                }
            })
            .catch(err => console.log("err: ", err));
        console.log("Post ID: " + parseInt((this.props.location.search).split("=")[2]));
        console.log("Saved List: " + this.state.savedPostList);
    };

    handleGetPostDetail = () => {
        getPostingById((this.props.location.search).split("=")[2])
            .then(res => {
                console.log(res);
                return this.setState({
                    postDetail: res.data[0]
                });
            })
            .catch(err => console.log("err: ", err))
    };


    handleSavePost = (postId, userId) => {
        // console.log("card.js -- 8 -->", postId);
        // console.log("card.js -- 9 -->", userId);
        createSubscription(postId, userId)
            .then(() => {
                console.log("API successful");
                this.handleCheckSave();
            })
            .catch(err => { console.log("err: ", err) });
    };

    handleUnSavePost = (postId, userId) => {
        // console.log("Post: ", postId);
        // console.log("User: ", userId);
        deleteSubscription(postId, userId)
            .then(() => {
                console.log("Job unsaved!");
                this.handleCheckSave();
            })
            .catch(err => { console.log("err: ", err) });
    };

    render() {
        // console.log("context: ", this.context);
        // console.log("props: ", this.props);
        // console.log("url: ", url);
        // console.log("postid: ", (this.props.location.search).split("=")[2]);
        // console.log("state loggedin: ", this.state.isLoggedIn);
        // console.log("state employer: ", this.state.isEmployer);
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        const isEmployer = sessionStorage.getItem('isEmployer');
        if (!isLoggedIn) {
            return <Redirect to='/login' />
        } else if (parseInt(isEmployer) === 1 && isLoggedIn) {
            return <Redirect to='/employer-posts' />
        }
        return (
            <>
                <Header />
                <column>
                    <div>{this.state.postDetail.title}</div>
                    <div>{this.state.postDetail.description}</div>
                </column>
                <button
                    style={communityButton}
                    disabled={this.state.btnDisable ? true : undefined}
                    className={"btn btn-success btn-sm"}
                    onClick={() => this.handleSavePost((this.props.location.search).split("=")[2], sessionStorage.getItem('userId'))}
                >
                    SAVE
                </button>
                <button
                    style={communityButton}
                    disabled={this.state.btnDisable ? undefined : true}
                    className={"btn btn-danger btn-sm"}
                    onClick={() => this.handleUnSavePost((this.props.location.search).split("=")[2], sessionStorage.getItem('userId'))}
                >
                    UNSAVE
                </button>

            </>
        );
    };
};

export default CommunityJobDetail;
