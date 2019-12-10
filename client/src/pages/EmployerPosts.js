import React, { Component } from 'react';
import Header from '../components/Header';
import { getPostingByEmployer, createPosting, deletePosting } from '../utils/API';
import { Redirect } from 'react-router-dom';
import GlobalContext from '../components/Global/context'
// import { Link } from "react-router-dom";

//sessionStorage.getItem('userId')
// const userId        = sessionStorage.getItem('userId');

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

const newJobPosts = {
    color: 'black',
    fontFamily: "'Righteous', cursive",
}

class EmployerPosts extends Component {
    static contextType = GlobalContext;
    state = {
        postList: [],
        title: "",
        description: "",
        errorTitle: null,
        errorDescription: null
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleLogInForm = event => {
        const { title, description } = this.state;
        event.preventDefault();

        if (title === "")
            this.setState({ errorTitle: "Please put in a job title." });

        if (description === "")
            this.setState({ errorDescription: "Please put in a job description." });


        if (title !== "" && description !== "") {
            let dataToSend = {
                title: this.state.title,
                description: this.state.description
            };
            createPosting(sessionStorage.getItem('userId'), dataToSend)
                .then(this.handleGetAllPosts)
                .catch(err => console.log("err: ", err));
        }
    };

    componentDidMount() {
        this.handleGetAllPosts();
    }

    handleGetAllPosts = () => {
        getPostingByEmployer(sessionStorage.getItem('userId'))
            .then(res => {
                console.log(res);
                const postListFromData = (res.data).map(post => {
                    return {
                        id: post.id,
                        title: post.title,
                        url: `/employer-job-detail?userid=${sessionStorage.getItem('userId')}?postid=${post.id}`
                    }
                });
                return this.setState({
                    postList: postListFromData
                });
            })
            .catch(err => console.log("err: ", err));
    }

    handleRemovePost = postId => {
        deletePosting(postId)
            .then(this.handleGetAllPosts)
            .catch(err => console.log("err: ", err));
    }

    render() {
        // console.log(this.context)
        // console.log("data sent: ", this.state);
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        const isEmployer = sessionStorage.getItem('isEmployer');
        if (!isLoggedIn) {
            return <Redirect to='/login' />
        } else if (parseInt(isEmployer) === 1 && isLoggedIn) {
            return (
                <>
                    <Header />
                    <form onSubmit={this.handleLogInForm}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Job Title"
                            onChange={this.handleInputChange}
                            value={this.state.title}
                            name="title"
                        />
                        {this.state.errorTitle &&
                            !this.state.title.length && (
                                <div className="alert alert-danger my-2">
                                    {this.state.errorTitle}
                                </div>
                            )}
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Job Description"
                            onChange={this.handleInputChange}
                            value={this.state.description}
                            name="description"
                        />
                        {this.state.errorDescription &&
                            !this.state.description.length && (
                                <div className="alert alert-danger my-2">
                                    {this.state.errorDescription}
                                </div>
                            )}
                        <button
                            type="submit"
                            className={"btn btn-success btn-sm"}
                        >
                        </button>
                    </form>
                    <row>
                        {!this.state.postList.length ? (
                            <h2 className="text-center">
                                Post your first job.
                        </h2>
                        ) : (
                                this.state.postList.map(post => {
                                    return (
                                        <column>
                                            <div><a href={post.url}>{post.title}</a></div>
                                            <button
                                                onClick={() => this.handleRemovePost(post.id)}
                                            >X</button>
                                        </column>
                                    )
                                })
                            )}
                    </row>
                </>
            )
        }
        else if (parseInt(isEmployer) !== 1 && isLoggedIn) {
            return <Redirect to='/employer-posts' />
        }
    }
}

export default EmployerPosts;
