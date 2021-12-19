import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faPlaneDeparture,
  faPlaneArrival,
  faMale,
  faCalendarAlt,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import {Badge, Button, OverlayTrigger, Popover, Toast} from "react-bootstrap";
import Layout from "../../components/Layout/Layout";
import jsonData from "../../core/data/flights.json"
import "./FlightSearch.scss";
import {FLIGHT_CLASS, FLIGHT_DATA, PASSENGER_COUNT} from "../../core/constants";

export function FlightSearch() {
  let navigate = useNavigate();
  const [passengerCount, setPassengerCount] = useState(1)
  const [flightClass, setFlightClass] = useState("")
  const [showToaster, setShowToaster] = useState(false)
  const [formData, setFormData] = useState({
    destination: '',
    origin: ''
  })

  const onPassengerCountChange = (value) => {
    const _passengerCount = passengerCount + value
    if (_passengerCount === 0 || _passengerCount === 7) {
      return
    }
    setPassengerCount(_passengerCount)
  }

  const onDestinationChange = (e) => {
    setFormData({...Object.assign(formData, {destination: e.target.value})})
  }

  const onOriginChange = (e) => {
    setFormData({...Object.assign(formData, {origin: e.target.value})})
  }

  const onSearchClick = () => {
    if (!formData.destination || !formData.origin) {
      setShowToaster(true)
      return
    }
    let proceed = false;
    const data = JSON.parse(JSON.stringify(jsonData))
    data.flights.forEach(item => {
      const destinationCheck = item.destinationAirport.city.name.toLowerCase() === formData.destination.toLocaleLowerCase("tr-TR")
      const originCheck = item.originAirport.city.name.toLowerCase() === formData.origin.toLocaleLowerCase("tr-TR")
      if (destinationCheck && originCheck) {
        proceed = true
      }
    })
    if (proceed) {
      localStorage.setItem(FLIGHT_CLASS, flightClass)
      localStorage.setItem(PASSENGER_COUNT, passengerCount)
      navigate("/list-flights");
    } else {
      setShowToaster(true)
    }
  }

  useEffect(() => {
    localStorage.setItem(FLIGHT_DATA, JSON.stringify(jsonData))
  }, [])

  return (
    <Layout>
      <div id="flightSearch" data-testid="flightSearchScreen">
        <div className="content">
          <h3 className="color-ui-white text-center">Merhaba <br/> Nereyi keşfetmek istersiniz?</h3>
          <div className="search-bar p-5">
            <div className="input-field me-4">
              <input type="text" className="form-control ps-5" placeholder="Nereden" onChange={onOriginChange}/>
              <FontAwesomeIcon icon={faPlaneDeparture} className="fa-icon"/>
            </div>

            <div className="input-field me-4">
              <input type="text" className="form-control ps-5" placeholder="Nereye" onChange={onDestinationChange}/>
              <FontAwesomeIcon icon={faPlaneArrival} className="fa-icon"/>
            </div>

            <Button
              variant="secondary"
              className="d-flex align-items-center justify-content-between me-4 position-relative"
              style={{width: "120px"}}
            >
              <div className="font-weight-bold color-ui-white">Tarih</div>
              <FontAwesomeIcon icon={faCalendarAlt}/>
            </Button>

            <OverlayTrigger
              trigger="click"
              placement="bottom"
              rootClose={true}
              overlay={
                <Popover id="popover">
                  <Popover.Body>
                    <div className="mb-4">
                      Kabin ve yolcu seçimi
                    </div>

                    <div className="form-group mb-4 d-flex justify-content-between">

                      <input type="radio" onChange={e => setFlightClass(e.target.value)} className="form-check-input" id="radio1" name="optradio" value="economy"/>
                      Economy Class
                      <label className="form-check-label" htmlFor="radio1"/>

                      <input type="radio" onChange={e => setFlightClass(e.target.value)} className="form-check-input" id="radio2" name="optradio" value="business"/>
                      Business Class
                      <label className="form-check-label" htmlFor="radio2"/>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="font-weight-bold">Yolcu</div>
                      <div className="d-flex align-items-center">
                        <Button onClick={() => onPassengerCountChange(-1)}>-</Button>
                        <div className="mx-2 text-center" style={{maxWidth: '20px', width: '20px'}}>
                          {passengerCount}
                        </div>
                        <Button onClick={() => onPassengerCountChange(1)}>+</Button>
                      </div>
                    </div>
                  </Popover.Body>
                </Popover>
              }
            >
              <Button variant="secondary" className="d-flex align-items-center justify-content-center"
                      style={{width: "120px"}}>
                {[...Array(passengerCount)].map((e, i) => (
                  <FontAwesomeIcon icon={faMale} key={i}/>
                ))}
                <Badge bg="secondary">{passengerCount}</Badge>
              </Button>
            </OverlayTrigger>

            <Button className="ms-4 search-button" onClick={onSearchClick}>
              <FontAwesomeIcon icon={faChevronRight}/>
            </Button>
          </div>
        </div>
        <Toast
          onClose={() => setShowToaster(false)}
          show={showToaster}
          delay={3000}
          autohide
          className="position-absolute bottom-0"
        >
          <Toast.Body>Aradığınız kriterlerde uçuş bulunamadı.</Toast.Body>
        </Toast>
      </div>
    </Layout>
  )
}
