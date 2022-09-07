import React, { useRef } from "react";
import { createDate } from "../../utils/crateData";
import { formatDate } from "../../utils/formatDate";
import scss from "./EditMarker.module.scss";

const EditMarker = ({ setIsEditActive, marker }) => {
  const refTitle = useRef(null);
  const refDescription = useRef(null);
  const refDate = useRef(null);
  const refTime = useRef(null);

  const markers = JSON.parse(localStorage.getItem("markers"));

  const saveMarker = (e) => {
    e.preventDefault();
    if (refDate?.current?.value && refTitle?.current?.value) {
      const date = formatDate(refDate?.current?.value);
      const time = refTime?.current?.value;
      const title = refTitle?.current?.value;
      const description = refDescription?.current?.value;

      const markersArr = markers.map((item) => {
        const updated = createDate().date.toString().substr(4, 20);
        if (item.id === marker.id) {
          return (item = {
            ...item,
            day: date.day,
            month: date.month,
            year: date.year,
            time: time,
            title: title,
            description: description,
            updatedAt: updated,
          });
        } else return item;
      });

      localStorage.setItem("markers", JSON.stringify(markersArr));
      setIsEditActive(false);
    }
  };

  const deleMarker = (e) => {
    e.preventDefault();
    const newArr = markers.filter((item) => item.id !== marker.id);
    localStorage.setItem("markers", JSON.stringify(newArr));
    setIsEditActive(false);
  };

  return (
    <form className={`form`}>
      <div className={`header-form`}>
        <p>Edit idea Item</p>
        <button
          className="closeBtn"
          onClick={() => setIsEditActive(false)}
        ></button>
      </div>
      <div className={scss.formContent}>
        <div className={scss.timeInfo}>
          <p>Created at: {marker.createdAt}</p>
          {marker.updatedAt && <p>Updated at: {marker.updatedAt}</p>}
        </div>
        <p>Title</p>
        <input
          ref={refTitle}
          type="text"
          defaultValue={marker.title}
          required
        />
        <p>Description</p>
        <input
          ref={refDescription}
          defaultValue={marker.description}
          type="text"
        />
        <div>
          <div>
            <p>Date</p>
            <input
              ref={refDate}
              type="date"
              defaultValue={marker.dateMarker}
              required
            />
          </div>
          <div>
            <p>Time</p>
            <input ref={refTime} type="time" defaultValue={marker.time} />
          </div>
        </div>
      </div>
      <div className={scss.btnWrap}>
        <button className="deleteBtn" onClick={(e) => deleMarker(e)}></button>
        <button className="saveBtn" onClick={(e) => saveMarker(e)}>
          Save
        </button>
      </div>
    </form>
  );
};

export default EditMarker;
