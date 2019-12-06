import React, { Component } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { Redirect } from 'react-router-dom';
import GlobalContext from '../components/Global/context';
// import Card from '../components/Card';
import { createSubscription, getPostingById, getPostingsSavedByUser, deleteSubscription } from '../utils/API.js';


const url = window.location.search;
const postId = url.split("=")[2];
const userId = sessionStorage.getItem('userId');

class CommunityJobDetail extends Component {

    state = {
        postDetail: {},
        savedPostList: [],
        btnDisable: null,
        subscriptionId: null
    }


    componentDidMount() {
        this.handleGetPostDetail();
        this.handleCheckSave();
    };

    handleCheckSave = () => {
        getPostingsSavedByUser(userId)
            .then(res => {
                console.log(res);
                const savedPostListFromData = res.data.map(post => post.postID );
                const id = res.data.map(
                    post => {
                        if (post.postID === postId) {
                            return post.id
                        }
                    }
                )
                this.setState({
                    savedPostList: savedPostListFromData,
                    subscriptionId: id
                });
                console.log(this.state.subscriptionId);
            })
            .then(() => {
                console.log(typeof (this.state.savedPostList)[0]);
                console.log(typeof (postId));
                console.log(this.state.savedPostList.includes(parseInt(postId)));
                if (this.state.savedPostList.includes(parseInt(postId))) {
                    this.setState({ btnDisable: true });
                }
                else {
                    this.setState({ btnDisable: false });
                }
            })
            .catch(err => console.log(err));
    };

    handleGetPostDetail = () => {
        getPostingById(postId)
            .then(res => {
                console.log(res);
                return this.setState({
                    postDetail: res.data[0]
                });
            })
            .catch(err => console.log(err));
    };

    handleSavePost = (postId, userId) => {
        console.log("card.js -- 8 -->", postId);
        console.log("card.js -- 9 -->", userId);
        createSubscription(postId, userId)
            .then(console.log("API successful"))
            .then(this.handleCheckSave())
            .catch(err => { console.log("err: ", err) });
    };

    handleUnSavePost = (subscriptionId) => {
        console.log("Subscription ID: ", subscriptionId);
        deleteSubscription(subscriptionId)
            .then(console.log("Job unsaved!"))
            .then(this.handleCheckSave())
            .catch(err => { console.log("err: ", err) });
    };

    static contextType = GlobalContext

    render() {
        console.log(this.context)
        if (this.context.isLoggedIn) {
            return <Redirect to='/login' />

        }
        return (
            <>
                <Header>

                </Header>

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
                    onClick={() => this.handleUnSavePost(this.state.subscriptionId)}
                >
                    UNSAVE
                </button>

            </>
        );
    };
};

export default CommunityJobDetail;