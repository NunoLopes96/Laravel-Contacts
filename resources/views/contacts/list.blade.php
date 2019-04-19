@extends('template')

@section('title', 'Contacts List')

@section('content')
    <h1>Contacts</h1>
    <div class="list-group">
        <div>
            <a href="{{ url('/contacts/create') }}" class="btn btn-lg btn-outline-success float-right my-2">
                <i class="fa fa-plus"></i> Create
            </a>
        </div>
        <a href="#" class="list-group-item list-group-item-action">
            <b>Nuno Lopes</b> <small>(965643427)</small>
            <span class="btn btn-outline-danger float-right mx-2">
                    <i class="fa fa-trash"></i>
            </span>
            <span class="btn btn-outline-warning float-right mx-2">
                    <i class="fa fa-edit"></i>
            </span>
        </a>
    </div>
@stop