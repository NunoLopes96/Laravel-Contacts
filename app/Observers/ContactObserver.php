<?php

namespace App\Observers;

use App\Contact;

class ContactObserver
{
    /**
     * Handle the contact "creating" event.
     *
     * @param  \App\Contact  $contact
     * @return void
     */
    public function creating(Contact $contact)
    {
        $contact->setAttribute('user_id', auth()->id());
    }
}
