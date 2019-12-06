import React, { Component } from 'react';
import Header from '../components/Header';
// import Card from '../components/Card';
import { createSubscription, getPostingById, getPostingsSavedByUser, deleteSubscription } from '../utils/API.js';

const url = window.location.search;
const postId = url.split("=")[2];
const userId = sessionStorage.getItem('userId');

class CommunityJobDetail extends Component {

    state = {
        postDetail: {}
    }


    componentDidMount() {
        this.handleGetpostDetail();
    };

    /* handleCheckSave = () => {
        getPostingsSavedByUser(userId)
            .then(res => { res.data.id === postId })
    }; */

    handleGetpostDetail = () => {
        getPostingById(postId)
            .then(res => {
                console.log(res);
                return this.setState({
                    postDetail: res.data
                });
            })
            .catch(err => console.log(err));
    };

    handleSavePost = (userId, postId) => {
        console.log("card.js -- 8 -->", postId);
        console.log("card.js -- 9 -->", userId);
        createSubscription(userId, postId)
            .then(console.log("API successful"))
            .catch(err => { console.log("err: ", err) });
    };

    handleUnSavePost = (userId, postId) => {
        deleteSubscription(userId, postId)
            .then(console.log("Job unsaved!"))
            .catch(err => { console.log("err: ", err) });
    };

    render() {
        return (
            <>
                <Header>

                </Header>

                <column>
                    <div>{this.state.postDetail.title}</div>
                    <div>{this.state.postDetail.description}</div>
                </column>
                <button
                    disabled={this.handleCheckSave() ? true : undefined}
                    className={"btn btn-success btn-sm"}
                    onClick={() => this.handleSavePost(userId, postId)}
                >
                    SAVE
                </button>
                <button
                    disabled={this.handleCheckSave() ? undefined : true}
                    className={"btn btn-alert btn-sm"}
                    onClick={() => this.handleUnSavePost(userId, postId)}
                >
                    UNSAVE
                </button>

            </>
        );
    };
};



export default CommunityJobDetail;