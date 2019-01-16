<?php

namespace App\Http\Middleware;

use Closure;

class PublicRoute
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
        if (empty(session('user_token'))) {
            return $next($request);
        }

        return redirect('/');
    }
}
