import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import Header from '../components/Header';
import GlobalContext from '../components/Global/context';
import Card from '../components/Card';
import { getPostingsSavedByUser } from "../utils/API.js";

const userId = sessionStorage.getItem('userId');

class CommunitySavedDetail extends Component {
    static contextType = GlobalContext
    state = {
        savedPostList: []
    }

    componentDidMount() {
        this.handleGetSavedPostList();
    }

    handleGetSavedPostList = () => {
        getPostingsSavedByUser(userId)
            .then(res => {
                console.log(res);
                const savedPostListFromData = res.data.map(post => {
                    return {
                        id: post.id,
                        title: post.title,
                        url: `/community-job-detail?userod=${userId}?postid=${post.id}`
                    }
                });
                return this.setState({
                    savedPostList: savedPostListFromData
                });
            })
    }

      render() {
        console.log(this.context)
        if ((!this.context.isLoggedIn)) {
            return <Redirect to='/login' />
        } else if (parseInt(this.context.user.isEmployer) === 1 && this.context.isLoggedIn) {
            return <Redirect to='/employer-posts' />
        }
        return (
            <>
                <div>
                    {this.state.savedPostList.map(post => (
                        <Card title={post.title} key={post.id} href={post.url} />
                    ))}
                </div>
            </>
        )
    }
}

export default CommunitySavedDetail;
