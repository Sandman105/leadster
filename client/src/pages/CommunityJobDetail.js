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

    state = {
        postDetail: {},
        savedPostList: []
    }


    componentDidMount() {
        this.handleGetpostDetail();
        this.handleCheckSave();
    };

    handleCheckSave = () => {
        getPostingsSavedByUser(userId)
            .then(res => {
                console.log(res);
                const savedPostListFromData = res.data.map(post => {
                    return {
                        id: post.id
                    }
                });
                return this.setState({
                    savedPostList: savedPostListFromData
                });
            })
            .catch(err => console.log(err));
    };

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
                    style={communityButton}
                    disabled={!this.state.savedPostList.includes(postId) ? true : undefined}
                    className={"btn btn-success btn-sm"}
                    onClick={() => this.handleSavePost(userId, postId)}
                >
                    SAVE
                </button>
                <button
                    style={communityButton}
                    disabled={this.state.savedPostList.includes(postId) ? true : undefined}
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