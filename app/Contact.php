<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Contact Eloquent's Model class
 *
 * This class will be used for communicating with the database's 'contacts' table.
 *
 * @property int    id           - Id of the contact.
 * @property int    user_id      - Id of the user who created the contact.
 * @property string first_name   - First name of the contact.
 * @property string last_name    - Last name of the contact.
 * @property string email        - Email of the contact.
 * @property string phone_number - Phone number of the contact.
 */
class Contact extends Model
{
    /**
     * The User of the Contact.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user() {
        return $this->belongsTo(User::class);
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array $fillable
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone_number',
    ];
}
