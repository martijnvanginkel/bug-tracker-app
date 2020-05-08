<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new App\User;

        $user->name = 'martijn';
        $user->email = 'hoi@hoi.nl';
        $user->password = bcrypt('hoihoi123');

        $user->save();
    }
}
