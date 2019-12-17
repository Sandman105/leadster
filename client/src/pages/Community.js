import React, { Component } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
//import { Link } from "react-router-dom";
import { getAllPostings, queryDB } from "../utils/API.js";
import GlobalContext from '../components/Global/context'
import { Redirect } from 'react-router-dom';

const communityButton = {
    backgroundColor: '#666666',
    border: 'none',
    borderRadius: '10px',
    color: 'white',
    padding: '10px 15px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: '600',
    fontFamily: "'Righteous', cursive",
    margin: '4px 2px',
    cursor: 'pointer',
}

const newPosts = {
    color: 'black',
    fontFamily: "'Righteous', cursive",
    textAlign: 'center'
}

class Community extends Component {
    _isMounted = false;
    static contextType = GlobalContext;
    state = {
        postList: [],
        searchText: null,
        searchBool: false,
        searchRes: null
    };

    componentDidMount() {
        this._isMounted = true;
        getAllPostings().then(res => {
            // console.log(res);
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

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSearchButton = () => {
        const { searchText } = this.state
        queryDB(searchText).then(res => {
            const postListFromData = res.data.map(post => {
                return {
                    id: post.id,
                    title: post.title,
                    url: `/community-job-detail?userid=${sessionStorage.getItem('userId')}&postid=${post.id}`
                }
            });

            this.setState({
                searchBool: true,
                searchRes: postListFromData
            });
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        const isEmployer = sessionStorage.getItem('isEmployer');
        const savePageUrl = `/community-saved-detail?userid=${sessionStorage.getItem('userId')}`;
        // console.log(this.context);
        // console.log("state: ", this.state);
        if (isLoggedIn !== "true") {
            return <Redirect to='/login' />
        } else if (parseInt(isEmployer) === 1 && isLoggedIn) {
            return <Redirect to='/employer-posts' />
        }
        return (
            <>
                <Header />
                <a href={savePageUrl}><button style={communityButton}>Go to save page</button></a>
                <input type="text" placeholder="Key Word Search (e.g. 'graphic').." name='searchText' onChange={this.handleInputChange}></input>&nbsp;
                <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.handleSearchButton}>Search</button>
                <div>
                    {this.state.searchBool ? this.state.searchRes.map(res => (<Card style={newPosts} title={res.title} key={res.id} href={res.url}/>)) : this.state.postList.map(post => (
                        <Card style={newPosts} title={post.title} key={post.id} href={post.url} />
                    ))}
                </div>
            </>
        )
    }
}

export default Community;
