import React, { Component } from 'react';
import Header from '../components/Header';
import { getPostingById, getUsersFromSavedPosting, updatePosting } from '../utils/API';
import { Redirect } from 'react-router-dom';
import GlobalContext from '../components/Global/context';
import Card from '../components/Card'
// import { Link } from "react-router-dom";

const seekerStateLabel = {
    color: 'black',
    fontFamily: "'Righteous', cursive",
    textAlign: 'center'
}

const employerButton = {
    backgroundColor: '#666666',
    border: 'none',
    borderRadius: '10px',
    color: 'white',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: '600',
    fontFamily: "'Righteous', cursive",
    margin: '4px 2px',
    cursor: 'pointer',
}

const formLabel = {
    color: 'black',
    fontFamily: "'Righteous', cursive",
}

class EmployerJobDetail extends Component {
    static contextType = GlobalContext;
    state = {
        postDetail: {},
        seekerList: [],
        title: "",
        description: "",
        errorTitle: null,
        errorDescription: null,
        formIsDisplay: false,
        postID: null
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    componentDidMount() {
        this.handleGetPostDetail();
        this.handleWhoSavedTheJob();
    }

    handleGetPostDetail = () => {
        // event.preventDefault();
        getPostingById((this.props.location.search).split("=")[2])
            .then(res => {
                // console.log("res: ",(this.props));
                return this.setState({
                    postDetail: res.data[0], // with peiyu
                    title: res.data[0].title,
                    description: res.data[0].description,
                    postID: res.data[0].id
                });
            })
            .catch(err => console.log("err: ", err));
    }

    handleWhoSavedTheJob = () => {
        getUsersFromSavedPosting((this.props.location.search).split("=")[2])
            .then(res => {
                // console.log("result from API: ", res);
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

    handleEditClick = () => {
        if (!this.state.formIsDisplay) {
            this.setState({
                formIsDisplay: true
            })
        }
        else {
            this.setState({
                formIsDisplay: false
            })
        }
    }

    handleUpdatePosting = () => {
        // event.preventDefault();
        const dataToSend = {
            title: this.state.title,
            description: this.state.description
        }
        // console.log("look here: ", dataToSend);
        updatePosting(this.state.postID, dataToSend)
            .then(this.setState({postDetail : dataToSend}))
            .catch(err => console.log("err: ", err));
    }

    render() {
        // console.log("Props: " + (this.props.location.search).split("=")[2]);
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        const isEmployer = sessionStorage.getItem('isEmployer');
        if (!isLoggedIn) {
            return <Redirect to='/login' />
        } else if (parseInt(isEmployer) !== 1 && isLoggedIn) {
            return <Redirect to='/community' />
        }
        // console.log("seekerList: ", this.state.seekerList);
        console.log("current State: ", this.state);
        return (
            <>
                <Header />
                <div style={seekerStateLabel}>
                    <div>{this.state.postDetail.title}</div>
                    <div>{this.state.postDetail.description} &nbsp;
                    <button
                            className="btn btn-warning"
                            onClick={this.handleEditClick}
                        >Edit</button>
                    </div>
                    {/* </column> */}
                    <row
                        style={seekerStateLabel}
                    ></row>
                </div>
                {this.state.formIsDisplay ?
                    (
                        <>
                            <input
                                type="text"
                                className="form-control"
                                placeholder={this.state.postDetail.title}
                                onChange={this.handleInputChange}
                                value={this.state.title}
                                name="title"
                            />
                            {/* {this.state.errorTitle &&
                            !this.state.title.length && (
                                <div className="alert alert-danger my-2">
                                    {this.state.errorTitle}
                                </div>
                            )} */}
                            <input
                                type="text"
                                className="form-control"
                                placeholder={this.state.postDetail.description}
                                onChange={this.handleInputChange}
                                value={this.state.description}
                                name="description"
                            />
                            {/* {this.state.errorDescription &&
                            !this.state.description.length && (
                                <div className="alert alert-danger my-2">
                                    {this.state.errorDescription}
                                </div>
                            )} */}
                            <button
                                style={employerButton}
                                type="submit"
                                className={"btn btn-success btn-sm"}
                                onClick={this.handleUpdatePosting}
                            >Update Post
                        </button>
                        </>
                    ) : (null)
                }
                <div>
                    {!this.state.seekerList.length ? (
                        <h2 className="text-center">
                            No seeker save this job yet.
                        </h2>
                    ) : (
                            <div>
                                <br />
                                <br />
                                <h3>People who saved this lead:</h3>
                                <ol>
                                    {this.state.seekerList.map(saver => {
                                        // console.log("saver data: ", saver);
                                        return (
                                            <li>
                                                <div className="text-center">{saver.nameFirst} {saver.nameLast}</div>
                                                <div className="text-center">{saver.email}</div>
                                            </li>

                                        )
                                    })}
                                </ol>
                            </div>

                        )
                    }
                </div>
            </>
        )
    }
}

export default EmployerJobDetail;
