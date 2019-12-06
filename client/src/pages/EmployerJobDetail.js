import React, { Component } from 'react';
import Header from '../components/Header';
import { getPostingById, getUsersFromSavedPosting } from '../utils/API';


// import { Link } from "react-router-dom";

const url = window.location.search;
const postId = url.split("=")[2];

class EmployerJobDetail extends Component {
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