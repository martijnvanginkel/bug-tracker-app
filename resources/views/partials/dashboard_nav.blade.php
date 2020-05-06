<aside class="menu aside-menu">
    <h1 class="side-nav-title"><i class="fa fa-bug" aria-hidden="true"></i>B-TRACK</h1>
    <p class="menu-label">General</p>
    <ul class="menu-list">
        <li><a class="is-active">Dashboard</a></li>
        <li><a>Customers</a></li>
    </ul>
    <p class="menu-label">Administration</p>
    <ul class="menu-list">
        <li><a>Team Settings</a></li>
        <li>
            <a>Projects</a>
            <ul>
                <li><a>Members</a></li>
                <li><a>Plugins</a></li>
                <li><a>Add a member</a></li>
            </ul>
            </li>
        <li><a>Manage Users</a></li>
        <li class="logout-link">      
            <a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">{{ __('Logout') }}<i class="fa fa-sign-out" aria-hidden="true"></i></a>
            <form id="logout-form" action="{{ route('logout') }}" method="POST">@csrf</form>
        </li>
    </ul>
</aside>
