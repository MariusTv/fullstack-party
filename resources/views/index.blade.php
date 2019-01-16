<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Testio</title>
        <!-- Fonts -->
        <link rel="stylesheet" type="text/css" href="/css/app.css" />
        <meta name="csrf-token" content="{{ csrf_token() }}">
    </head>
    <body>
        <div style="display: none" id="user_token" data-token={{session('user_token', '')}}></div>
        <div id="app"></div>
        <script src="{{asset('js/app.js')}}" ></script>
    </body>
</html>
