<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Project;

class PageController extends Controller
{

    public function create_project()
    {
        $projects = Project::all();

        return view('pages.project.create', ['projects' => $projects]);
    }

    public function show_project($id)
    {
        $projects = Project::all();
        $project = Project::find($id);

        return view('pages.project.show', ['projects' => $projects, 'project' => $project]);
    }
}
