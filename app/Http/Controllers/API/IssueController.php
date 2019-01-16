<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use GuzzleHttp;
use Illuminate\Http\Request;

class IssueController extends Controller
{
    /**
     * Display a listing of issues.
     * @param $request Request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $state = $request->get('state', 'open');
        $limit = $request->get('limit', 5);
        $page = $request->get('page', 1);
        $token = $request->get('token');

        $response = [];
        $client = new GuzzleHttp\Client();

        $repo = config('app.github_repo');
        $res = $client->get(sprintf('https://api.github.com/search/issues?q=repo:%s+type:issue+state:%s&per_page=%d&page=%d&access_token=%s', $repo, $state, $limit, $page, $token));
        $issues = json_decode($res->getBody(), true);

        foreach ($issues['items'] as $issue) {
            $response['issues'][] = [
                'id' => $issue['number'],
                'url' => $issue['url'],
                'title' => $issue['title'],
                'author' => $issue['user']['login'],
                'comment_count' => intval($issue['comments']),
                'date' => $issue['created_at'],
                'labels' => array_map(function($label) {
                    return array_filter($label, function($key) {
                        return in_array($key, ['name', 'color', 'default']);
                    }, ARRAY_FILTER_USE_KEY);
                },$issue['labels'])
            ];
        }
        return response()->json($response);
    }

    /**
     * Display a counts of issues
     * @param $request Request
     * @return \Illuminate\Http\Response
     */
    public function getCounts(Request $request)
    {
        $token = $request->get('token');

        $response = [];
        $client = new GuzzleHttp\Client();
        $repository = config('app.github_repo');

        /** Get count of closed issues */
        $res = $client->get(sprintf('https://api.github.com/search/issues?q=repo:%s+type:issue+state:closed&access_token=%s', $repository, $token));
        $repo = json_decode($res->getBody(), true);
        $response['closed'] = intval($repo['total_count']);

        /** Get count of open issues */
        $res = $client->get(sprintf('https://api.github.com/search/issues?q=repo:%s+type:issue+state:open&access_token=%s', $repository, $token));
        $repo = json_decode($res->getBody(), true);
        $response['open'] = intval($repo['total_count']);

        return response()->json($response);
    }



    /**
     * Display the specified issue.
     * @param Request $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $token = $request->get('token');

        $response = [];
        $repo = config('app.github_repo');
        $client = new GuzzleHttp\Client();
        $res = $client->get(sprintf('https://api.github.com/repos/%s/issues/%s?access_token=%s', $repo, $id, $token));
        $issue = json_decode($res->getBody(), true);

        $response['id'] = $issue['number'];
        $response['title'] = $issue['title'];
        $response['closed'] = $issue['state'] == 'closed' ? true : false;
        $response['comments'][] = [
            'author' => $issue['user']['login'],
            'author_avatar' => $issue['user']['avatar_url'],
            'date' => $issue['created_at'],
            'comment' => $issue['body']
        ];

        $res = $client->get(sprintf('https://api.github.com/repos/%s/issues/%s/comments?access_token=%s', $repo, $id, $token));
        $comments = json_decode($res->getBody(), true);

        foreach ($comments as $comment) {
            $response['comments'][] = [
                'author' => $comment['user']['login'],
                'author_avatar' => $comment['user']['avatar_url'],
                'date' => $comment['created_at'],
                'comment' => $comment['body']
            ];
        }

        return response()->json($response);
    }
}
