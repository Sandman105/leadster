import React, { Component } from 'react';
import Header from '../components/Header';
import { getPostingByEmployer, createPosting, deletePosting } from '../utils/API';

// import { Link } from "react-router-dom";

const url = window.location.search;
const bossId = url.split("=")[1];

class EmployerPosts extends Component {

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
        getPostingByEmployer(bossId)
            .then(res => {
                console.log(res);
                const postListFromData = res.data.map(post => {
                    return {
                        id: post.id,
                        title: post.title,
                        url: `/job-detail?postid=${post.id}`
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
        return (
            <>
                <Header>

                </Header>
                <form onSubmit={this.handleLogInForm}>
                    <input
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
                        type="text"
                        className="form-control"
                        placeholder="Job Description"
                        onChange={this.handleInputChange}
                        value={this.state.description}
                        name="desciption"
                    />
                    {this.state.error &&
                        !this.state.description.length && (
                            <div className="alert alert-danger my-2">
                                {this.state.error}
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
}

export default EmployerPosts;