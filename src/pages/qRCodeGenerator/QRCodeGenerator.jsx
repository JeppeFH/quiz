import styles from "./qrCodeGenerator.module.css";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = () => {
  const url = "http://localhost:5173/";

  return (
    <div className={styles.qRCode}>
      <h1>Scan QR for at starte quiz</h1>
      <QRCodeCanvas value={url} size={300} />
      <p>{url}</p>
    </div>
  );
};

export default QRCodeGenerator;
