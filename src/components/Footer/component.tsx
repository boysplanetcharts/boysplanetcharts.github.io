import './styles.css'
import { BR } from 'country-flag-icons/react/3x2'


export const Footer = () => {
  return (
    <div
      className="footer_div"
    >
      <p style={{ fontWeight: "bold", fontSize: 9 }}>
        Inspired by:{" "}
        <a target="_blank" href="https://p101s2.github.io/">
          Produce 101 Season 2 Rankings
        </a>
      </p>
      <p style={{ fontWeight: "bold", fontSize: 9 }}>
        Contribute to the project on{" "}
        <a target="_blank" href="https://github.com/boysplanetcharts/boysplanetcharts.github.io">
          Github
        </a>
      </p>
      <p style={{ fontWeight: "bold", fontSize: 9, textAlign: "center" }}>
        If you find any errors or inaccuracies, you can send me a message on{" "}
        <a target="_blank" href="https://twitter.com/skawngrazi">
          Twitter
        </a>
      </p>
      <p style={{ fontWeight: "bold", fontSize: 9, textAlign: "center", paddingTop: 8 }}>

        Made in <BR fontSize={8} style={{width: 12, paddingLeft: 2}} />

      </p>
    </div>
  );
};
