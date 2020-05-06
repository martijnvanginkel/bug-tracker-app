@extends('layouts.dashboard')

@section('content')

    <h1>Pro</h1>

    <form action="">
        <h2>Create a project</h2>

        <label for="project_name"></label>
        <input type="text" placeholder="name" name="project_name">
        <label for="private"></label>
        <input type="checkbox" name="private" value="private">

        <button type="submit">Create</button>
    </form>
@endsection
