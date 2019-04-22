<?php

namespace App\Policies;

use App\User;
use App\Contact;
use Illuminate\Auth\Access\HandlesAuthorization;

class ContactPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view/update/delete the contact.
     *
     * @param  \App\User  $user
     * @param  \App\Contact  $contact
     * @return mixed
     */
    public function save(User $user, Contact $contact)
    {
        return $user->is($contact->user);
    }
}
