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
        // Validate always if there is an user logged in,
        // if not, redirects the the login page.
        $this->middleware('auth');
    }

    /**
     * Display the current user's contacts.
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
     * @param  int  $id - ID of the Contact that is going to be edited.
     *
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
     * @param  StoreContactRequest  $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(StoreContactRequest $request)
    {
        // Creates the contact, adding the loggedin user id
        // to the record in the ContactObserver.
        $contact = Contact::create($request->validated());

        // Redirects to the edit view of the created contact
        // with a success message.
        return redirect("contacts/{$contact->id}/edit")->with(
            'success',
            'Contact was created with success.'
        );
    }

    /**
     * Show the form for editing the specified Contact.
     *
     * @param  Contact  $contact - Contact that is going to be edited.
     *
     * @return \Illuminate\Http\Response
     */
    public function edit(Contact $contact)
    {
        // Check if the user can see/edit the contact.
        $this->authorize('save', $contact);

        // Loads the edit view with the given contact.
        return view('contacts.edit', [
            'contact' => $contact
        ]);
    }

    /**
     * Update the specified Contact in storage.
     *
     * @param  UpdateContactRequest  $request - Request instance with the validated data.
     * @param  Contact               $contact - Contact that is going to be updated.
     *
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateContactRequest $request, Contact $contact)
    {
        // Check if the user can update the contact.
        $this->authorize('save', $contact);

        // Update the contact with the validated data,
        // and save it in the persistence layer.
        $contact->fill($request->validated())->save();

        // Redirects to the same view with a success message.
        return redirect()->back()->with(
            'success',
            'Contact was updated with success.'
        );
    }

    /**
     * Remove the specified Contact from storage.
     *
     * @param  Contact  $contact - Contact that is going to be destroyed.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Contact $contact)
    {
        // Check if the user can delete the contact.
        $this->authorize('save', $contact);

        // Delete the contact.
        $contact->delete();

        // Redirects to the same view with a success message.
        return redirect()->back()->with(
            'success',
            'Contact was deleted with success.'
        );
    }
}
