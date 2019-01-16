<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware(['public'])->group(function () {
    Route::get('/login', function () {
        return view('index');
    });
    Route::get('/auth/github', 'Auth\LoginController@redirectToProvider');
    Route::get('/auth/github/callback', 'Auth\LoginController@handleProviderCallback');
});

Route::get('/test', function() {
    echo session('user_token');
});

Route::middleware(['auth.custom'])->group(function() {
    Route::get('/logout', 'Auth\LoginController@logout');

    Route::get('/', function () {
        return view('index');
    });
    Route::get('/issues/{id}', function () {
        return view('index');
    });
});


