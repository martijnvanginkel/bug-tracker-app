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
        $user->email = 'martijn@martijn.nl';
        $user->password = 'martijn123';

        $user->save();
    }
}
