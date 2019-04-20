@extends('layouts/app')

@section('title', 'Contacts List')

@section('breadcrumb')
    <li class="breadcrumb-item active" aria-current="page">Contacts</li>
@endsection

@section('content')
    <div class="clearfix">
        <a href="{{ url('/contacts/create') }}" class="btn btn-lg btn-outline-success float-right my-2">
            <i class="fa fa-plus"></i> Create new contact
        </a>
    </div>
    <div>
        <ul class="list-group">
        @foreach($contacts as $contact)
            <li class="list-group-item">
                <div class="pull-left">
                    <b>{{ $contact->first_name }} {{ $contact->last_name }}</b>
                @isset($contact->phone_number)
                    <small>({{ $contact->phone_number }})</small>
                @endisset
                @isset($contact->email)
                    <br>
                    <small>Email: {{$contact->email}}</small>
                @endisset
                </div>
                <form method="POST" action="{{ url("contacts/{$contact->id}") }}" style="display: inline">
                    @method('DELETE')
                    @csrf
                    <button class="btn btn-lg btn-outline-danger float-right mx-2">
                        <i class="fa fa-trash"></i>
                    </button>
                </form>
                <a class="btn btn-lg btn-outline-warning float-right mx-2" href="{{ url("contacts/{$contact->id}/edit") }}" >
                    <i class="fa fa-edit"></i>
                </a>
            </li>
        @endforeach
        </ul>
    </div>
@stop
