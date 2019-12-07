import React, { Component } from 'react';
import Header from '../components/Header';
import { getPostingById, getUsersFromSavedPosting } from '../utils/API';
import { Redirect } from 'react-router-dom';
import GlobalContext from '../components/Global/context';

// import { Link } from "react-router-dom";

const url = window.location.search;
const postId = url.split("=")[2];

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
            .catch(err => console.log(err));
    }

    handleWhoSavedTheJob = () => {
        getUsersFromSavedPosting(postId)
            .then(res => {
                console.log(res);
                const seekerListFromData = res.data.map(seeker => {
                    return {
                        userID: seeker.userID
                    }
                });
                return this.setState({
                    seekerList: seekerListFromData
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        console.log(this.context)
        if ((!this.context.isLoggedIn)) {
            return <Redirect to='/login' />
        } else if (parseInt(this.context.isEmployer) !== 1 && this.context.isLoggedIn) {
            return <Redirect to='/community' />
        }
        return (
            <>
                <Header>

                </Header>
                <column>
                    <div>{this.state.postDetail.title}</div>
                    <div>{this.state.postDetail.description}</div>
                </column>
                <row>
                    {!this.state.seekerList.length ? (
                        <h2 className="text-center">
                            No seeker save this job yet.
                        </h2>
                    ) : (
                            this.state.seekerList.map(seeker => {
                                return (
                                    <div>{seeker.userID}</div>
                                )
                            })
                        )}
                </row>
            </>
        )
    }
}

export default EmployerJobDetail;