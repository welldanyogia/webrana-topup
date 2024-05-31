<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param string $role
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next, string ...$roles)
    {
        if (!auth()->check()) {
            if (in_array('guest', $roles)) {
                return $next($request); // Allow guest access
            }
            abort(403);
        }

        $userRole = auth()->user()->role;
        if (!in_array($userRole, $roles)) {
            abort(403);
        }
        return $next($request);
    }
}
