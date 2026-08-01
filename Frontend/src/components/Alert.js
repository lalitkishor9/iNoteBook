export default function Alert({ alert }) {
  return alert ? <div className={`alert-toast ${alert.type === "danger" ? "danger" : ""}`}>{alert.msg}</div> : null;
}
