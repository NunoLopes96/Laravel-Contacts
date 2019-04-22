@extends('layouts/app')

@section('title', 'Edit Contact')

@section('breadcrumb')
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item" aria-current="page"><a href="{{ url('contacts') }}">Contacts</a></li>
            <li class="breadcrumb-item active" aria-current="page">Edit</li>
        </ol>
    </nav>
@endsection

@section('content')
<?php /* @var App\Contact $contact */ ?>
<form class="contact-form" method="POST" action="{{ url("contacts/{$contact->id}") }}">
    @method('PUT')
    <div class="form-group">
        <label for="first_name">First Name</label>
        <input type="text"
               class="form-control {{$errors->has('first_name') ? 'is-invalid' : ''}}"
               name="first_name"
               minlength="3"
               maxlength="255"
               id="first_name"
               placeholder="Enter first name"
               value="{{ old('first_name') ?? $contact->first_name }}"
               required>
    </div>
    <div class="form-group">
        <label for="last_name">Last Name</label>
        <input type="text"
               class="form-control {{$errors->has('last_name') ? 'is-invalid' : ''}}"
               name="last_name"
               maxlength="255"
               id="last_name"
               placeholder="Enter last name"
               value="{{ old('last_name') ?? $contact->last_name }}">
    </div>
    <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email"
               class="form-control {{$errors->has('email') ? 'is-invalid' : ''}}"
               name="email"
               id="exampleInputEmail1"
               placeholder="Enter email"
               pattern="\S+@\S+\.\S+"
               value="{{ old('email') ?? $contact->email }}">
    </div>
    <div class="form-group">
        <label for="phone">Phone Number</label>
        <div class="d-block">
            <input type="tel"
                   class="form-control {{$errors->has('phone_number') ? 'is-invalid' : ''}}"
                   name="phone_number"
                   id="phone"
                   value="{{ old('phone_number') ?? $contact->phone_number }}">
        </div>
    </div>
    @csrf
    <button type="submit" class="btn btn-success">Update</button>
    <a href="{{ url("contacts") }}" class="btn btn-primary">Close</a>
</form>
@stop

@push('scripts')
    <script src="{{ asset('js/contactform.js') }}"></script>
@endpush

@push('stylesheets')
    <link rel="stylesheet" href="{{ asset('css/intltelinput.css') }}">
@endpush
