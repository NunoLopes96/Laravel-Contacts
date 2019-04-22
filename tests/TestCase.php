<?php

namespace Tests;

use App\User;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    /**
     * Creates a user if non provided and sign in with it.
     *
     * @param User|null $user - User to be loggedin.
     *
     * @return User
     */
    protected function signIn(User $user = null): User
    {
        $user = $user ?: factory('App\User')->create();

        $this->actingAs($user);

        return $user;
    }
}
