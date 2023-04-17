import "./Header.css";
import Netflix from "../imgs/netflix--logo.png";
export default ({ black }) => {
  return (
    <header className={black ? "header--black" : ""}>
      <div className="header--logo">
        <a href="">
          <img src={Netflix} alt="Netflix"></img>
        </a>
      </div>
      <div className="header--users">
        <a href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg"
            alt="Usuário"
          ></img>
        </a>
      </div>
    </header>
  );
};
