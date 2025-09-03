import styles from "./qrCodeGenerator.module.css";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = () => {
  const url = "http://localhost:5173/";

  return (
    <div className={styles.QRCode}>
      <h3>Scan QR for at starte quiz</h3>
      <QRCodeCanvas value={url} size={150} />
      <p>{url}</p>
    </div>
  );
};

export default QRCodeGenerator;
