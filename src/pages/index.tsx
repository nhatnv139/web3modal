// import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import logo from "../../public/images/logopc.png";
import logomb from "../../public/images/logomb.png";
import img2 from "../../public/images/left.svg";
import img3 from "../../public/images/Interface.svg";
import img4 from "../../public/images/Gem.png";
import React, { useState } from "react";
import CustomSelect from "../components/CustomSelect";
import SelectLangues from "../components/SelectLangues";
import ModalSmartContract from "../components/ModalSmartContract";
import SidebarMobile from "../components/SidebarMobile";

import Link from "next/link";
import { useRouter } from "next/router";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkEmailApi } from "../api/modules/email";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import main from "../../public/images/main.png";

const Home: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNetworkSwitchHighlighted, setIsNetworkSwitchHighlighted] =
    useState(false);
  const [isConnectHighlighted, setIsConnectHighlighted] = useState(false);

  const closeAll = () => {
    setIsNetworkSwitchHighlighted(false);
    setIsConnectHighlighted(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(true);
  };
  const emitCloseSidebar = () => {
    setIsSidebarOpen(false);
  };
  const itemList = [
    {
      id: 1,
      label: t("information1"),
      iconSrc: img3,
    },
    {
      id: 2,
      label: t("information2"),
      iconSrc: img3,
    },
    {
      id: 3,
      label: t("information3"),
      iconSrc: img3,
    },
    {
      id: 4,
      label: t("information4"),
      iconSrc: img3,
    },
  ];
  const itemListGem = [
    {
      id: 1,
      label: "F1: $1/ref",
      iconSrc: img4,
    },
    {
      id: 2,
      label: "F2: $0.5/ref",
      iconSrc: img4,
    },
  ];
  const itemListPurchase = [
    {
      id: 1,
      label: t("sub_purchase1"),
    },
    {
      id: 2,
      label: t("sub_purchase2"),
    },
    {
      id: 3,
      label: t("sub_purchase3"),
    },
    {
      id: 4,
      label: t("sub_purchase4"),
    },
    {
      id: 5,
      label: t("sub_purchase5"),
    },
  ];
  const imgClassName = showSubtitle
    ? `${styles.homeContentChooieImage} ${styles.rotatedImage}`
    : styles.homeContentChooieImage;
  const fetchCheckEmailData = async () => {
    try {
      const response = await checkEmailApi({ email: email });
      if (response.data.data.message === "valid") {
        openModal();
      } else {
        toast.error(t("email_novalid"));
        setError(t("email_novalid"));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleInputChange = (event) => {
    setEmail(event.target.value);
    setError("");
  };

  const handleButtonClick = () => {
    if (!isValidEmail(email)) {
      setError(t("email_novalid"));
      return;
    }
    fetchCheckEmailData();
  };
  const handleClick = () => {
    setShowSubtitle(!showSubtitle);
  };
  const handleChange = (selectedOption) => {};
  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Athene Network</title>
        <meta content="Athene Network" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.navbar}>
            <div className={styles.logo}>
              <Link href="/">
                <Image src={logo} alt="picture" layout="fixed" />
              </Link>
            </div>
            <div className={styles.logomb}>
              <div className={styles.logombTwo}>
                <Image
                  className={styles.logombIcon}
                  src={main}
                  alt="picture"
                  layout="fixed"
                  onClick={toggleSidebar}
                />
                <Link href="/">
                  <Image src={logomb} alt="picture" layout="fixed" />
                </Link>
              </div>
            </div>
            <nav className={styles.nav}>
              <Link href="/">
                <div
                  className={
                    router.pathname === "/" ? styles.activeTab : styles.tab
                  }
                >
                  {t("home")}
                </div>
              </Link>
              <Link href="/history">
                <div
                  className={
                    router.pathname === "/history"
                      ? styles.activeTab
                      : styles.tab
                  }
                >
                  {t("history")}
                </div>
              </Link>
            </nav>
          </div>
          <div className={styles.actionBtn}>
            <div className={styles.actionBtnConnet}>
              <div className={styles.buttons}>
                <div
                  onClick={closeAll}
                  className={`${styles.highlight} ${
                    isNetworkSwitchHighlighted ? styles.highlightSelected : ``
                  }`}
                >
                  <w3m-network-button />
                </div>
                <div
                  onClick={closeAll}
                  className={`${styles.highlight} ${
                    isConnectHighlighted ? styles.highlightSelected : ``
                  }`}
                >
                  <w3m-button />
                </div>
              </div>
              {/* <ConnectButton label="Connect Wallet" accountStatus="address" /> */}
            </div>
            <div className={styles.actionBtnSelect}>
              <SelectLangues onChange={handleChange} />
            </div>
          </div>
        </div>
        {/* content */}
        <div className={styles.homeContent}>
          <div className={styles.homeContentTitle}>{t("title")}</div>
          <div className={styles.homeContentSub}>{t("sub_title")}</div>
          <div className={styles.homeContentChooie}>
            <ul>
              {itemList.map((item, index) => (
                <li key={item.id} className={styles.homeContentChooieItem}>
                  <Image
                    src={item.iconSrc}
                    alt="picture"
                    layout="fixed"
                    width={16}
                    height={16}
                    className={styles.homeContentChooieImageOption}
                  />
                  <div className={styles.homeContentChooieItemText}>
                    {item.label}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.homeContentGemTitle}>{t("ref_title")}</div>
          <div className={styles.homeContentGemItem}>
            <div>
              {itemListGem.map((item, index) => (
                <li key={item.id} className={styles.homeContentGemItemMain}>
                  <Image
                    src={item.iconSrc}
                    alt="picture"
                    layout="fixed"
                    width={16}
                    height={16}
                    className={styles.homeContentChooieImage}
                  />
                  <div className={styles.homeContentGemItemText}>
                    {item.label}
                  </div>
                </li>
              ))}
            </div>
          </div>
          <div className={styles.homeContentPurchase}>
            <div
              className={styles.homeContentPurchaseContainer}
              onClick={handleClick}
            >
              <div>
                <div className={styles.homeContentPurchaseMain}>
                  <div className={styles.homeContentPurchaseTitle}>
                    {t("purchase_title")}
                  </div>
                  <Image
                    src={img2}
                    alt="picture"
                    layout="fixed"
                    width={24}
                    height={24}
                    className={imgClassName}
                  />
                </div>
              </div>
              {showSubtitle && (
                <div className={styles.homeContentPurchaseSubTitle}>
                  <div className={styles.homeContentPurchaseSubTitleItem}>
                    {itemListPurchase.map((item, index) => (
                      <li
                        key={item.id}
                        className={styles.homeContentPurchaseSubTitleMain}
                      >
                        <div className={styles.homeContentPurchaseSubTitleText}>
                          {item.label}
                        </div>
                      </li>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={styles.homeContentSubmit}>
            <div className={styles.homeContentSubmitContainer}>
              <input
                className={styles.homeContentSubmitInput}
                placeholder={t("enter_email")}
                type="text"
                value={email}
                onChange={handleInputChange}
              />
              <div>
                <button
                  className={styles.homeContentSubmitBtn}
                  onClick={handleButtonClick}
                >
                  {t("button_buy")}
                </button>
              </div>
            </div>
            {error && <p className={styles.homeContentError}>{error}</p>}
          </div>
          <div className={styles.homeContentSubmitMb}>
            <div className={styles.homeContentSubmitContainerMb}>
              <input
                className={styles.homeContentSubmitInputMb}
                placeholder={t("enter_email")}
                type="text"
                value={email}
                onChange={handleInputChange}
              />
              {error && <p className={styles.homeContentErrorMb}>{error}</p>}
              <div>
                <button
                  className={styles.homeContentSubmitBtnMb}
                  onClick={handleButtonClick}
                >
                  {t("button_buy")}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.homeContentTextEnd}>{t("end_text")}</div>
        <div className={styles.homeFooter}>
          2024 Athene Group LTD. | All rights reserved.
        </div>

        <SidebarMobile
          isOpen={isSidebarOpen}
          toggleSidebar={emitCloseSidebar}
        />
        <ModalSmartContract
          isOpen={isModalOpen}
          onCloseModal={handleCloseModal}
          propsEmail={email}
          emitCloseModal={handleCloseModal}
        />
      </main>
    </div>
  );
};
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Home;
