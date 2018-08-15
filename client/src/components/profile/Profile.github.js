import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProfileGithub extends Component {
    state = {
        clientId: '9c8677ea1eb8c3e99d50',
        clientSecret: '836d1cfda71ff802df04cb3136d2d2c1282c78c8',
        sort: 'created: asc',
        count: 5, // number of repos we want to dispaly
        repos: [],
    };

    componentDidMount () {
        const { username } = this.props;
        const { clientId, clientSecret, sort, count } = this.state;

        fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
            .then(res => res.json())
            .then(data => {
                this.setState({repos: data})
            })
            .catch(err => console.log(err));
    }

    render () {
        const { repos } = this.state;
        const reposItems = repos.map(repo => {
            console.log(repo);
            return (
                <div key={repo.id} className="card card-body mb-3">
                    <div className="row">
                        <div className="col-md-6">
                            <h4>
                                <Link to={repo.html_url} className="text-info" target="_blank">
                                    {repo.name} 
                                </Link>
                            </h4>
                            { repo.description ? <p className="text-muted mb-0">{repo.description}</p> : null }
                        </div>
                        <div className="col-md-6">
                            <span className="badge badge-info mr-1">
                                Stars: {repo.stargazers_count}
                            </span>
                            <span className="badge badge-secondary mr-1">
                                Watchers: {repo.watchers_count}
                            </span>
                            <span className="badge badge-success">
                                Forks: {repo.forks_count}
                            </span>
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <div>
                <hr/>
                <h3 className="mb-4">Latest Github Repos</h3>
                {reposItems}
            </div>
        );
    };
};

export default ProfileGithub;