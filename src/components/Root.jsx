import React from "react";
import Header from "./Header";

export default function ButtonAppBar() {
  return (
    <div>
      <Header />
			<div className="mt-10" />
			{process.env.REACT_APP_NOT_SECRET_CODE}
    </div>
  );
}
