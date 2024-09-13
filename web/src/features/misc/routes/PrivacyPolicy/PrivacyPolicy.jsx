import { useTranslation } from "next-i18next";
import NextLink from "next/link";

import { SEO } from "@/lib/meta";
import { BookingPanel } from "@/lib/bnovo";
import {
  Container,
  Footer,
  Header,
  Main,
  Promo,
  PromoContent,
  PromoTitle,
  StickyHeader,
} from "@/ui/layout";
import { Button, SearchButton } from "@/ui/inputs";
import {
  L_BREAKPOINT_DOWN,
  S_BREAKPOINT_DOWN,
  XL_BREAKPOINT_DOWN,
} from "@/config/breakpoints";
import { useMediaQuery } from "@/lib/media";
import { Title, Text } from "@/ui/data-display";
import { APP_HOST } from "@/config/app";

import promoImg from "@/assets/images/spb/promo.jpg";
import styles from "./PrivacyPolicy.module.css";

export const PrivacyPolicy = () => {
  const { t } = useTranslation("misc", {
    keyPrefix: "routes.privacyPolicy",
  });

  const isLaptop = useMediaQuery(XL_BREAKPOINT_DOWN);
  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);
  const isMobile = useMediaQuery(S_BREAKPOINT_DOWN);

  const textVariant = isTablet ? (isMobile ? "normalS" : "normalM") : "normalL";

  return (
    <>
      <SEO title={t("metaTitle")} />
      <Promo img={promoImg}>
        <Header>
          <SearchButton />
        </Header>
        <StickyHeader withBurgerMenu={false} />
        <PromoContent desktopCenter spacing="m">
          <PromoTitle
            order={isLaptop ? (isTablet ? 3 : 2) : 1}
            hasWidthLimit={false}
          >
            {t("title")}
          </PromoTitle>
        </PromoContent>
      </Promo>
      <Main>
        <BookingPanel />
        <Container>
          <div className={styles.container}>
            <div className={styles.wrapper}>
              <Title order={isTablet ? 3 : 4} className={styles.mainTitle}>
                {t("title1")}
              </Title>
              <div className={styles.text}>
                <Text variant={textVariant} color="secondary">
                  {`${t("text1")} `}
                  <NextLink
                    passHref
                    className={styles.link}
                    target="_blank"
                    href="/"
                  >
                    {APP_HOST}
                  </NextLink>
                  .
                </Text>
                <Text variant={textVariant} color="secondary">
                  {`${t("text2")} `}
                  <NextLink
                    passHref
                    className={styles.link}
                    target="_blank"
                    href="/"
                  >
                    {APP_HOST}
                  </NextLink>
                  {` ${t("text3")}`}
                </Text>
                <Text variant={textVariant} color="secondary">
                  {t("text4")}
                </Text>
                <Text variant={textVariant} color="secondary">
                  {t("text5")}
                </Text>
              </div>

              <div className={styles.listWrapper}>
                <ol>
                  <li className={styles.listEl}>
                    <Title order={4} className={styles.title}>
                      {t("listTitle1")}
                    </Title>
                  </li>
                  <ol className={styles.listItem}>
                    <div className={styles.listDist}>
                      <li>{t("listItem1-1")}</li>
                      <ol className={styles.listDist}>
                        <li>{t("listItem1-1-1")}</li>
                        <li>{t("listItem1-1-2")}</li>
                        <li>{t("listItem1-1-3")}</li>
                        <li>{t("listItem1-1-4")}</li>
                        <li>{t("listItem1-1-5")}</li>
                        <li>{t("listItem1-1-6")}</li>
                        <li>{t("listItem1-1-7")}</li>
                        <li>{t("listItem1-1-8")}</li>
                        <li>{t("listItem1-1-9")}</li>
                        <li>
                          <span>
                            {`${t("listItem1-1-10")} `}
                            <NextLink
                              passHref
                              className={styles.link}
                              target="_blank"
                              href="/"
                            >
                              {APP_HOST}
                            </NextLink>
                            .
                          </span>
                        </li>
                        <li>{t("listItem1-1-11")}</li>
                        <li>{t("listItem1-1-12")}</li>
                        <li>{t("listItem1-1-13")}</li>
                      </ol>
                    </div>
                  </ol>
                  <li className={styles.listEl}>
                    <Title order={4} className={styles.title}>
                      {t("listTitle2")}
                    </Title>
                  </li>
                  <ol className={styles.listItem}>
                    <div className={styles.listDist}>
                      <li>
                        <span>
                          {`${t("listItem2-1-first")} `}
                          <NextLink
                            passHref
                            className={styles.link}
                            target="_blank"
                            href="/"
                          >
                            {APP_HOST}
                          </NextLink>
                          {`${t("listItem2-1-second")} `}
                          <NextLink
                            passHref
                            className={styles.link}
                            target="_blank"
                            href="/"
                          >
                            {APP_HOST}
                          </NextLink>
                          {`${t("listItem2-1-third")} `}
                        </span>
                      </li>
                      <li>
                        <span>
                          {`${t("listItem2-2")} `}
                          <NextLink
                            passHref
                            className={styles.link}
                            target="_blank"
                            href="/privacy-policy"
                          >
                            {t("link", {
                              selfLink: APP_HOST,
                            })}
                          </NextLink>
                          .
                        </span>
                      </li>
                      <li>
                        <span>
                          {`${t("listItem2-3-first")} `}
                          <NextLink
                            passHref
                            className={styles.link}
                            target="_blank"
                            href="/"
                          >
                            {APP_HOST}
                          </NextLink>
                          {`${t("listItem2-3-second")} `}
                          <NextLink
                            passHref
                            className={styles.link}
                            target="_blank"
                            href="/"
                          >
                            {APP_HOST}
                          </NextLink>
                          .
                        </span>
                      </li>
                      <li>{t("listItem2-4")}</li>
                      <li>{t("listItem2-5")}</li>
                    </div>
                  </ol>
                  <li className={styles.listEl}>
                    <Title order={4} className={styles.title}>
                      {t("listTitle3")}
                    </Title>
                  </li>
                  <ol className={styles.listItem}>
                    <div className={styles.listDist}>
                      <li>{t("listItem3-1")}</li>
                      <li>
                        <span>
                          {`${t("listItem3-2")} `}
                          <NextLink
                            passHref
                            className={styles.link}
                            target="_blank"
                            href="/"
                          >
                            {APP_HOST}
                          </NextLink>
                          .
                        </span>
                      </li>
                      <li>{t("listItem3-3")}</li>
                    </div>
                    <div className={styles.listDist}>
                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.textLikeUnorderedList}
                      >
                        {t("listItem3-3-unordered-list-item-1")}
                      </Text>
                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.textLikeUnorderedList}
                      >
                        {t("listItem3-3-unordered-list-item-2")}
                      </Text>
                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.textLikeUnorderedList}
                      >
                        {t("listItem3-3-unordered-list-item-3")}
                      </Text>
                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.textLikeUnorderedList}
                      >
                        {t("listItem3-3-unordered-list-item-4")}
                      </Text>
                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.textLikeUnorderedList}
                      >
                        {t("listItem3-3-unordered-list-item-5")}
                      </Text>
                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.textLikeUnorderedList}
                      >
                        {t("listItem3-3-unordered-list-item-6")}
                      </Text>
                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.textLikeUnorderedList}
                      >
                        {t("listItem3-3-unordered-list-item-7")}
                      </Text>
                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.textLikeUnorderedList}
                      >
                        {t("listItem3-3-unordered-list-item-8")}
                      </Text>
                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.textLikeUnorderedList}
                      >
                        {t("listItem3-3-unordered-list-item-9")}
                      </Text>
                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.textLikeUnorderedList}
                      >
                        {t("listItem3-3-unordered-list-item-10")}
                      </Text>
                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.textLikeUnorderedList}
                      >
                        {t("listItem3-3-unordered-list-item-11")}
                      </Text>
                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.textLikeUnorderedList}
                      >
                        {t("listItem3-3-unordered-list-item-12")}
                      </Text>
                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.textLikeUnorderedList}
                      >
                        {t("listItem3-3-unordered-list-item-13")}
                      </Text>
                      <li>
                        <span>
                          {`${t("listItem2-3-first")} `}
                          <NextLink
                            passHref
                            className={styles.link}
                            target="_blank"
                            href="/"
                          >
                            {APP_HOST}
                          </NextLink>
                          {`${t("listItem2-3-second")} `}
                        </span>
                      </li>
                      <Text
                        variant={textVariant}
                        color="secondary"
                        className={styles.text}
                      >
                        {t("listItem3-4-text1")}
                      </Text>
                      <Text
                        variant={textVariant}
                        color="secondary"
                        className={styles.text}
                      >
                        {t("listItem3-4-text2")}
                      </Text>
                      <li>{t("listItem3-5")}</li>

                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.textLikeUnorderedList}
                      >
                        {t("listItem3-5-unordered-list-item-1")}
                      </Text>
                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.textLikeUnorderedList}
                      >
                        {t("listItem3-5-unordered-list-item-2")}
                      </Text>
                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.textLikeUnorderedList}
                      >
                        {t("listItem3-5-unordered-list-item-3")}
                      </Text>
                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.textLikeUnorderedList}
                      >
                        {t("listItem3-5-unordered-list-item-4")}
                      </Text>

                      <li>{t("listItem3-6")}</li>

                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.textLikeUnorderedList}
                      >
                        {t("listItem3-6-unordered-list-item-1")}
                      </Text>
                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.textLikeUnorderedList}
                      >
                        {t("listItem3-6-unordered-list-item-2")}
                      </Text>
                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.textLikeUnorderedList}
                      >
                        {t("listItem3-6-unordered-list-item-3")}
                      </Text>
                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.textLikeUnorderedList}
                      >
                        {t("listItem3-6-unordered-list-item-4")}
                      </Text>
                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.textLikeUnorderedList}
                      >
                        {t("listItem3-6-unordered-list-item-5")}
                      </Text>

                      <ol>
                        <li>{t("listItem3-6-1")}</li>
                        <li>{t("listItem3-6-2")}</li>
                      </ol>

                      <li>{t("listItem3-7")}</li>
                      <li>{t("listItem3-8")}</li>

                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.text}
                      >
                        {t("listItem3-8-text1")}
                        {APP_HOST}.
                      </Text>
                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.text}
                      >
                        {t("listItem3-8-text2")}
                      </Text>

                      <li>
                        <span>
                          {`${t("listItem3-9-first")} `}
                          <NextLink
                            passHref
                            className={styles.link}
                            target="_blank"
                            href="/"
                          >
                            {APP_HOST}
                          </NextLink>
                          {`${t("listItem3-9-second")} `}
                        </span>
                      </li>
                    </div>
                  </ol>
                  <li className={styles.listEl}>
                    <Title order={4} className={styles.title}>
                      {t("listTitle4")}
                    </Title>
                  </li>
                  <ol className={styles.listItem}>
                    <div className={styles.listDist}>
                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.text}
                      >
                        {t("listItem4-text1")}
                      </Text>

                      <li>
                        <span>
                          {`${t("listItem4-1-first")} `}
                          <NextLink
                            passHref
                            className={styles.link}
                            target="_blank"
                            href="/"
                          >
                            {APP_HOST}
                          </NextLink>
                          {`${t("listItem4-1-second")} `}
                        </span>
                      </li>

                      <ol>
                        <div className={styles.listDist}>
                          <li>
                            <span>
                              {`${t("listItem4-1-1")} `}
                              <NextLink
                                passHref
                                className={styles.link}
                                target="_blank"
                                href="/"
                              >
                                {APP_HOST}
                              </NextLink>
                              ;
                            </span>
                          </li>
                          <li>
                            <span>
                              {`${t("listItem4-1-2")} `}
                              <NextLink
                                passHref
                                className={styles.link}
                                target="_blank"
                                href="/"
                              >
                                {APP_HOST}
                              </NextLink>
                              ;
                            </span>
                          </li>
                          <li>
                            <span>
                              {`${t("listItem4-1-3-first")} `}
                              <NextLink
                                passHref
                                className={styles.link}
                                target="_blank"
                                href="/"
                              >
                                {APP_HOST}
                              </NextLink>
                              {`${t("listItem4-1-3-second")} `}
                            </span>
                          </li>
                          <li>{t("listItem4-1-4")}</li>
                          <li>
                            <span>
                              {`${t("listItem4-1-5")} `}
                              <NextLink
                                passHref
                                className={styles.link}
                                target="_blank"
                                href="/"
                              >
                                {APP_HOST}
                              </NextLink>
                              ;
                            </span>
                          </li>
                          <li>
                            <span>
                              {`${t("listItem4-1-6-first")} `}
                              <NextLink
                                passHref
                                className={styles.link}
                                target="_blank"
                                href="/"
                              >
                                {APP_HOST}
                              </NextLink>
                              {`${t("listItem4-1-6-second")} `}
                            </span>
                          </li>
                        </div>
                      </ol>
                    </div>
                  </ol>
                  <li className={styles.listEl}>
                    <Title order={4} className={styles.title}>
                      {t("listTitle5")}
                    </Title>
                  </li>
                  <ol>
                    <div className={styles.listDist}>
                      <li>
                        <Text
                          color="secondary"
                          variant={textVariant}
                          className={styles.text}
                        >
                          {t("listItem5-1")}
                        </Text>
                      </li>

                      <li>
                        <Text
                          color="secondary"
                          variant={textVariant}
                          className={styles.text}
                        >
                          {t("listItem5-2")}
                        </Text>
                      </li>

                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.text}
                      >
                        {t("listItem5-2-text1")}
                      </Text>

                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.textLikeUnorderedList}
                      >
                        {t("listItem5-2-unordered-list-item-1")}
                      </Text>
                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.textLikeUnorderedList}
                      >
                        {t("listItem5-2-unordered-list-item-2")}
                      </Text>
                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.textLikeUnorderedList}
                      >
                        {t("listItem5-2-unordered-list-item-3")}
                      </Text>
                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.textLikeUnorderedList}
                      >
                        {t("listItem5-2-unordered-list-item-4")}
                      </Text>
                      <Text
                        color="secondary"
                        variant={textVariant}
                        className={styles.textLikeUnorderedList}
                      >
                        {t("listItem5-2-unordered-list-item-5")}
                      </Text>

                      <li>
                        <Text
                          color="secondary"
                          variant={textVariant}
                          className={styles.listDist}
                        >
                          {t("listItem5-3")}
                        </Text>
                      </li>
                      <li>
                        <Text
                          color="secondary"
                          variant={textVariant}
                          className={styles.listDist}
                        >
                          {t("listItem5-4")}
                        </Text>
                      </li>
                    </div>
                  </ol>
                  <li className={styles.listEl}>
                    <Title order={4} className={styles.title}>
                      {t("listTitle6")}
                    </Title>
                  </li>
                  <ol className={styles.listItem}>
                    <div className={styles.listDist}>
                      <li>
                        <span>
                          {`${t("listItem6-1-first")} `}
                          <NextLink
                            passHref
                            className={styles.link}
                            target="_blank"
                            href="/"
                          >
                            {APP_HOST}
                          </NextLink>
                          {`${t("listItem6-1-second")} `}
                        </span>
                      </li>
                      <li>{t("listItem6-2")}</li>
                      <li>{t("listItem6-3")}</li>
                    </div>
                  </ol>
                  <li className={styles.listEl}>
                    <Title order={4} className={styles.title}>
                      {t("listTitle7")}
                    </Title>
                  </li>
                  <ol className={styles.listItem}>
                    <div className={styles.listDist}>
                      <div className={styles.listDist}>
                        <li>{t("listItem7-1")}</li>
                        <ol>
                          <div className={styles.listDist}>
                            <li>
                              <span>
                                {`${t("listItem7-1-1")} `}
                                <NextLink
                                  passHref
                                  className={styles.link}
                                  target="_blank"
                                  href="/"
                                >
                                  {APP_HOST}
                                </NextLink>
                                .
                              </span>
                            </li>
                            <li>{t("listItem7-1-2")}</li>
                          </div>
                        </ol>
                      </div>
                      <li>{t("listItem7-2")}</li>
                      <ol>
                        <div className={styles.listDist}>
                          <li>{t("listItem7-2-1")}</li>
                          <li>{t("listItem7-2-2")}</li>
                          <li>{t("listItem7-2-3")}</li>
                        </div>
                      </ol>
                    </div>
                  </ol>
                  <li className={styles.listEl}>
                    <Title order={4} className={styles.title}>
                      {t("listTitle8")}
                    </Title>
                  </li>
                  <ol className={styles.listItem}>
                    <div className={styles.listDist}>
                      <li>{t("listItem8-1")}</li>
                      <li>{t("listItem8-2")}</li>
                      <li>{t("listItem8-3")}</li>
                      <li>{t("listItem8-4")}</li>
                    </div>
                  </ol>
                  <li className={styles.listEl}>
                    <Title order={4} className={styles.title}>
                      {t("listTitle9")}
                    </Title>
                  </li>
                  <ol className={styles.listItem}>
                    <div className={styles.listDist}>
                      <li>
                        <span>
                          {`${t("listItem9-1-first")} `}
                          <NextLink
                            passHref
                            className={styles.link}
                            target="_blank"
                            href="/"
                          >
                            {APP_HOST}
                          </NextLink>
                          {`${t("listItem9-1-second")} `}
                        </span>
                      </li>
                      <li>{t("listItem9-2")}</li>
                      <li>{t("listItem9-3")}</li>
                    </div>
                  </ol>
                  <li className={styles.listEl}>
                    <Title order={4} className={styles.title}>
                      {t("listTitle10")}
                    </Title>
                  </li>
                  <ol className={styles.listItem}>
                    <div className={styles.listDist}>
                      <li>{t("listItem10-1")}</li>
                      <li>{t("listItem10-2")}</li>
                      <li>{t("listItem10-3")}</li>
                      <li>
                        <span>
                          {`${t("listItem10-4")} `}
                          <NextLink
                            passHref
                            className={styles.link}
                            target="_blank"
                            href="/privacy-policy"
                          >
                            {t("link", {
                              selfLink: APP_HOST,
                            })}
                          </NextLink>
                          .
                        </span>
                      </li>
                    </div>
                  </ol>
                </ol>
              </div>
            </div>

            <NextLink passHref href="/">
              <Button
                uppercase
                fullWidth={isTablet ? true : false}
                size="l"
                color="secondaryDark"
              >
                {t("toMain")}
              </Button>
            </NextLink>
          </div>
        </Container>
      </Main>
      <Footer chooseCity={false} />
    </>
  );
};
