import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Accordion, Button, Card, useAccordionButton} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import Layout from "../../components/Layout/Layout";
import {FLIGHT_DATA, PASSENGER_COUNT} from "../../core/constants";
import "./FlightList.scss";

function AccordionCard({children, eventKey, withRightMargin}) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
  );

  return (
    <div onClick={decoratedOnClick} className="w-100">
      {children}
    </div>
  )
}

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
                <div className="d-flex p-2 align-items-start" key={flight.arrivalDateTimeDisplay}>

                  <div className="w-50 bg-white p-2 me-2 d-flex height-90">
                    <div className="d-flex flex-column">
                      <span className="font-weight-bold">{flight.arrivalDateTimeDisplay}</span>
                      <span>{flight.originAirport.code}</span>
                      <span className="font-sm">{flight.originAirport.city.name}</span>
                    </div>
                    <div className="d-flex align-items-center" style={{width: "120px"}}>
                      <hr className="w-100"/>
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

                  <Accordion className="w-50 d-flex">
                    <div className="d-flex flex-column align-items-end w-50 me-2 bg-white h-fit-content">
                      <AccordionCard eventKey="0">
                        <div className="d-flex align-items-center justify-content-between height-90 p-2 w-100">
                          <input type="radio" className="form-check-input" id="economy" name="optradio"
                                 value="economy"/>
                          Economy
                          <label className="form-check-label" htmlFor="radio1"/>
                          <div className="d-flex flex-column">
                            <span className="font-sm">Yolcu Başına</span>
                            <span
                              className="font-weight-bold">{flight.fareCategories.ECONOMY.subcategories[0].price.currency + " " + flight.fareCategories.ECONOMY.subcategories[0].price.amount}</span>
                          </div>
                          <FontAwesomeIcon icon={faChevronDown}/>
                        </div>
                      </AccordionCard>
                      <Accordion.Collapse eventKey="0" className="w-100">
                        <>
                          <div className="height-10 bg-white" />
                          <div className="bg-white p-2 accordion-child-middle d-flex">
                            {flight.fareCategories.ECONOMY.subcategories.map((item, index) => (
                              <Card
                                className={"flex-grow-1 " + (index !== flight.fareCategories.BUSINESS.subcategories.length - 1 ? "me-2" : "")}>
                                <Card.Header
                                  className="d-flex align-items-center justify-content-between font-weight-bold">
                                  <div className="text-capitalize">
                                    {item.brandCode}
                                  </div>
                                  <div className="d-flex align-items-start">
                                    <div className="font-sm">
                                      {item.price.currency}
                                    </div>
                                    <div>
                                      {item.price.amount}
                                    </div>
                                  </div>
                                </Card.Header>
                                <Card.Body className="d-flex flex-column justify-content-between">
                                  <div>
                                    {item.rights.map(right => (
                                      <div className="border-bottom pb-1">
                                        {right}
                                      </div>
                                    ))}
                                  </div>
                                  <Button className="flight-select-button">Uçuşu Seç</Button>
                                </Card.Body>
                              </Card>
                            ))}
                          </div>
                        </>
                      </Accordion.Collapse>
                    </div>

                    <div className="d-flex flex-column align-items-end w-50 bg-white h-fit-content">
                      <AccordionCard eventKey="1">
                        <div className="d-flex align-items-center justify-content-between height-90 p-2">
                          <input type="radio" className="form-check-input" id="economy" name="optradio"
                                 value="economy"/>
                          Business
                          <label className="form-check-label" htmlFor="radio1"/>
                          <div className="d-flex flex-column">
                            <span className="font-sm">Yolcu Başına</span>
                            <span
                              className="font-weight-bold">{flight.fareCategories.BUSINESS.subcategories[0].price.currency + " " + flight.fareCategories.BUSINESS.subcategories[0].price.amount}</span>
                          </div>
                          <FontAwesomeIcon icon={faChevronDown}/>
                        </div>
                      </AccordionCard>
                      <Accordion.Collapse eventKey="1" className="w-100">
                        <>
                          <div className="height-10 bg-white" />
                          <div className="bg-white p-2 accordion-child-last d-flex">
                            {flight.fareCategories.BUSINESS.subcategories.map((item, index) => (
                              <Card
                                className={"flex-grow-1 " + (index !== flight.fareCategories.BUSINESS.subcategories.length - 1 ? "me-2" : "")}>
                                <Card.Header
                                  className="d-flex align-items-center justify-content-between font-weight-bold">
                                  <div className="text-capitalize">
                                    {item.brandCode}
                                  </div>
                                  <div className="d-flex align-items-start">
                                    <div className="font-sm">
                                      {item.price.currency}
                                    </div>
                                    <div>
                                      {item.price.amount}
                                    </div>
                                  </div>
                                </Card.Header>
                                <Card.Body className="d-flex flex-column justify-content-between">
                                  <div>
                                    {item.rights.map(right => (
                                      <div className="border-bottom pb-1">
                                        {right}
                                      </div>
                                    ))}
                                  </div>
                                  <Button className="flight-select-button">Uçuşu Seç</Button>
                                </Card.Body>
                              </Card>
                            ))}
                          </div>
                        </>
                      </Accordion.Collapse>
                    </div>
                  </Accordion>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
