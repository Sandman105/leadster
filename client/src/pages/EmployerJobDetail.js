import React, { Component } from 'react';
import Header from '../components/Header';
import { getPostingById, getUsersFromSavedPosting, updatePosting, getAllSeekers, SubmitRating, getAvgRating } from '../utils/API';
import { Redirect } from 'react-router-dom';
import GlobalContext from '../components/Global/context';
import Modal from 'react-modal';
import Card from '../components/Card'
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';
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
        allSeekers: [],
        title: "",
        description: "",
        status: null,
        errorTitle: null,
        errorDescription: null,
        formIsDisplay: false,
        postID: null,
        modalIsOpen: false,
        rating: null,
        body: null,
        revieweeID: null,
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        // console.log("name: ", name, "value: ", value);
        if (name === 'status' && value === "1") {
            this.setState({
                [name]: value,
                modalIsOpen: true
            });
            // console.log("modal state: ", this.state.modalIsOpen);
        } else {
            this.setState({ [name]: value });
        }
        // console.log("end log: ", this.state);
    };

    handleSubmitRating = event => {
        event.preventDefault();
        const data = {
            userReviewerID: parseInt(sessionStorage.getItem('userId')),
            userRevieweeID: this.state.revieweeID,
            rating: this.state.rating,
            postingID: this.state.postID,
            body: this.state.body
        };
        const dataToSend = {
            title: this.state.title,
            description: this.state.description,
            status: this.state.status
        };
        updatePosting(this.state.postID, dataToSend);
        SubmitRating(data).then(res => {
            // this.setState({ modalIsOpen: false });
            window.location.reload();
        }).catch(err => console.log("err: ", err));
    }

    componentDidMount() {
        this.handleGetPostDetail();
        this.handleWhoSavedTheJob();
        this.handleGetAllSeekers();
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
                    postID: res.data[0].id,
                    status: res.data[0].status
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
                    nameLast: seeker.nameLast,
                    avgRating: seeker.avgRating 
                }));

                return this.setState({
                    seekerList: seekerListFromData
                });
            })
            .catch(err => console.log("err: ", err));
    }

    handleGetAllSeekers = () => {
        getAllSeekers().then(res => {
            // console.log("all seekers: ", res);
            const allSeeker = res.data.map(seeker => (
                (seeker.nameFirst) + " " + (seeker.nameLast) + "-" + seeker.id
            ));
            this.setState({
                allSeekers: allSeeker
            });
        });
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
            description: this.state.description,
            status: this.state.status
        };
        // console.log("look here: ", dataToSend);
        updatePosting(this.state.postID, dataToSend)
            .then(this.setState({ postDetail: dataToSend }))
            .catch(err => console.log("err: ", err));
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
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
        // console.log("status state: ", this.state.status);
        // console.log("current State: ", this.state);
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
                    <div>Status: {this.state.postDetail.status === 0 ? "Open" : "Closed"}</div>
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
                            <div>
                                <select defaultValue={this.state.postDetail.status} onChange={this.handleInputChange} name="status">
                                    <option value="0" name="status">Open &nbsp;</option>
                                    <option value="1" name="status">Closed &nbsp;</option>
                                    {/* {console.log("status: ", this.state.status)} */}
                                </select>
                            </div>
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
                            <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} contentLabel="Review User">

                                <div><h2>Review User who completed job</h2></div>
                                <hr />
                                <form>
                                    {/* select with options of users who have isEmployer != 1 */}
                                    <div>User: &nbsp;
                                        <select name='revieweeID' onChange={this.handleInputChange}>
                                            {this.state.allSeekers.map(name => {
                                                return <option key={name} value={name.split("-")[1]}>{name.split("-")[0]}&nbsp;&nbsp;</option>;
                                            })}
                                        </select>
                                    </div>
                                    <br />
                                    {/* copy the stars things from Eats++ */}
                                    <div>Rating: &nbsp;
                                        <select name='rating' defaultValue='Rate Quality of work/service' onChange={this.handleInputChange}>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                            <option value='5'>5</option>
                                        </select>
                                    </div>
                                    <br />
                                    {/* input for text body */}
                                    <div>Description of work: &nbsp;
                                        <textarea name='body' onChange={this.handleInputChange}></textarea>
                                    </div>
                                    <br />
                                    {/* submit btn to create record for rating */}
                                    <div>
                                        <button type="submit" className={"btn btn-success btn-sm"} onClick={this.handleSubmitRating}>
                                            Submit Rating
                                        </button> &nbsp;&nbsp;
                                        <button onClick={this.closeModal} className={"btn btn-danger btn-sm"}>Close</button>
                                    </div>
                                </form>
                            </Modal>
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
                                                <div className="text-center">Avg Rating: {saver.avgRating || "No reviews yet"} </div>
                                            </li>
                                            <hr />
                                        )
                                    })}
                                    {/* {console.log("Look here: ", this.state.seekerList)} */}
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
