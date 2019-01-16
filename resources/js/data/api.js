import axios from 'axios';

export const getIssues = (state, page, limit) => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    if (issues) {
        localStorage.removeItem('issues');
        return new Promise((resolve, reject) => {
            resolve(issues);
        })
    } else {
        const token = getToken();
        return axios.get(`/api/issues?state=${state}&page=${page + 1}&limit=${limit}&token=${token}`).then((response) => {
            localStorage.setItem('issues_cache', JSON.stringify({
                issues: response.data.issues,
            }));
            return {
                issues: response.data.issues,
            }
        });
    }
};

export const getIssue = (id) => {
    const issues = localStorage.getItem('issues_cache');
    if (issues) {
        localStorage.setItem('issues', issues);
    }

    const token = getToken();
    return axios.get(`/api/issues/${id}?token=${token}`).then((response) => {
        return response.data;
    });
};

export const getCounts = () => {
    const counts = localStorage.getItem('counts');
    if (counts) {
        return new Promise((resolve, reject) =>{
            resolve(JSON.parse(counts));
        });
    } else {
        const token = getToken();
        return axios.get(`/api/counts?token=${token}`).then((response) => {
            const counts = {
                openCount: response.data.open,
                closedCount: response.data.closed
            };
            localStorage.setItem('counts', JSON.stringify(counts));
            return counts;
        });
    }
};

export const getToken = () => {
    const element = document.getElementById('user_token');
    return element.dataset.token;
};