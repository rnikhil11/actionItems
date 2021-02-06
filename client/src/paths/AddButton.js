import React from "react";

const AddButton = ({ className, onClick, disabled }) => {
  return (
    <div className="row">
      <p className={`col-xs-3 col-xs-offset-9 text-right ${className}`}>
        <button
          type="info"
          className="btn-add col-xs-12"
          aria-label="Add"
          tabIndex="0"
          onClick={onClick}
          disabled={disabled}
        >
          <i class="bi bi-plus-square"></i>
        </button>
      </p>
    </div>
  );
};
export default AddButton;
