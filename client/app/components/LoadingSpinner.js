import React from "react";
import Spinner from "react-bootstrap/Spinner";

export default function LoadingSpinner() {
  return (
    <div
      className="vh-100 d-flex  flex-column justify-content-center align-items-center fs-1"
      style={{ color: "#fd7607" }}
    >
      <Spinner className="fs-1" />

      <p className="mt-5">Loading ...</p>
    </div>
  );
}
