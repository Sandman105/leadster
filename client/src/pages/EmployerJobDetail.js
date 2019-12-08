import React, { Component } from 'react';
import Header from '../components/Header';
import { getPostingById, getUsersFromSavedPosting } from '../utils/API';
import { Redirect } from 'react-router-dom';
import GlobalContext from '../components/Global/context';

// import { Link } from "react-router-dom";

const url           = window.location.search;
const postId        = url.split("=")[2];
const isLoggedIn    = sessionStorage.getItem('isLoggedIn');
const isEmployer    = sessionStorage.getItem('isEmployer');

class EmployerJobDetail extends Component {
    static contextType = GlobalContext;
    state = {
        postDetail: {},
        seekerList: []
    }

    componentDidMount() {
        this.handleGetPostDetail();
        this.handleWhoSavedTheJob();
    }

    handleGetPostDetail = () => {
        getPostingById(postId)
            .then(res => {
                console.log(res);
                return this.setState({
                    postDetail: res.data
                });
            })
            .catch(err => console.log("err: ", err));
    }

    handleWhoSavedTheJob = () => {
        getUsersFromSavedPosting(postId)
            .then(res => {
                console.log("result from API: ", res);
                const seekerListFromData = res.data.email
                
                // map(seeker => {
                //     return {
                //         userID: seeker.email
                //     }
                // });
                return this.setState({
                    seekerList: [...this.state.seekerList, seekerListFromData]
                });
            })
            .catch(err => console.log("err: ", err));
    }

    render() {
        // console.log(this.context)
        if ((!isLoggedIn)) {
            return <Redirect to='/login' />
        } else if (parseInt(isEmployer) !== 1 && isLoggedIn) {
            return <Redirect to='/community' />
        }
        // console.log("seekerList: ", this.state.seekerList);
        return (
            <>
                <Header/>
                <div>
                    <div>{this.state.postDetail.title}</div>
                    <div>{this.state.postDetail.description}</div>
                </div>
                <div>
                    {!this.state.seekerList.length ? (
                        <h2 className="text-center">
                            No seeker save this job yet.
                        </h2>
                    ) : (
                        this.state.seekerList.forEach(email => {
                            console.log("email: ", email);
                            return (
                                <h2 className="text-center">{email}</h2>
                            )
                        })
                            // this.state.seekerList.map(seeker => {
                            //     return (
                            //         <div>{seeker.email}</div>
                            //     )
                            // })
                        )}
                </div>
            </>
        )
    }
}

export default EmployerJobDetail;
