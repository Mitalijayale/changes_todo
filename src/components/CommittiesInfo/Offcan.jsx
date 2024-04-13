import React, { useState, useEffect } from "react";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  COffcanvas,
  CButton,
  COffcanvasHeader,
  COffcanvasTitle,
  COffcanvasBody,
  CCloseButton,
} from "@coreui/react";
import Members from "./Members";

function OffCan() {
  const [visible, setVisible] = useState(false);
  const [offcanvasWidth, setOffcanvasWidth] = useState("600px");

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        setOffcanvasWidth("100vw"); // Adjusted width for smaller screens
      } else if (window.innerWidth <= 918) {
        setOffcanvasWidth("70vw"); // Default width for larger screens
      } else {
        setOffcanvasWidth("800px");
      }
    }

    // Call handleResize on initial render
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className="btn custom-button"
        style={{ backgroundColor: "#1e90ff", color: "#fff" }}
        onClick={() => setVisible(true)}
      >
        More Info
      </button>

      <div>
        <COffcanvas
          placement="end"
          visible={visible}
          onHide={() => setVisible(false)}
          style={{ width: offcanvasWidth }}
          className="custom-offcanvas"
        >
          <COffcanvasHeader>
            <COffcanvasTitle>
              <h2>Committees</h2>
            </COffcanvasTitle>
            <CCloseButton
              className="text-reset"
              onClick={() => setVisible(false)}
            />
          </COffcanvasHeader>
          <COffcanvasBody>
            <Members />
          </COffcanvasBody>
        </COffcanvas>
      </div>
    </>
  );
}

export default OffCan;
