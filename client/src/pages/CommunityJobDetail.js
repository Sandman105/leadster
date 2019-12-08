import React, { Component } from 'react';
import Header from '../components/Header';
// import Card from '../components/Card';
import { Redirect } from 'react-router-dom';
import GlobalContext from '../components/Global/context';
// import Card from '../components/Card';
import { createSubscription, getPostingById, getPostingsSavedByUser, deleteSubscription } from '../utils/API.js';

const url           = window.location.search;
const postId        = url.split("=")[2];
const userId        = sessionStorage.getItem('userId');
const isLoggedIn    = sessionStorage.getItem('isLoggedIn');
const isEmployer    = sessionStorage.getItem('isEmployer');

class CommunityJobDetail extends Component {
    static contextType = GlobalContext;
    state = {
        postDetail: {},
        savedPostList: [],
        btnDisable: null
    }

    componentDidMount() {
        this.handleGetPostDetail();
        this.handleCheckSave();
        console.log("context on load: ", this.context);
    };

    handleCheckSave = () => {
        getPostingsSavedByUser(userId)
            .then(res => {
                // console.log(res);
                const savedPostListFromData = res.data.map(post => post.postID);
                if (this.state.savedPostList.includes(parseInt(postId))) {
                    this.setState({
                        btnDisable: true,
                        savedPostList: savedPostListFromData
                    });
                }
                else {
                    this.setState({
                        btnDisable: false,
                        savedPostList: savedPostListFromData
                    });
                }
            })
            .catch(err => console.log("err: ", err));
    };

    handleGetPostDetail = () => {
        getPostingById(postId)
            .then(res => {
                console.log(res);
                return this.setState({
                    postDetail: res.data[0]
                });
            })
            .catch(err => console.log("err: ", err));
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
        // console.log("props: ", this.props.context);
        if ((!isLoggedIn)) {
            return <Redirect to='/login' />
        } else if (parseInt(isEmployer) === 1 && isLoggedIn) {
            return <Redirect to='/employer-posts' />
        }
        return (
            <>
                <Header/>
                <column>
                    <div>{this.state.postDetail.title}</div>
                    <div>{this.state.postDetail.description}</div>
                </column>
                <button
                    disabled={this.state.btnDisable ? true : undefined}
                    className={"btn btn-success btn-sm"}
                    onClick={() => this.handleSavePost(postId, userId)}
                >
                    SAVE
                </button>
                <button
                    disabled={this.state.btnDisable ? undefined : true}
                    className={"btn btn-danger btn-sm"}
                    onClick={() => this.handleUnSavePost(postId, userId)}
                >
                    UNSAVE
                </button>

            </>
        );
    };
};

export default CommunityJobDetail;
