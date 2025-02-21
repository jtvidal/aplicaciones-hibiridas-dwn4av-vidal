const Header = () => {
  return (
    <header className="flex justify-between items-center bg-zinc-900 p-4 text-zinc-100">
      <h1>Your Todo List!</h1>
      <nav>
        <ul className="flex gap-4">
          <li>
            <a href="">Add Task</a>
          </li>
          <li>
            <a href="">Your Tasks</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
