<?php

namespace App\Http\Controllers;

use App\Contact;
use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;

class ContactsController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('contacts.list', [
            'contacts' => auth()->user()->contacts
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // There is no show view, only edit,
        // so if the user tries to show it in the url,
        // we will redirect it to the edit view.
        return redirect("contacts/{$id}/edit");
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('contacts.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @todo success message when user created.
     *
     * @param  StoreContactRequest  $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(StoreContactRequest $request)
    {
        $contact = Contact::create($request->validated());

        return redirect("contacts/{$contact->id}/edit")->with(
            'success',
            'Contact was created with success.'
        );
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  Contact  $contact
     *
     * @return \Illuminate\Http\Response
     */
    public function edit(Contact $contact)
    {
        $this->authorize('save', $contact);

        return view('contacts.edit', [
            'contact' => $contact
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @todo success message when user was updated.
     *
     * @param  UpdateContactRequest  $request
     * @param  Contact               $contact
     *
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateContactRequest $request, Contact $contact)
    {
        $this->authorize('save', $contact);

        $contact->fill($request->validated())->save();

        return redirect("contacts/{$contact->id}/edit")->with(
            'success',
            'Contact was updated with success.'
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Contact  $contact
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Contact $contact)
    {
        $this->authorize('save', $contact);

        $contact->delete();

        return redirect('contacts')->with(
            'success',
            'Contact was deleted with success.'
        );
    }
}
