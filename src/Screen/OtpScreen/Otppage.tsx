import React from "react";
import "../../Stylesheet/Otp.css";
import Banner from "../../components/common/Banner";

interface props {
  loading: boolean;
  otp: {
    one: string;
    two: string;
    three: string;
    four: string;
  };
  inputs: React.RefObject<HTMLInputElement>[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  handleBackspace: (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => void;
  Otpsubmit: () => void;
  error: boolean;
  errormessage: string;
  Resend: () => Promise<void>;
}

const Otppage = ({
  otp,
  inputs,
  handleChange,
  handleBackspace,
  Otpsubmit,
  error,
  errormessage,
  Resend,
  loading,
}: props) => {
  return (
    <div className="MainContent">
      <Banner />
      <section className="Form">
        <div className="Container">
          <h2>Enter PIN</h2>
          <div className="number-field-otp">
            <input
              type="text"
              name="one"
              maxLength={1}
              ref={inputs[0]}
              value={otp.one}
              onChange={(e) => handleChange(e, 0)}
              onKeyDown={(e) => handleBackspace(e, 0)}
            />
            <input
              type="text"
              name="two"
              maxLength={1}
              ref={inputs[1]}
              value={otp.two}
              onChange={(e) => handleChange(e, 1)}
              onKeyDown={(e) => handleBackspace(e, 1)}
            />
            <input
              type="text"
              name="three"
              maxLength={1}
              ref={inputs[2]}
              value={otp.three}
              onChange={(e) => handleChange(e, 2)}
              onKeyDown={(e) => handleBackspace(e, 2)}
            />
            <input
              type="text"
              name="four"
              maxLength={1}
              ref={inputs[3]}
              value={otp.four}
              onChange={(e) => handleChange(e, 3)}
              onKeyDown={(e) => handleBackspace(e, 3)}
            />
          </div>
          {error ? <span className="otp-error">{errormessage}</span> : ""}
          <div className="Button" onClick={Otpsubmit}>
            <span>
              {loading ? <div className="lds-dual-ring"></div> : "Submit"}
            </span>
          </div>
          <p className="Otp-p">
            Didn't recive PIN?
            <span className="resend" onClick={Resend}>
              Resend
            </span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Otppage;
