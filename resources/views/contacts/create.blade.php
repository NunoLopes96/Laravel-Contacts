@extends('layouts/app')

@section('title', 'Create New Contact')

@section('content')
    <h1>Create New Contact</h1>
    <form>
        <div class="form-group">
            <label for="first_name">First Name</label>
            <input type="text" class="form-control" id="first_name" placeholder="Enter first name">
        </div>
        <div class="form-group">
            <label for="last_name">Last Name</label>
            <input type="text" class="form-control" id="last_name" placeholder="Enter last name">
        </div>
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email" pattern="\S+@\S+\.\S+">
        </div>
        <div class="form-group">
            <label for="phone">Phone Number</label>
            <div class="d-block">
                <input type="tel" class="form-control" id="phone" placeholder="Enter phone number">
            </div>
        </div>
        <button type="submit" class="btn btn-success">Create</button>
    </form>
@stop