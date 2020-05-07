<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('/auth/login');
});

Auth::routes();

/* Pages */
Route::get('/home', 'HomeController@index')->name('home');
Route::get('/create_project', 'PageController@create_project')->name('create_project');
Route::get('/show_project/{id}', 'PageController@show_project')->name('show_project');

/* Project */
Route::resource('projects', 'ProjectController');
