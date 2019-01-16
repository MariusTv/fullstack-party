import React from 'react';
import { Link } from 'react-router-dom';
import { LoadingOverlay, Loader } from 'react-overlay-loader';
import moment from 'moment';
import IssueComment from './IssueComment';
import {getIssue} from "../data/api";

class IssuePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            issue: undefined,
            loading: true
        };
    }
    componentDidMount() {
        getIssue(this.props.match.params.id).then((issue) => {
            this.setState({
                issue: issue,
                loading: false
            });
        });
    }
    render() {
        let content;
        if (this.state.issue !== undefined) {
            const state = this.state.issue.closed === true ? 'CLOSED' : 'OPEN';
            const stateClassName = 'issue__state-' + state.toLowerCase();
            const authorUrl = `https://github.com/${this.state.issue.comments[0].author}`;
            const issue = (
                <div className="issue">
                    <div className="issue__title">
                        {this.state.issue.title} <span>#{this.state.issue.id}</span>
                    </div>
                    <div className="issue__subtitle">
                        <span className={stateClassName}>{state}</span> <a className="author" href={authorUrl}><span >{this.state.issue.comments[0].author}</span></a> opened this issue {moment(this.state.issue.comments[0].date).fromNow(true)} ago - {this.state.issue.comments.length - 1} comment
                    </div>
                </div>);
            const comments = this.state.issue.comments.map((comment) => {
                return <IssueComment
                    key={comment.date}
                    author={comment.author}
                    author_avatar={comment.author_avatar}
                    date={comment.date}
                    comment={comment.comment}
                />;
            });

            content = (
                <div className="content-container">
                    <Link className="button-link" to={'/'}>
                        <img src="/images/back-arrow.png" alt="Back to issues" />
                        Back to Issues
                    </Link>
                    {issue}
                    <div>
                        {comments}
                    </div>
                </div>
            );
        } else {
            content = (
                <LoadingOverlay className="content-container">
                    <Loader loading={this.state.loading}/>
                </LoadingOverlay>
            );
        }
        return (
            <div className="content-container--issue">
                {content}
            </div>
        );
    }
}

export default IssuePage;