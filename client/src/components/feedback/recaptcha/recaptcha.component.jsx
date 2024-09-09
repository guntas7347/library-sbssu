import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha = ({ onChange }) => {
  return (
    <div>
      <ReCAPTCHA
        sitekey="6LczFYgpAAAAALk-4XyUrx0bRXOXoWLK9phbwe1O"
        onChange={onChange}
      />
    </div>
  );
};

export default ReCaptcha;
