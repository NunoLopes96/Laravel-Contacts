<?php

namespace Tests\Unit;

use App\Contact;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_belongs_to_an_user()
    {
        $contact = factory(Contact::class)->create();

        $this->assertInstanceOf(User::class, $contact->user);
    }
}
