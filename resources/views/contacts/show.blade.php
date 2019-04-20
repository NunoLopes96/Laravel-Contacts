@extends('layouts/app')

@section('title','Contact')

@section('content')
    <h1>Contact</h1>
    @if($errors->any())
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <ul class="my-0">
        @foreach($errors->all() as $error)
            <li>{{$error}}</li>
        @endforeach
        </ul>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    @endif
    <div class="form-group">
        <label for="first_name">First Name</label>
        <input type="text"
               class="form-control {{$errors->has('first_name') ? 'is-invalid' : ''}}"
               name="first_name"
               min="3"
               max="255"
               id="first_name"
               placeholder="Enter first name"
               value="{{ old('first_name') ?? $contact->first_name }}"
               required
               disabled>
    </div>
    <div class="form-group">
        <label for="last_name">Last Name</label>
        <input type="text"
               class="form-control {{$errors->has('last_name') ? 'is-invalid' : ''}}"
               name="last_name"
               max="255"
               id="last_name"
               placeholder="Enter last name"
               value="{{ old('last_name') ?? $contact->last_name }}"
               disabled>
    </div>
    <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email"
               class="form-control {{$errors->has('email') ? 'is-invalid' : ''}}"
               name="email"
               id="exampleInputEmail1"
               placeholder="Enter email"
               pattern="\S+@\S+\.\S+"
               value="{{ old('email') ?? $contact->email }}"
               disabled>
    </div>
    <div class="form-group">
        <label for="phone">Phone Number</label>
        <div class="d-block">
            <input type="tel"
                   class="form-control {{$errors->has('phone_number') ? 'is-invalid' : ''}}"
                   name="phone_number"
                   id="phone"
                   value="{{ old('phone_number') ?? $contact->phone_number }}" disabled>
        </div>
    </div>
    <a href="{{ url("contacts/{$contact->id}/edit") }}" class="btn btn-warning">Edit
    </a>
    <button type="submit" class="btn btn-danger">Delete</button>
@stop
