<nav className="navbar navbar-expand-md navbar-light bg-light sticky-top">
  <div className="container-fluid">
    {/* href # will bring you to the top of the page */}
    <a className="navbar-brand" href="/index.html">
      <img src="/images/baseline_fitness_center_black_18dp.png" />
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarResponsive"
    >
      {/* adds the hamburger menu icon to our navbar button */}
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarResponsive">
      {/* ml-auto pushes the navigation items to the right hand side if screen is large enough and not using the hamburger menu */}
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <a className="nav-link" href="/index.html">
            Home
          </a>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
            id="aboutDropDown"
            aria-haspopup="true"
            aria-expanded="false"
            href="/webpages/about.html"
          >
            About
          </a>
          <ul
            className="first dropdown-menu fade-up"
            aria-labelledby="aboutDropDown"
          >
            <li>
              <a className="dropdown-item" href="/webpages/about.html">
                About Us
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/webpages/team.html">
                Team
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Location
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                FAQ
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            WOD
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/webpages/schedule.html">
            Schedule
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/webpages/pricing.html">
            Pricing
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/webpages/contact.html">
            Contact
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>;
