@extends('layouts.dashboard')

@section('content')

    <h1>Pro</h1>

    <form action="" id="project_form">
        <h2>Create a project</h2>

        <label for="project_name"></label>
        <input type="text" placeholder="name" name="name">
        <label for="private"></label>
        <input type="checkbox" name="private" value="false">

        <button type="submit">Create</button>
    </form>

@endsection
