@extends('layouts/app')

@section('title', 'Create New Contact')

@section('content')
    <h1>Create New Contact</h1>
    <form method="POST" action="{{ url('contacts') }}">
        @csrf
        <div class="form-group">
            <label for="first_name">First Name</label>
            <input type="text" class="form-control" name="first_name" id="first_name" placeholder="Enter first name">
        </div>
        <div class="form-group">
            <label for="last_name">Last Name</label>
            <input type="text" class="form-control" name="last_name" id="last_name" placeholder="Enter last name">
        </div>
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" name="email" id="exampleInputEmail1" placeholder="Enter email" pattern="\S+@\S+\.\S+">
        </div>
        <div class="form-group">
            <label for="phone">Phone Number</label>
            <div class="d-block">
                <input type="tel" class="form-control intl-tel-input" name="phone_number" id="phone">
            </div>
        </div>
        <button type="submit" class="btn btn-success">Create</button>
    </form>
@stop
