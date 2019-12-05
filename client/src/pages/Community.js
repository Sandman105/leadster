import React, { Component } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
//import { Link } from "react-router-dom";
import { getAllPostings } from "../utils/API.js";

const userId = sessionStorage.getItem('userId');
const savePageUrl = `/community-saved-detail?userid=${userId}`

class Community extends Component {
    state = {
        postList: []
    };

    componentDidMount() {
        getAllPostings().then(res => {
            console.log(res);
            const postListFromData = res.data.map(post => {
                return {
                    id: post.id,
                    title: post.title,
                    url: `/community-job-detail?userod=${userId}?postid=${post.id}`
                }
            });
            return this.setState({
                postList: postListFromData
            });
        });
    };

    render() {
        return (
            <>
                <Header>
                </Header>

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
