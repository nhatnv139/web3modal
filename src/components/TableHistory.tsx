import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/CustomSelect.module.css";
const dayjs = require("dayjs");
import Image from "next/image";
import img3 from "../../public/images/time-left.svg";
import img4 from "../../public/images/Check.png";
import Pagination from "../components/Pagination";
import { ethers } from "ethers";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CircularProgress from "@mui/material/CircularProgress";

const DataTableMUI = () => {
  const { t } = useTranslation("common");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(10);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initEthers = async () => {
      try {
        const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(ethProvider);
        await window.ethereum.enable();
        const signerWeb3 = await ethProvider.getSigner();
        const signerAddress = await signerWeb3.getAddress();
        setSigner(signerAddress);
      } catch (error) {
        console.error("Lỗi kết nối Ethers:", error.message);
      }
    };
    initEthers();
    if (signer) {
      fetchData(page);
    }
  }, [signer]);

  const fetchData = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_PUBLICAPI_KEY}/api/history?wallet=${signer}&pageSize=${pageSize}&page=${page}`
      );
      setData(response.data.data.histories);
      setTotalRows(response.data.data.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchData(page);
  };

  
  return (
    <div>
      {loading ? (
        <div className={styles.table_history_loading}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div>
          {data.length > 0 ? (
            <div>
              <div className={styles.table_history_container}>
                <div className={styles.table_history_contanr}>
                  <table
                    className={styles.table_history}
                    aria-label="sticky table"
                  >
                    <thead>
                      <tr className={styles.table_history_tr}>
                        <th className={styles.table_history_col1}>
                          {t("stt")}
                        </th>
                        <th className={styles.table_history_col2}>
                          {t("wallet_address")}
                        </th>
                        <th className={styles.table_history_col3}>
                          {t("package_id")}
                        </th>
                        <th className={styles.table_history_col4}>
                          {t("account_athene")}
                        </th>
                        <th className={styles.table_history_col5}>
                          {t("hash")}
                        </th>
                        <th className={styles.table_history_col6}>
                          {t("status")}
                        </th>
                        <th className={styles.table_history_col7}>
                          {t("time")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, index) => (
                        <tr className={styles.table_history_tbody} key={index}>
                          <th className={styles.table_history_tbody_col1}>
                            {(page - 1) * pageSize + index + 1}
                          </th>
                          <th className={styles.table_history_tbody_col2}>
                            <div
                              className={styles.table_history_tbody_col2_child}
                            >
                              {row.userWallet}
                            </div>
                          </th>
                          <th className={styles.table_history_tbody_col3}>
                            <div>
                              {row.packageId == 2 ? "Premium" : "Regular"}
                            </div>
                          </th>
                          <th className={styles.table_history_tbody_col4}>
                            {row.email}
                          </th>
                          <th className={styles.table_history_tbody_col5}>
                            <div
                              className={styles.table_history_tbody_col5_child}
                            >
                              <a
                                target="_blank"
                                href={`https://bscscan.com/tx/${row.txHash}`}
                              >
                                {row.txHash}
                              </a>
                            </div>
                          </th>
                          <th className={styles.table_history_tbody_col6}>
                            <div
                              className={styles.table_history_tbody_col6_child}
                            >
                              {row.isCalledHook ? (
                                <Image
                                  width={24}
                                  height={24}
                                  className={
                                    styles.table_history_tbody_col6_check
                                  }
                                  src={img4}
                                  alt="picture"
                                  layout="fixed"
                                />
                              ) : (
                                <Image
                                  width={24}
                                  height={24}
                                  className={
                                    styles.table_history_tbody_col6_false
                                  }
                                  src={img3}
                                  alt="picture"
                                  layout="fixed"
                                />
                              )}
                            </div>
                          </th>
                          <th className={styles.table_history_tbody_col7}>
                            <div
                              className={styles.table_history_tbody_col7_child}
                            >
                              {dayjs(row.createdAt).format("HH:mm:ss DD/MM/YY")}
                            </div>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={styles.table_pagination}>
                <Pagination
                  page={page}
                  pageSize={pageSize}
                  totalCount={totalRows}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          ) : (
            <div className={styles.no_data}>{t("no_data")}</div>
          )}
        </div>
      )}
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
export default DataTableMUI;
