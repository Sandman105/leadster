import React, { Component } from 'react';
import Header from '../components/Header';
import { getPostingByEmployer, createPosting, deletePosting } from '../utils/API';
import { Redirect } from 'react-router-dom';
import GlobalContext from '../components/Global/context'

// import { Link } from "react-router-dom";

const userId = sessionStorage.getItem('userId');

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

    static contextType = GlobalContext

    state = {
        postList: [],
        title: "",
        description: "",
        error: ""
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

        if (title === "") {
            return this.setState({ error: "Please put in a job title." })
        }
        if (description === "") {
            return this.setState({ error: "Please put in a job decription." })
        }
        createPosting(this.state)
            .then(this.handleGetAllPosts)
            .catch(err => console.log(err));
    };

    componentDidMount() {
        this.handleGetAllPosts();
    }

    handleGetAllPosts = () => {
        getPostingByEmployer(userId)
            .then(res => {
                console.log(res);
                const postListFromData = res.data.map(post => {
                    return {
                        id: post.id,
                        title: post.title,
                        url: `/employer-job-detail?userid=${userId}?postid=${post.id}`
                    }
                });
                return this.setState({
                    postList: postListFromData
                });
            })
            .catch(err => console.log(err));
    }

    handleRemovePost = postId => {
        deletePosting(postId)
            .then(this.handleGetAllPosts)
            .catch(err => console.log(err));
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
                <form onSubmit={this.handleLogInForm}>
                    <input
                        style={formLabel}
                        type="text"
                        className="form-control"
                        placeholder="Job Title"
                        onChange={this.handleInputChange}
                        value={this.state.title}
                        name="title"
                    />
                    {this.state.error &&
                        !this.state.title.length && (
                            <div className="alert alert-danger my-2">
                                {this.state.error}
                            </div>
                        )}
                    <input          
                        style={formLabel}
                        type="text"
                        className="form-control"
                        placeholder="Job Description"
                        onChange={this.handleInputChange}
                        value={this.state.description}
                        name="description"
                    />
                    {this.state.error &&
                        !this.state.description.length && (
                            <div className="alert alert-danger my-2">
                                {this.state.error}
                            </div>
                        )}
                    <button
                        style={employerButton}
                        type="submit"
                        className={"btn btn-success btn-sm"}
                    >
                    Post Job
                    </button>
                </form>
                <row
                style={newJobPosts}
                >
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
                                            style={employerButton}
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
}

export default EmployerPosts;