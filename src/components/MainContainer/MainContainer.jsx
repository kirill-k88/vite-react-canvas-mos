import { MainCanv } from '../MainCanv/MainCanv';
import styles from './MainContainer.module.scss';

export const MainContainer = () => {
  return (
    <section className={styles.maincontainer}>
      <MainCanv />
    </section>
  );
};
