import React, {useEffect, useState} from "react";
import Layout from "../../components/Layout/Layout";
import {useSearchParams, useNavigate} from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {TOTAL_PRICE} from "../../core/constants";
import "./Result.scss";
import {Button} from "react-bootstrap";

export function Result() {
  const navigate = useNavigate()
  let [searchParams] = useSearchParams();
  const [page, setPage] = useState()
  let [totalPrice, setTotalPrice] = useState()

  const backToStart = () => {
    navigate("/search-flights")
  }

  useEffect(() => {
    setPage(searchParams.get("final"))
    totalPrice = localStorage.getItem(TOTAL_PRICE)
    setTotalPrice(totalPrice)
  }, [])

  return (
    <Layout>
      <div id="result">
        <div className="content mx-auto">
          {page === "success" ? (
            <div>
              <div className="d-flex align-items-center border-bottom pb-4">
                <FontAwesomeIcon icon={faCheckCircle} color="green" size="2x" />
                <div className="font-weight-bold ms-5">Kabin seçiminiz tamamlandı.</div>
              </div>
              <div className="d-flex justify-content-between align-items-center pt-4">
                <h2>Toplam tutar</h2>
                <div className="text-primary">{totalPrice}</div>
              </div>
            </div>
          ) : (
            <div>
              <div className="d-flex align-items-center border-bottom pb-4">
                <FontAwesomeIcon icon={faTimesCircle} color="red" size="2x" />
                <div className="font-weight-bold ms-5">Kabin seçiminiz tamamlanamadı.</div>
              </div>
              <div className="d-flex justify-content-end pt-4">
                <Button variant="danger" onClick={backToStart}>Başa Dön</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
