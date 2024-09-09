import "./footer.styles.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Copyright &copy; 2024. Developed by{" "}
        <a
          href="https://guntassandhu.com/"
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 underline"
        >
          Guntas Sandhu
        </a>
      </p>
    </footer>
  );
};

export default Footer;
