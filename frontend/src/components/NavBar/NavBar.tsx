function NavBar() {
  return (
    <>
      <nav className="bg-green-600">
        <div><img src="/img/icon-menu-hamburger.svg" alt="" /></div>
        <div>
            <img src="/img/icon-search.svg" alt="magnifying glass" />
            <input type="text" placeholder="Search by title..." />
        </div>
        <div>
          <button><img src="/img/icon-add.svg" alt="" /><p>Add Bookmark</p></button>
          <img src="" alt="" />
        </div>
      </nav>
    </>
  );
}

export default NavBar;
