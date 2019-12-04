import React, { Component } from 'react';
import Header from '../components/Header';
import { getPostingByEmployer } from '../utils/API';

// import { Link } from "react-router-dom";

const url = window.location.search;
const bossId = url.split("=")[1];

class EmployerPosts extends Component {

    state = {
        postList: [],
        title: "",
        description: ""
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
        this.login(this.state)
        .then(
            this.handleGetAllposts()
        )
    };

    componentDidMount() {
        this.handleGetAllposts();
    }

    handleGetAllposts = () => {
        getPostingByEmployer(bossId)
            .then(res => {
                console.log(res);
                const postListFromData = res.data.map(post => {
                    return {
                        id: post.id,
                        title: post.title
                    }
                });
                return this.setState({
                    postList: postListFromData
                });
            })
            .catch(err => console.log(err));
    }

    handleRemovePost = () => {

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
                        className={'btn btn-success btn-sm'}
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
                                        <div key={post.id}>{post.title}</div>
                                        <button key={post.id}>X</button>
                                    </column>
                                )
                            })
                        )};
                </row>
            </>
        )
    }
}

export default EmployerPosts;