import QRCode from "qrcode";
import { useEffect, useState } from "react";
import CopyButton from "../../components/buttons/copy-button";

const TwoFactorSetup = ({ otpauthUrl, secret }) => {
  const [qrDataURL, setQrDataURL] = useState("");

  const [manually, setManually] = useState(false);

  useEffect(() => {
    if (otpauthUrl) {
      QRCode.toDataURL(otpauthUrl)
        .then(setQrDataURL)
        .catch((err) => console.error(err));
    }
  }, [otpauthUrl]);

  return (
    <div className="md:min-w-96">
      {!manually ? (
        <div className="">
          <h2>Scan this QR with Google Authenticator</h2>
          <div className="flex flex-col justify-center">
            {qrDataURL && (
              <img
                src={qrDataURL}
                alt="2FA QR Code"
                className="size-40 self-center"
              />
            )}
            <button
              type="button"
              onClick={() => setManually(true)}
              className="text-center text-blue-500 hover:underline cursor-pointer"
            >
              Can't scan?
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          <p>Enter below code manually in Google Authenticator:</p>
          <p className="font-mono text-blue-700 break-words">
            <code>{secret.match(/.{1,4}/g).join(" ")}</code>
            <p className="flex gap-2 items-center text-blue-600">
              Copy: <CopyButton text={secret} />
            </p>
          </p>
          <button
            type="button"
            onClick={() => setManually(false)}
            className="text-center text-blue-500 hover:underline cursor-pointer"
          >
            Scan QR Code
          </button>
        </div>
      )}
    </div>
  );
};
export default TwoFactorSetup;
