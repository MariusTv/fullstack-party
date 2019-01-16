import React from 'react';
import moment from 'moment';

const IssueComment = ({ author, author_avatar, date, comment}) => (
    <div className="comment-container">
        <img className="user-avatar show-for-desktop" src={author_avatar} alt="Avatar"/>
        <div className="comment">
            <div className="comment__header">
                <img className="user-avatar show-for-mobile" src={author_avatar} alt="Avatar"/>
                <a href={`https://github.com/${author}`} className="author" ><span >{author}</span></a> commented {moment(date).fromNow(true)} ago
            </div>
            <div className="comment__body">{comment}</div>
        </div>
    </div>
);

export  default IssueComment;
