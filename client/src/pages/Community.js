import React, { Component } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
//import { Link } from "react-router-dom";
import { getAllPostings } from "../utils/API.js";
import GlobalContext from '../components/Global/context'
import { Redirect } from 'react-router-dom';

const userId = sessionStorage.getItem('userId');
const savePageUrl = `/community-saved-detail?userid=${userId}`

class Community extends Component {

    _isMounted = false

    static contextType = GlobalContext

    state = {
        postList: []
    };

    componentDidMount() {
        this._isMounted = true


        getAllPostings().then(res => {
            console.log(res);
            if (this._isMounted) {
                this.setState({ posts: res.data });
                // res.data.map(data => <Header><div><Card title={data.title} description={data.description} id={data.id} /></div></Header>);
            }
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
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    render() {
        console.log(this.context)
        if (this.context.isLoggedIn) {
            return <Redirect to='/login' />
            
        }

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
