import styles from "./home.module.css";
import CreateUser from "../../components/CreateUser/CreateUser";
import RememberMe from "../../components/rememberMe/RememberMe";

const Home = () => {
  return (
    <>
      <section className={styles.home}>
        <img src="/logo.png" alt="Picture of school logo" />

        <CreateUser />

        <RememberMe />
      </section>
    </>
  );
};

export default Home;
