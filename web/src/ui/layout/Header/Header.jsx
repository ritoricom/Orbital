import { useMediaQuery } from "@/lib/media";
import { CityLinks, Container, Logo } from "@/ui/layout";

import styles from "./Header.module.css";

export const Header = ({ className, children }) => {
  const matches = useMediaQuery("(max-width: 1024px)");

  return (
    <header className={className}>
      <Container>
        <div className={styles.headerInner}>
          <div className={styles.headerMain}>
            <Logo color="secondary" className={styles.headerLogo} />
            {!matches && <CityLinks />}
          </div>
          <div className={styles.headerSecond}>{children}</div>
        </div>
      </Container>
    </header>
  );
};
