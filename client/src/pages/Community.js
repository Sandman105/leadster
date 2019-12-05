import React, { Component } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { Link } from "react-router-dom";
import { getAllPostings, createSubscription } from "../utils/API.js";

class Community extends Component {
    state = {
        posts: []
    };

    componentDidMount() {
        getAllPostings().then(res => {
            console.log(res);
            this.setState({ posts: res.data });
            // res.data.map(data => <Header><div><Card title={data.title} description={data.description} id={data.id} /></div></Header>);
        });
    };



    render() {
        return (
            <>
                <Header />
                <div>
                    {this.state.posts.map(post => (
                        <Card title={post.title} description={post.description} id={post.id} key={post.id} />
                    ))}
                </div>
            </>
        )
    }
}

export default Community;
