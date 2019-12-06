import React, { Component } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
//import { Link } from "react-router-dom";
import { getAllPostings } from "../utils/API.js";
import GlobalContext from '../components/Global/context'
import { Redirect } from 'react-router-dom';

class Community extends Component {

    _isMounted = false

    static contextType = GlobalContext

    state = {
        posts: []
    };

    componentDidMount() {
        this._isMounted = true


        getAllPostings().then(res => {
            console.log(res);
            if (this._isMounted) {
                this.setState({ posts: res.data });
                // res.data.map(data => <Header><div><Card title={data.title} description={data.description} id={data.id} /></div></Header>);
            }
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
