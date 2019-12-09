import React, { Component } from 'react';
import Header from '../components/Header';
import { getPostingById, getUsersFromSavedPosting } from '../utils/API';
import { Redirect } from 'react-router-dom';
import GlobalContext from '../components/Global/context';
// import { Link } from "react-router-dom";

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
        getPostingById((this.props.location.search).split("=")[2])
            .then(res => {
                console.log(res);
                return this.setState({
                    postDetail: res.data[0] // with peiyu
                });
            })
            .catch(err => console.log("err: ", err));
    }

    handleWhoSavedTheJob = () => {
        getUsersFromSavedPosting((this.props.location.search).split("=")[2])
            .then(res => {
                console.log("result from API: ", res);
                const seekerListFromData = res.data.map(seeker => ({
                    email: seeker.email,
                    nameFirst: seeker.nameFirst,
                    nameLast: seeker.nameLast
                }))

                return this.setState({
                    seekerList: seekerListFromData
                });
            })
            .catch(err => console.log("err: ", err));
    }

    render() {

        console.log("Props: " + (this.props.location.search).split("=")[2]);
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        const isEmployer = sessionStorage.getItem('isEmployer');
        if (!isLoggedIn) {
            return <Redirect to='/login' />
        } else if (parseInt(isEmployer) !== 1 && isLoggedIn) {
            return <Redirect to='/community' />
        }
        // console.log("seekerList: ", this.state.seekerList);
        return (
            <>
                <Header />
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
                            <ol>
                                {this.state.seekerList.map(saver => {
                                    console.log("saver data: ", saver);
                                    return (
                                        <li>
                                            <div className="text-center">{saver.nameFirst} {saver.nameLast}</div>
                                            <div className="text-center">{saver.email}</div>
                                        </li>

                                    )
                                })}
                            </ol>
                        )
                    }
                </div>
            </>
        )
    }
}

export default EmployerJobDetail;
