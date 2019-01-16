import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import IssueLabel from './IssueLabel';

const IssueListItem = ({closed, title, labels, comment_count, id, date, author}) => (
      <div>
          <Link className="list-item" to={`/issues/${id}`}>
              <div className={closed === true ? 'list-item__status-closed' : 'list-item__status-open'}></div>
              <div className="list-item__body">
                  <div className="list-item__title">
                      {title}
                      {labels.map((label) => {
                          const fontColor = label.default === true ? '#fff' : '#000';
                          const backgroundColor = '#'+label.color;
                          return <IssueLabel
                              key={label.name}
                              text={label.name}
                              color={fontColor}
                              backgroundColor={backgroundColor}
                          />
                      })}
                  </div>
                  <div className="list-item__sub-title">
                      #{id} opened {moment(date).fromNow(true)} ago by <span className="author">{author}</span>
                  </div>
              </div>
              <div className="list-item__comments">
                  <img src="/images/comments.png" alt="Comment count" />
                  <div>{comment_count}</div>
              </div>
          </Link>
      </div>
);

export default IssueListItem;