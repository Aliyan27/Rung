import React from "react";
import Banner from "../../components/common/Banner";
import "../../Stylesheet/Landingpage.css";

interface prop {
  value: string;
  handleSubmit: () => void;
  userInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  status: {
    loading: boolean;
    error: boolean;
    errorMessage: string;
  };
}

const Landingpage = ({ value, handleSubmit, userInput, status }: prop) => {
  return (
    <div className="MainContent">
      <Banner />
      <div className="Form">
        <h2>Enter Phone Number</h2>
        <div className="number-field">
          <span>+92</span>
          <div className="input">
            <input
              type="Text"
              value={value}
              placeholder="3xx-xxxx-xxx"
              onChange={userInput}
            />
          </div>
        </div>
        {status.error ? <p className="error">{status.errorMessage}</p> : ""}
        <div className="Button" onClick={handleSubmit}>
          <span>
            {status.loading ? <div className="lds-dual-ring"></div> : "Submit"}
          </span>
        </div>
        {/* <p>
          *Only for Rs 3.5 Tax/ Day (Prepaid) / & Rs. 35.85 Tax/Month
          (Postpaid)*
        </p> */}
      </div>
    </div>
  );
};

export default Landingpage;
