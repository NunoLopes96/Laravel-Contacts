<!doctype html>
<html>
    <head>
        <title>@yield('title')</title>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        @stack('stylesheets')
    </head>
    <body>
        <div class="container">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    @yield('breadcrumb')
                </ol>
            </nav>
            @yield('content')
        </div>
        <script src="{{asset('js/app.js')}}"></script>
        @stack('scripts')
    </body>
</html>
