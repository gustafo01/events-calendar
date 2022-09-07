import React, { useRef } from "react";
import { createDate } from "../../utils/crateData";
import { formatDate } from "../../utils/formatDate";
import scss from "./AddMarker.module.scss";

const AddMarker = ({ setIsFormActive}) => {
  const refTitle = useRef(null);
  const refDescription = useRef(null);
  const refDate = useRef(null);
  const refTime = useRef(null);

  const markers = JSON.parse(localStorage.getItem("markers"));

  const addNewMarkers = (e) => {
    e.preventDefault();
    if (refTime?.current?.value && refDate?.current?.value) {
      const date = formatDate(refDate?.current?.value);
      const time = refTime?.current?.value;
      const title = refTitle?.current?.value;
      const description = refDescription?.current?.value;
      const created = createDate().date.toString().substr(4, 20);

      const newMarker = {
        day: date.day,
        month: date.month,
        year: date.year,
        time: time,
        title: title,
        description: description,
        dateMarker: refDate?.current?.value,
        createdAt: created,
        id: Date.now(),
      };
      localStorage.setItem("markers", JSON.stringify([...markers, newMarker]));
      setIsFormActive(false);
    }
  };

  return (
    <form className={`form`}>
      <div className={`header-form`}>
        <p>Add new idea item</p>
        <button
          className="closeBtn"
          onClick={() => setIsFormActive(false)}
        ></button>
      </div>
      <div className={scss.formContent}>
        <p>Title</p>
        <input ref={refTitle} type="text" required />
        <p>Description</p>
        <input ref={refDescription} type="text" />
        <div>
          <div>
            <p>Date</p>
            <input ref={refDate} type="date" required />
          </div>
          <div>
            <p>Time</p>
            <input ref={refTime} type="time" />
          </div>
        </div>
      </div>
      <div className={scss.wrapBtn}>
        <button
          className="saveBtn"
          onClick={(e) => {
            addNewMarkers(e);
          }}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddMarker;
