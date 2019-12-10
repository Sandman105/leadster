import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import Header from '../components/Header';
import GlobalContext from '../components/Global/context';
import Card from '../components/Card';
import { getPostingsSavedByUser } from "../utils/API.js";

class CommunitySavedDetail extends Component {
    static contextType = GlobalContext
    state = {
        savedPostList: [],
        // isLoggedIn: false,
        // isEmployer: null
    }

    componentDidMount() {
        this.setState({
            isEmployer: sessionStorage.getItem('isEmployer'),
            isLoggedIn: sessionStorage.getItem('isLoggedIn')
        })
        this.handleGetSavedPostList();
    }

    handleGetSavedPostList = () => {
        getPostingsSavedByUser(sessionStorage.getItem('userId'))
            .then(res => {
                console.log("userid: ", sessionStorage.getItem('userId'));
                console.log("saved jobs: ", res);
                // (res.data).map(element => element.postID)
                const savedPostListFromData = res.data.map(post => {
                    return {
                        id: post.postID,
                        title: post.title,
                        url: `/community-job-detail?userid=${sessionStorage.getItem('userId')}?postid=${post.postID}`
                    }
                });
                console.log(savedPostListFromData);
                return this.setState({
                    savedPostList: savedPostListFromData
                });
            }).catch(err => {
                console.log("err: ", err);
            });
    };

    render() {
        // console.log(this.context);
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        const isEmployer = sessionStorage.getItem('isEmployer');
        if ((!isLoggedIn)) {
            return <Redirect to='/login' />
        } else if (parseInt(isEmployer) === 1 && isLoggedIn) {
            return <Redirect to='employer-posts' />
        }
        return (
            <>
            <Header />
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
