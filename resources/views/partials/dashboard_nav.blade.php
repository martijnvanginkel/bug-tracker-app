<aside class="menu aside-menu">
    <h1 class="side-nav-title"><i class="fa fa-bug" aria-hidden="true"></i>B-TRACK</h1>
    <p class="menu-label">General</p>
    <ul class="menu-list">
        <li><a href="{{ route('home') }}" class="is-active">Home</a></li>
        <li><a>Users</a></li>
    </ul>
    <p class="menu-label">Projects</p>
    <ul class="menu-list">
        <li>
        <a href="#">New Project</a>
            <ul>
                @foreach ($projects as $project)
                    <nav-item name="{{ $project->name }}" project_id="{{ $project->id }}"></nav-item>
                @endforeach
            </ul>
            </li>
        <li><a>Manage Users</a></li>
        <li class="logout-link">
            <a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">{{ __('Logout') }}<i class="fa fa-sign-out" aria-hidden="true"></i></a>
            <form id="logout-form" action="{{ route('logout') }}" method="POST">@csrf</form>
        </li>
    </ul>
</aside>
