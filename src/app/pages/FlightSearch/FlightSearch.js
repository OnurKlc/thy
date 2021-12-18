import React, {useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlaneDeparture, faPlaneArrival, faMale, faCalendarAlt, faChevronRight} from '@fortawesome/free-solid-svg-icons'
import {Badge, Button, OverlayTrigger, Popover} from "react-bootstrap";
import Layout from "../../components/Layout/Layout";
import "./FlightSearch.scss";

export function FlightSearch() {
  const [passengerCount, setPassengerCount] = useState(1)

  const onPassengerCountChange = (value) => {
    const _passengerCount = passengerCount + value
    if (_passengerCount === 0 || _passengerCount === 6) {
      return
    }
    setPassengerCount(_passengerCount)
  }

  return (
    <Layout>
      <div id="flightSearch">
        <div className="content">
          <h3 className="color-ui-white text-center">Merhaba <br/> Nereyi keşfetmek istersiniz?</h3>
          <div className="search-bar p-5">
            <div className="input-field me-4">
              <input type="text" className="form-control ps-5" placeholder="Nereden"/>
              <FontAwesomeIcon icon={faPlaneDeparture} className="fa-icon"/>
            </div>

            <div className="input-field me-4">
              <input type="text" className="form-control ps-5" placeholder="Nereye"/>
              <FontAwesomeIcon icon={faPlaneArrival} className="fa-icon"/>
            </div>

            <Button
              variant="secondary"
              className="d-flex align-items-center justify-content-between me-4 position-relative"
              style={{width: "120px"}}
            >
              <div className="font-weight-bold color-ui-white">Tarih</div>
              <FontAwesomeIcon icon={faCalendarAlt} />
            </Button>

            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={
                <Popover id="popover">
                  <Popover.Body>
                    <div className="mb-4">
                      Kabin ve yolcu seçimi
                    </div>

                    <div className="form-group mb-4 d-flex justify-content-between">

                      <input type="radio" className="form-check-input" id="radio1" name="optradio" value="economy"/>
                      Economy Class
                      <label className="form-check-label" htmlFor="radio1"/>

                      <input type="radio" className="form-check-input" id="radio2" name="optradio" value="business"/>
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

            <Button className="ms-4 search-button">
              <FontAwesomeIcon icon={faChevronRight} />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
