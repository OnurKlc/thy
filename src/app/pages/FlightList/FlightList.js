import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import {FLIGHT_DATA, PASSENGER_COUNT} from "../../core/constants";
import Layout from "../../components/Layout/Layout";
import "./FlightList.scss";
import {Button} from "react-bootstrap";

export function FlightList() {
  const navigate = useNavigate()
  const [passengerCount, setPassengerCount] = useState(1)
  const [promotion, setPromotion] = useState(false)
  const [flightData, setFlightData] = useState()

  useEffect(() => {
    const _passengerCount = localStorage.getItem(PASSENGER_COUNT)
    const _flightData = localStorage.getItem(FLIGHT_DATA)
    if (_passengerCount) {
      setPassengerCount(Number(_passengerCount))
      setFlightData(JSON.parse(_flightData))
      console.log(JSON.parse(_flightData))
    } else {
      navigate("/search-flights")
    }
  }, [])

  return (
    <Layout>
      <div id="flightList">
        <div className="content mx-auto">
          <div className="flight-text">Uçuş</div>
          <h3 className="mt-4">İstanbul - Antalya, {passengerCount} Yolcu</h3>
          <span className="font-weight-bold d-inline-block me-4">Promosyon Kodu</span>
          <BootstrapSwitchButton
            checked={false}
            onlabel=' '
            offlabel=' '
            onChange={(checked) => {
              setPromotion(checked)
            }}
          />
          <div className="flight-list mt-4">
            <div className="flight-list-header d-flex justify-content-end align-items-center">
              <span className="text-white me-4">Sıralama Kriteri</span>
              <Button variant="outline-light me-4">Ekonomi Ücreti</Button>
              <Button variant="outline-light me-4">Kalkış Saati</Button>
            </div>
            <div className="flight-list-items">
              {flightData && flightData.flights.map(flight => (
                <div className="d-flex p-2" key={flight.arrivalDateTimeDisplay}>
                  <div className="flex-grow-2 bg-white p-2 me-2 d-flex">
                    <div className="d-flex flex-column">
                      <span className="font-weight-bold">{flight.arrivalDateTimeDisplay}</span>
                      <span>{flight.originAirport.code}</span>
                      <span className="font-sm">{flight.originAirport.city.name}</span>
                    </div>
                    <div className="d-flex align-items-center" style={{width: "120px"}}>
                      <hr className="w-100" />
                    </div>
                    <div className="d-flex flex-column align-items-end">
                      <span className="font-weight-bold">{flight.departureDateTimeDisplay}</span>
                      <span>{flight.destinationAirport.code}</span>
                      <span className="font-sm">{flight.destinationAirport.city.name}</span>
                    </div>
                    <div className="d-flex flex-column text-center mx-auto justify-content-center">
                      <span className="font-sm">Uçuş Süresi</span>
                      <span className="font-weight-bold">{flight.flightDuration}</span>
                    </div>
                  </div>
                  <div className="flex-grow-1 bg-white p-2 me-2 d-flex align-items-center justify-content-between">
                    <input type="radio" className="form-check-input" id="economy" name="optradio" value="economy"/>
                    Economy
                    <label className="form-check-label" htmlFor="radio1"/>
                    <div className="d-flex flex-column">
                      <span className="font-sm">Yolcu Başına</span>
                      <span className="font-weight-bold">{flight.fareCategories.ECONOMY.subcategories[0].price.currency + " " + flight.fareCategories.ECONOMY.subcategories[0].price.amount}</span>
                    </div>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </div>
                  <div className="flex-grow-1 bg-white p-2 d-flex align-items-center justify-content-between">
                    <input type="radio" className="form-check-input" id="economy" name="optradio" value="economy"/>
                    Business
                    <label className="form-check-label" htmlFor="radio1"/>
                    <div className="d-flex flex-column">
                      <span className="font-sm">Yolcu Başına</span>
                      <span className="font-weight-bold">{flight.fareCategories.BUSINESS.subcategories[0].price.currency + " " + flight.fareCategories.BUSINESS.subcategories[0].price.amount}</span>
                    </div>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
