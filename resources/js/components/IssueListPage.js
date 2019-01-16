import React from 'react';
import Paginate from 'react-paginate';
import { LoadingOverlay, Loader } from 'react-overlay-loader';
import IssueListItem from './IssueListItem';
import {getIssues, getCounts} from "../data/api";

class IssueListPage extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            issues: [],
            openCount: undefined,
            closedCount: undefined,
            listType: 'open',
            page:0,
            perPage: 5,
            pageCount: 0,
        };
        this.handleOpenIssuesClick = this.handleOpenIssuesClick.bind(this);
        this.handleClosedIssuesClick = this.handleClosedIssuesClick.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.loadIssuesFromServer = this.loadIssuesFromServer.bind(this);
        this.loadIssueCountsFromServer = this.loadIssueCountsFromServer.bind(this);
    }
    handleOpenIssuesClick() {
        if(this.state.listType !== 'open') {
            this.setState({
                listType: 'open',
                pageCount: Math.ceil(this.state.openCount / this.state.perPage),
            }, () => {
                this.loadIssuesFromServer();
            });
        }
    }
    handleClosedIssuesClick() {
        if(this.state.listType !== 'closed') {
            this.setState({
                listType: 'closed',
                pageCount: Math.ceil(this.state.closedCount / this.state.perPage),
            }, () => {
                this.loadIssuesFromServer();
            });
        }
    }
    handlePageClick(data) {
        const page = parseInt(data.selected);
        localStorage.setItem('page', page);
        this.setState({ page }, () => {
            this.loadIssuesFromServer();
        });
    };
    loadIssuesFromServer() {
        const page = parseInt(localStorage.getItem('page')) || 0;
        this.setState({
            loading: true,
            page
        });
        getIssues(this.state.listType, page, this.state.perPage).then((response) => {
            this.setState({
                issues: response.issues,
                loading: false,
            });
        })
    }
    loadIssueCountsFromServer() {
        getCounts().then((response) => {
            this.setState({
                openCount: response.openCount,
                closedCount: response.closedCount,
                pageCount: Math.ceil(response.openCount / this.state.perPage),
            });
        })
    }
    render() {
        const issues = this.state.issues;
        const content = issues.map((issue) => {
            return <IssueListItem
                key={issue.id}
                title={issue.title}
                closed={issue.closed}
                id={issue.id}
                date={issue.date}
                author={issue.author}
                url={issue.url}
                comment_count={issue.comment_count}
                labels={issue.labels}
            />;
        });

        return (
            <div className="row">
                <LoadingOverlay className="column list-body">
                    <Loader loading={this.state.loading}/>
                    <div className="list-categories">
                        <div>
                            <button onClick={this.handleOpenIssuesClick} className="list-categories__button"><img src="/images/status-open.png" alt="Open issues" /><span className={this.state.listType === 'open' ? 'active' : ''}>{this.state.openCount} Open</span></button>
                            <button onClick={this.handleClosedIssuesClick} className="list-categories__button"><img src="/images/status-closed.png" alt="Closed issues" /><span className={this.state.listType === 'closed' ? 'active' : ''}>{this.state.closedCount} Closed</span></button>
                        </div>
                    </div>
                    {content}
                    <div className="pagination-container">
                        <Paginate
                            pageCount={this.state.pageCount}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={3}
                            forcePage={this.state.page}
                            onPageChange={this.handlePageClick}
                            containerClassName="pagination"
                            pageClassName="pagination__page"
                            activeClassName="pagination__page-active"
                            disabledClassName="pagination__page-disabled"
                            previousLinkClassName="pagination__previous-next-links"
                            nextLinkClassName="pagination__previous-next-links"
                        />
                    </div>
                </LoadingOverlay>
                <div className="column list-background">
                    <div className="list-background__title">Full Stack Developer Task</div>
                    <div className="list-background__subtitle">
                        <span>by </span>
                        <img src="/images/testio-logo-white.png" alt="Testio logo" />
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        if (this.state.closedCount === undefined || this.state.openCount === undefined) {
            this.loadIssueCountsFromServer();
        }
        this.loadIssuesFromServer();
    }
}

export default IssueListPage;