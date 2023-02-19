import './styles.css'

export const Footer = () => {
  return (
    <div
      className="footer_div"
    >
      <p style={{ fontWeight: "bold", fontSize: 10 }}>
        Inspired by:{" "}
        <a target="_blank" href="https://p101s2.github.io/">
          Produce 101 Season 2 Rankings
        </a>
      </p>
      <p style={{ fontWeight: "bold", fontSize: 10 }}>
        Contribute to the project on{" "}
        <a target="_blank" href="https://github.com/boysplanetcharts/boysplanetcharts.github.io">
          Github
        </a>
      </p>
      <p style={{ fontWeight: "bold", fontSize: 10, textAlign: "center" }}>
        If you find any errors or inaccuracies, you can send me a message on{" "}
        <a target="_blank" href="https://twitter.com/gyuuviins">
          Twitter
        </a>
      </p>
    </div>
  );
};
