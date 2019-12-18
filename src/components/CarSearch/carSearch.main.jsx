import React, { useState } from "react";
import { Form, FormGroup, Col, Button, Input } from "reactstrap";
import { IoIosArrowDown } from "react-icons/io";

//custom dependencies
import { withNotifier } from "../shared/Notifications/notification.main";

//components
import SearchedCarByLotNumber from "./components/carByLotNumber.components";
import SearchedCarByVin from "./components/carByVin.components";

const Dashboard = ({ notifyFailure, notifySuccess }) => {
  const [query, setQuery] = useState({ type: "", lotOrVin: "" });
  const [searchHasBegun, setSearchHasBegun] = useState(false);
  const searchIsByLotNumber = query.type === "lot";
  return (
    <div className="justify-content-md-center cars45-dashboard">
      <div className="mainContainer my-5 py-5 mb-10">
        <div className="cars45-image-box">
          <img
            src="/images/cars45-logo.jpg"
            width="80px"
            height="80px"
            loading="lazy"
            alt="cars45 logo"
          />
        </div>
        <div className="text-center">
          <p className="dashboard-title" style={{ fontSize: "2em" }}>
            Search For a Car
          </p>
        </div>
        <Form
          className="formContainer"
          onSubmit={e => {
            e.preventDefault();
            setSearchHasBegun(true);
          }}
        >
          <FormGroup row>
            <Col sm={{ size: 2 }}>
              <Input
                className="hide-select"
                type="select"
                name="searchType"
                id="searchType"
                onChange={e => setQuery({ ...query, type: e.target.value })}
                value={query.type}
                placeholder="Select a search type"
                required
              >
                <option value="">Select a search type</option>
                <option value="vin">VIN</option>
                <option value="lot">Lot Number</option>
              </Input>
              <IoIosArrowDown className="cars45-dropdown-icon" />
            </Col>
            <Col sm={{ size: 5 }}>
              <Input
                required
                className="fundInput"
                type="text"
                name="search"
                id="search"
                value={query.lotOrVin}
                onChange={e => {
                  setQuery({ ...query, lotOrVin: e.target.value });
                  setSearchHasBegun(false);
                }}
                placeholder="VIN or Lot # e.g NG-1234"
              />
            </Col>
            <Col>
              <Button className="dashboard-btn btn--animated cars45-btn primary">
                Search
              </Button>
            </Col>
          </FormGroup>
          {(searchHasBegun && searchIsByLotNumber && (
            <SearchedCarByLotNumber
              notifyFailure={notifyFailure}
              notifySuccess={notifySuccess}
              lotNumber={query.lotOrVin}
            />
          )) ||
            (searchHasBegun && (
              <SearchedCarByVin
                notifyFailure={notifyFailure}
                notifySuccess={notifySuccess}
                vin={query.lotOrVin}
              />
            ))}
        </Form>
      </div>
    </div>
  );
};

export default withNotifier(Dashboard);
