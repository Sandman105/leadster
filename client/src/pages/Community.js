import React, { Component } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
//import { Link } from "react-router-dom";
import { getAllPostings } from "../utils/API.js";
import GlobalContext from '../components/Global/context'
import { Redirect } from 'react-router-dom';

class Community extends Component {
    _isMounted = false;
    static contextType = GlobalContext;
    state = {
        postList: []
    };

    componentDidMount() {
        this._isMounted = true;
        getAllPostings().then(res => {
            console.log(res);
            const postListFromData = res.data.map(post => {
                return {
                    id: post.id,
                    title: post.title,
                    url: `/community-job-detail?userid=${sessionStorage.getItem('userId')}&postid=${post.id}`
                }
            });
            return this.setState({
                postList: postListFromData
            });
        }).catch(err => {
            console.log("err: ", err);
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        const isEmployer = sessionStorage.getItem('isEmployer');
        const savePageUrl = `/community-saved-detail?userid=${sessionStorage.getItem('userId')}`;
        console.log(this.context);
        if (isLoggedIn !== "true") {
            return <Redirect to='/login' />
        } else if (parseInt(isEmployer) === 1 && isLoggedIn) {
            return <Redirect to='/employer-posts' />
        }
        return (
            <>
                <Header />
                <a href={savePageUrl}><button>Go to save page</button></a>
                <div>
                    {this.state.postList.map(post => (
                        <Card title={post.title} key={post.id} href={post.url} />
                    ))}
                </div>
            </>
        )
    }
}

export default Community;
