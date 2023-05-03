import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright ⓒ made by Pakize's heart {year}</p>
    </footer>
  );
}

export default Footer;
