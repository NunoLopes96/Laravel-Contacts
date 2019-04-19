@extends('layouts/app')

@section('title', 'Create New Contact')

@section('content')
    <h1>Create New Contact</h1>
    <form method="POST" action="{{ url('contacts') }}">
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
                   value="{{ old('first_name') }}"
                   required>
        </div>
        <div class="form-group">
            <label for="last_name">Last Name</label>
            <input type="text"
                   class="form-control {{$errors->has('last_name') ? 'is-invalid' : ''}}"
                   name="last_name"
                   max="255"
                   id="last_name"
                   placeholder="Enter last name"
                   value="{{ old('last_name') }}">
        </div>
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email"
                   class="form-control {{$errors->has('email') ? 'is-invalid' : ''}}"
                   name="email"
                   id="exampleInputEmail1"
                   placeholder="Enter email"
                   pattern="\S+@\S+\.\S+">
        </div>
        <div class="form-group">
            <label for="phone">Phone Number</label>
            <div class="d-block">
                <input type="tel"
                       class="form-control {{$errors->has('phone_number') ? 'is-invalid' : ''}}"
                       name="phone_number"
                       id="phone">
            </div>
        </div>
        @csrf
        <button type="submit" class="btn btn-success">Create</button>
    </form>
@stop
