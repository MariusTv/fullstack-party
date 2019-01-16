<?php

namespace App\Http\Middleware;

use Closure;

class CustomApiAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->has('token')) {
            return $next($request);
        }

        return response('Forbidden', 403);
    }
}
