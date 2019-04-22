<?php

use App\Contact;
use App\User;
use Faker\Generator as Faker;

$factory->define(Contact::class, function (Faker $faker) {
    return [
        'user_id'      => factory(User::class),
        'first_name'   => $faker->firstName,
        'last_name'    => $faker->lastName,
        'phone_number' => $faker->phoneNumber,
        'email'        => $faker->unique()->safeEmail,
    ];
});
