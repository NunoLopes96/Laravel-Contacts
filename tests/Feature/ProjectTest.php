<?php

namespace Tests\Feature;

use App\Contact;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProjectTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function guests_cannot_create_contacts()
    {
        $contact = factory(Contact::class)->make();

        $this->post('contacts', $contact->getAttributes())->assertRedirect('login');
        $this->assertDatabaseMissing('contacts', $contact->getAttributes());
    }

    /** @test */
    function user_creates_always_own_contacts()
    {
        // Sign in an User.
        $signedInUser = $this->signIn();

        // Create a different user.
        $contact = factory(Contact::class)->make();

        // Check that the id's of the users are different.
        $this->assertNotEquals(
            $signedInUser->id,
            $contact->user_id,
            'The contact user_id must be different to the signed in user.'
        );

        // Performs test.
        $this->post('contacts', $contact->getAttributes());

        // Check that with the user id changed to the user signed in, we find the contact.
        $contact->setAttribute('user_id', $signedInUser->id);
        $this->assertDatabaseHas('contacts', $contact->getAttributes());
    }

    /** @test */
    function different_owner_of_a_contact_cannot_update_it()
    {
        // Login with a created user.
        $this->signIn();

        // Login with the user of the contact.
        $contact = factory(Contact::class)->create();

        // Change the first_name and try to insert it in the database.
        $contact->setAttribute('first_name', 'New Dummy Name');
        $this->patch("contacts/{$contact->id}", $contact->getAttributes())
             ->assertStatus(403);

        // Assert that the changed contact is not in the database.
        $this->assertDatabaseMissing('contacts', $contact->getAttributes());
    }

    /** @test */
    function only_the_owner_of_a_contact_can_update_it()
    {
        // Create a contact.
        $contact = factory(Contact::class)->create();

        // Login with the user of the contact.
        $this->signIn($contact->user);

        // Change the first_name and try to insert it in the database.
        $contact->setAttribute('first_name', 'New Dummy Name');
        $this->patch("contacts/{$contact->id}", $contact->getAttributes());

        // Assert that the changed contact is in the database.
        $this->assertDatabaseHas('contacts', $contact->getAttributes());
    }

    /** @test */
    function different_owner_of_a_contact_cannot_delete_it()
    {
        // Login with a created user.
        $this->signIn();

        // Create a contact with a different user.
        $contact = factory(Contact::class)->create();

        // Delete the contact request.
        $this->delete("contacts/{$contact->id}")
             ->assertStatus(403);

        // Assert that the changed contact is not in the database.
        $this->assertDatabaseHas('contacts', $contact->getAttributes());
    }

    /** @test */
    function only_the_owner_of_a_contact_can_delete_it()
    {
        // Create a contact.
        $contact = factory(Contact::class)->create();

        // Login with the user of the contact.
        $this->signIn($contact->user);

        // Delete the contact request.
        $this->delete("contacts/{$contact->id}");

        // Assert that the deleted contact is not anymore in the database.
        $this->assertDatabaseMissing('contacts', $contact->getAttributes());
    }

    /** @test */
    function different_owner_of_a_contact_cannot_see_it()
    {
        // Login with a created user.
        $this->signIn();

        // Create a contact with a different user.
        $contact = factory(Contact::class)->create();

        // Get the contact edit page request.
        $this->get("contacts/{$contact->id}/edit")
             ->assertStatus(403);
    }

    /** @test */
    function only_the_owner_of_a_contact_can_see_it()
    {
        // Create a contact.
        $contact = factory(Contact::class)->create();

        // Login with the user of the contact.
        $this->signIn($contact->user);

        // Get the contact edit request.
        $get = $this->get("contacts/{$contact->id}/edit");

        // Performs assertion.
        $this->assertTrue(
            $contact->is($get->viewData('contact')),
            'The contact that is going to be edited is not the pretended.');
    }

    /** @test */
    function user_only_see_his_contacts()
    {
        // Create a contact.
        $contact = factory(Contact::class)->create();

        // Login with the user of the contact.
        $this->signIn($contact->user);

        // Create another contact.
        factory(Contact::class)->create();

        // Get the contact edit request.
        $get = $this->get("contacts");

        // Performs assertion.
        $this->assertEquals(
            1,
            $get->viewData('contacts')->count(),
            'There should only exists 1 contact for the signed user.'
        );
        $this->assertTrue(
            $contact->is($get->viewData('contacts')->first()),
            'Only 1 contact should have been shown for the signed user.');
    }
}
