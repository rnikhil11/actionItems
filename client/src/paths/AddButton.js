import React from "react";

const AddButton = ({ onClick }) => {
  return (
    <div className="row">
      <p className={`col-xs-3 col-xs-offset-9 text-right`}>
        <button
          type="info"
          className="btn-add col-xs-12"
          aria-label="Add"
          tabIndex="0"
          onClick={onClick}>
          <i class="bi bi-plus-square"></i>
        </button>
      </p>
    </div>
  );
};
export default AddButton;
