import styles from "../css/components/LoginLoader.module.css";

const LoginLoader = () => {
  return (
    <div className={styles.loader_container}>
      <div class={styles.pencil}>
        <div class={styles.pencil__ball_point}></div>
        <div class={styles.pencil__cap}></div>
        <div class={styles.pencil__cap_base}></div>
        <div class={styles.pencil__middle}></div>
        <div class={styles.pencil__eraser}></div>
      </div>
      <div class={styles.line}></div>
      <h2>
        If the Google login popup does not appear, kindly refresh the page and
        attempt to sign in again.
        <br /> Otherwise, please wait as we complete the login process. <br />{" "}
        <br />
        Thank you for your patience.
      </h2>
    </div>
  );
};

export default LoginLoader;
